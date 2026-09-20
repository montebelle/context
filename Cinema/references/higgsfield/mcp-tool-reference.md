# Higgsfield MCP tool reference (master)

Complete coverage of the Higgsfield MCP surface as exposed to this account on 2026-09-20. Every tool name below carries the prefix `mcp__8d6083eb-41bb-4bd3-bba6-8ccc56929062__`. Sources: the live tool schemas fetched from the MCP server on 2026-09-20 (canonical; load bearing sentences quoted verbatim, hyphens and dashes preserved inside quotes and literals only), plus observed production behavior from `../higgsfield-ops.md` and `../failure-catalog.md`. Vendor web citations live in the per domain deep files, not here; this file guarantees one entry per tool.

Safety classes used below:

* **safe read**: enumerates or reads state, no jobs, no charges, no widgets.
* **widget display**: opens or renders a UI widget; the widget itself may let the user spend, but the call does not.
* **mutating**: creates, changes, connects, publishes, or executes something without a stated credit charge.
* **spending**: creates a billable generation or processing job, or directly charges credits. Where a `get_cost` preflight exists it is noted; a preflight is free and submits nothing.

**Untested** marks tools the From Desert to OASYS production never touched; their entries are schema only.

Surface drift versus production notes: the ops file references `media_upload_and_confirm`, `models_get`, `models_search`, `estimate_video_cost`, and `estimate_image_cost`. None of those names exist on the current surface. Model discovery is now `models_explore`; cost preflight is now `get_cost: true` inside the generation params; the single call upload path is gone, leaving `media_upload` plus `media_confirm` (or the widget). The ops finding "No video upscaler exists on the surface" is also stale: `upscale_video` now exists. Verify against the live surface before relying on either record.

---

## 1. Account, billing, workspaces

### balance
Purpose: "Get the user's available credits and current subscription plan." Points to `transactions` for history.
Safety class: safe read.
Parameters: none.
Production evidence: the spend loop confirms every charge by balance difference after each job (higgsfield-ops, cost preflight section). Failed submissions and typed refusals were never silently billed.

### transactions
Purpose: "List the user's credit transactions (spend/refund/grant/deduct), newest first."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| cursor | integer | no | first page | next_cursor from prior page |
| size | integer | no | 10 | 1 to 100 |

Production evidence: none recorded; charge audits went through balance differences instead. Untested directly.

### show_plans_and_credits
Purpose: opens "the single combined pricing widget for everything billing-related" with Upgrade Plan and Top-up Credits tabs (packs of 500, 1000, 2000, 4000 credits) and checkout links.
Safety class: widget display. The CTAs link to Stripe or Higgsfield checkout; the tool itself charges nothing.

| name | type | required | default | options |
|---|---|---|---|---|
| intent | string | no | general | upgrade, topup, auto_refill, trial, general |

Gotchas quoted: "relay that response verbatim instead of summarizing"; "When `free_trial` is absent, NEVER speculate about trial eligibility".
Untested: production never opened the pricing widget; plan gates surfaced as typed refusals on generation instead (failure 4, "Requires basic plan or higher").

### cancel_trial_auto_renewal
Purpose: cancel auto renewal of the MCP free trial. "cancelling stops the automatic charge at the end of the trial ONLY — the user KEEPS trial access and remaining trial credits until the trial ends".
Safety class: mutating (billing state). Two step consent gate.

| name | type | required | default | options |
|---|---|---|---|---|
| confirm | boolean | no | false | "Never pass confirm=true on the first call." |

Untested: production never touched trials.

### list_workspaces
Purpose: "List every workspace the user can access"; `is_selected` marks the billing target of MCP operations.
Safety class: safe read.
Parameters: none.
Untested: production ran entirely in the default private workspace.

### select_workspace
Purpose: "Set or clear the active workspace — the one all subsequent MCP operations bill against and read from".
Safety class: mutating, and billing critical: it redirects every later charge. "The selection persists across sessions and clients until changed or cleared".

| name | type | required | default | options |
|---|---|---|---|---|
| workspace_id | string (uuid) | unless clear |  | id from list_workspaces |
| clear | boolean | no | false | true returns to the private default |

Untested. Never call it casually; a stale selection silently rebills a later session.

---

## 2. Model, preset, and action discovery

### models_explore
Purpose: "Find generation models. Use recommend with goal + input context; use get for model constraints." The one catalog tool on the current surface; replaces the retired models_get and models_search names in the ops record.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| action | string | yes |  | list, search, get, recommend |
| query | string | no |  | free text with input context |
| model_id | string | for get |  |  |
| type | string | no | all | image, video, audio, 3d |
| input | string | no |  | text, image |
| unlim | boolean | no |  | true filters to supports_unlim models |
| limit | integer | no | 20 (5 for recommend) | 1 to 100 |
| after | string | no |  | next_page_token |

Production evidence: catalogs drift and backends route (a nano_banana_pro request was labeled nano_banana_2 on the job); "Trust recorded job model ids, not brochure names." Verify model facts here before relying on them.

### presets_show
Purpose: "Show available Higgsfield presets for image-to-video generation" (ids, names, previews, descriptions) for use with model `higgsfield_preset` in generate_video.
Safety class: safe read.
Parameters: none.
Untested: production used seedance_2_5 directly, never presets.

### get_explainer_presets
Purpose: "Show the explainer video style presets (CMS-managed catalog)" with ids and preview media; resolve a pick with resolve_explainer_preset.
Safety class: safe read.
Parameters: none.
Untested.

### resolve_explainer_preset
Purpose: "the backend imports the preset's style image into the user's media storage" and returns a style reference media_id for every scene of an explainer.
Safety class: mutating (writes into media storage; no charge stated).

| name | type | required | default | options |
|---|---|---|---|---|
| preset_id | string (uuid) | yes |  | id from get_explainer_presets |

Untested.

### animation_actions
Purpose: "Read-only catalog of the 3D rig animation library (678 actions: locomotion, gestures, dancing, combat, daily actions)"; finds an animation_action_id for generate_3d with enable_animation true. "Does not create jobs."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| query | string | no | browse | matched against name and category |
| group | string | no |  | WalkAndRun, BodyMovements, DailyActions, Dancing, Fighting |
| category | string | no |  | e.g. Walking, Running, Idle, Dancing |
| limit | integer | no | 20 | 1 to 100 |
| after | string | no |  | next_page_token |

Untested.

---

## 3. Media intake and library

### media_upload
Purpose: get presigned S3 PUT URLs plus media ids for files whose bytes the agent controls. Image, video, and audio extensions become generation inputs; "other whitelisted extensions (pdf, zip, tar, docx, csv, code files, ...) are uploaded as general files and return a permanent URL, but cannot be used as generation inputs."
Safety class: mutating (reserves upload slots; no charge).

| name | type | required | default | options |
|---|---|---|---|---|
| filename | string | single mode |  |  |
| content_type | string | no | inferred | MIME, e.g. image/png |
| files | array | batch mode |  | 1 to 20 of {filename, content_type} |
| method | string | no | upload_url | only value |

Production evidence: the signature includes the content type, so PUT with the exact `Content-Type` header and `--data-binary`; `--upload-file` without the header fails (failure 45). URLs expire in 86400 seconds and an unconfirmed batch is wasted (failure 26). Run the PUT where the bytes live; never relay base64 between environments. Note: the ops file's `media_upload_and_confirm` single call path no longer exists on this surface.

### media_confirm
Purpose: "Confirm file uploads after using media_upload's upload_url method. Call this only after every curl PUT returned HTTP 200."
Safety class: mutating (finalizes storage; no charge).

| name | type | required | default | options |
|---|---|---|---|---|
| type | string | yes |  | image, video, audio, file |
| media_id | string | one of |  | single id |
| media_ids | array | one of |  | 1 to 20 ids |

Production evidence: accepts an array for batches; confirm promptly because presigned URLs expire (failure 26).

### media_import_url
Purpose: "Import an HTTPS image, video, or audio URL into Higgsfield storage and return a confirmed media_id." Max payload 50 MB. Generation medias take the returned media_id, never the original URL.
Safety class: mutating (no charge stated).

| name | type | required | default | options |
|---|---|---|---|---|
| url | string | yes |  | https only |
| type | string | no | auto | auto, image, video, audio |

Untested: production uploaded via presigned PUT instead.

### media_upload_widget
Purpose: "Required local-media intake for Higgsfield in Apps UI-capable clients." The user reselects files in the browser, which uploads directly to Higgsfield; "remote MCP tools cannot read chat attachments."
Safety class: widget display.

| name | type | required | default | options |
|---|---|---|---|---|
| type | string | no | auto | auto, image, video, audio |
| multiple | boolean | no | true for image/auto | one video and one audio may combine with images |
| min_files | integer | no |  | 1 to 20 |
| max_files | integer | no |  | 1 to 20 |
| label | string | no |  | widget header |

Media only; general files go through media_upload. Untested in production (terminal sessions used the presigned path). Related observed limit: programmatic file choosing into the Higgsfield web UI is blocked; the user uploads manually where automation is refused (failure 65).

### show_medias
Purpose: "List your uploaded media files by type. Returns media IDs, URLs, and creation timestamps."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| type | string | no | image | image, video, audio |
| size | integer | no | 24 | 1 to 100 |
| cursor | number | no |  | next_cursor |

Gotcha quoted: "Call once with the single type the user asked for (default image); do not enumerate the other types". Production evidence: the asset library lists uploads and generations under the same id namespace.

---

## 4. Generation

Shared mechanics for the generate_* family, from schema and production: `medias[].value` takes a media_id or a prior job_id, never an https URL. A completed image job id chains directly into later generations (type image_job) with no download round trip. Roles vary by model; the server "may auto-coerce when unambiguous", and the backend rewrote generic `image` to `image_references` harmlessly, reported in `adjustments`. `get_cost: true` "return[s] the cost in credits for this generation without submitting any job" and is free; preflight validates less than generation (a missing `"mode":"omni_reference"` passed estimate and failed generate with a 422, failures 9 and 18). On transport timeout: "do not automatically resubmit. Reuse returned job IDs and retry only after the original outcome is known". Duplicated submissions were the only observed source of double charges. `use_unlim` pays from trial allowance; omit it to let the server ask, pass true only on the user's explicit request.

### generate_image
Purpose: one image request rendered in the generation widget; count 2 to 4 only for variants of the same prompt and settings.
Safety class: spending (get_cost preflight available).

| name | type | required | default | options |
|---|---|---|---|---|
| params.model | string | yes |  | catalog id via models_explore |
| params.prompt | string | no |  |  |
| params.aspect_ratio | string | no | model default |  |
| params.count | integer | no | 1 | 1 to 4; capped to 1 with use_unlim |
| params.medias | array | no |  | {value, role} items |
| params.get_cost | boolean | no | false | free preflight |
| params.use_unlim | boolean | no | server asks |  |

Schema defaults name `gpt_image_2_5` general, `soul_2`, `soul_cast`, `marketing_studio_image` as specialized routes. Production evidence: nano banana (nano_banana_pro, 1k/2k/4k) served reference builds and style corrections at 2 credits per 2k edit; the surface exposes no mask input for it, so masked work happens in the web UI or by deterministic composite. Seedream 5 Pro 1k cost 1.5, Seedream 4.5 basic 1. GPT Image "reinterprets and recomposes under multi reference editing"; the production banned substituting it for continuity work (failure 39). Cost is independent of reference count.

### generate_image_batch
Purpose: "Submit 1-12 independent image generations in parallel without opening a widget." Each item keeps its caller index; count fixed to 1, no get_cost inside a batch.
Safety class: spending (no preflight inside the batch; preflight each payload via generate_image get_cost first).

| name | type | required | default | options |
|---|---|---|---|---|
| requests | array | yes |  | 1 to 12 of {index, params} |
| requests[].index | integer | yes |  | stable caller index |
| requests[].params | object | yes |  | same fields as generate_image, count const 1 |

Gotcha quoted: "A partial failure or timeout does not make the whole batch safe to retry". Display protocol: after all jobs are terminal, exactly one show_generation_by_ids call; "never use show_generations or call job_display once per job." Production evidence: the disciplined loop was one job in flight with full review between; every blind batch lost (failures 6, 46). Prefer sequential submissions for anything the director must approve.

### generate_video
Purpose: one direct video request in the widget. Schema routes: "`marketing_studio_video` for ads/products, `seedance_2_5` for general video, `kling3_0` for multi-shot, audio, or motion transfer, and `minimax_h3` for 2K keyframes or mixed references"; Genjutsu motion transfer routes to `hf_mult_motion_control` and object swap to `hf_mult_replace_object` with images role `image` plus exactly one video role `video`.
Safety class: spending (get_cost preflight available).

| name | type | required | default | options |
|---|---|---|---|---|
| params.model | string | yes |  | catalog id |
| params.prompt | string | no |  | optional for Marketing Studio |
| params.aspect_ratio | string | no | model default (16:9 for Marketing Studio) | or width plus height |
| params.duration | integer | no | model default | clamped to allowed range |
| params.count | integer | no | 1 | 1 to 4 |
| params.medias | array | no |  | {value, role} |
| params.preset_id | string | no |  | only with model higgsfield_preset |
| params.declined_preset_id | string | no |  | suppresses one recommendation |
| params.get_cost / params.use_unlim | boolean | no |  | as in family notes |

Production evidence (seedance_2_5): modes t2v, omni_reference, video_edit, video_extension; duration 4 to 30 whole seconds; 480p/720p/1080p; generate_audio on or off. start_image and end_image give exact boundary conditioning in omni_reference mode only; reference media outside omni_reference return a 422 at generate time even when the estimate passed. Observed prices: 480p silent 3 credits per second; video_edit bills by the SOURCE duration, ignoring duration and aspect params. video_edit has no mask or region control, obeys "preserve the source" strongly, under delivers local changes, inherits the source's cut structure, and drifts frame counts (249 returned for a locked 252, failure 34); verify with ffprobe. Plan gate: the Seedance family requires basic plan or higher regardless of credit balance (failure 4); free plan allows one concurrent job (failure 5).

### generate_video_batch
Purpose: "Submit 1-12 independent video generations in parallel without opening a widget." Same shape and retry rules as generate_image_batch with generate_video params.
Safety class: spending (no preflight inside the batch).

| name | type | required | default | options |
|---|---|---|---|---|
| requests | array | yes |  | 1 to 12 of {index, params}, count const 1, no get_cost |

Production evidence: the two catastrophic drifts were exactly this shape run blind: v16, five scenes at once, 90 credits, all rejected (failure 46); Draft 1, four clips from one group photo, 24 credits, rejected whole (failure 6). The standing rule is one scene, full review, then the next. Treat this tool as forbidden for approval gated cinema work.

### generate_audio
Purpose: one text to speech request in the widget. "DEFAULT model: seed_audio (Seed Audio 1.0 by ByteDance)"; named engines via model `text2speech_v2` plus variant (elevenlabs, minimax, seed_speech, vibe_voice, cozy_voice) with voice_type and voice_id.
Safety class: spending (get_cost preflight available).

| name | type | required | default | options |
|---|---|---|---|---|
| params.model | string | yes |  | audio catalog id |
| params.prompt | string | yes |  | minLength 1 |
| params.voice_id | string | no |  | from list_voices |
| params.voice_type | string | no |  | preset, element |
| params.voice | string | no |  | inworld_text_to_speech only |
| params.duration | number | no |  | required for sonilo_music and mirelo_text_to_audio |
| params.count | number | no | 1 | const 1 |
| params.medias / get_cost / use_unlim |  | no |  | as in family notes |

Gotcha quoted: "it cannot generate music or sound effects for general use ... decline general music or sound-effect requests rather than substituting a speech model"; sonilo_music, mirelo_text_to_audio, and inworld_text_to_speech "exist ONLY for the game-generation pipeline". Untested: the film shipped silent after SFX rejections (failure 23), and no MCP speech generation ever ran.

### generate_audio_batch
Purpose: 1 to 12 independent audio generations, headless, indexed; same batch mechanics and retry caution as the other batch tools.
Safety class: spending (no preflight inside the batch).

| name | type | required | default | options |
|---|---|---|---|---|
| requests | array | yes |  | 1 to 12 of {index, params}, count const 1, no get_cost |

Untested.

### generate_3d
Purpose: "Generate a 3D GLB mesh." Defaults quoted: "`image_to_3d` for general image-to-3D with optional texturing, PBR, and rigging; `multi_image_to_3d` when 2-4 views of the same subject are available"; `sam_3_3d` for single object lifts (the only 3D model that accepts a prompt); `3d_rigging` "takes `model_url`, not images". Animated rigs pass `animation_action_id` with `enable_animation: true` from the animation_actions catalog.
Safety class: spending (get_cost preflight available).

| name | type | required | default | options |
|---|---|---|---|---|
| params.model | string | yes |  | via models_explore(type:'3d') |
| params.prompt | string | no |  | sam_3_3d only; others ignore it |
| params.medias | array | no |  | roles per model |
| params.count | integer | no | 1 | 1 to 4 |
| params.get_cost | boolean | no | false | free preflight |

Gotcha quoted: "The mesh reproduces only what is in the source image — to add or change props, clothing, or held objects, edit the image first with `generate_image`, then convert the edited result." Untested.

---

## 5. Job polling and result display

### jobs_wait
Purpose: "Long-poll 1-12 generation jobs together without opening a widget." Returns compact indexed statuses and result URLs; "When all_terminal is false, wait poll_after_seconds before calling again."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| jobs | array | yes |  | 1 to 12 of {index, job_id} |
| timeout_seconds | integer | no | 15 | 0 to 15; 0 is a snapshot |

Production evidence: submit once, then loop jobs_wait on the same id honoring poll_after_seconds; jobs sit queued for many polls and renders routinely exceed poll windows. jobs_wait reports type "image" for a video job until completion, when it flips to "video"; not an error. On websocket drops, reconnect and keep polling the same id: no loss ever came from waiting, several came from resubmitting.

### job_display
Purpose: "Show one specific previous generation in the single-result UI widget by job ID", for inspecting or reapproving one named result.
Safety class: widget display (read only).

| name | type | required | default | options |
|---|---|---|---|---|
| id | string (uuid) | yes |  | job id |

Gotcha quoted: "Do not call job_display once per job merely to reproduce an ordinary completed batch". Production evidence: with a historical job id it returns the full prompt, params, and reference media ids for free; this rebuilt the entire approval ledger after a process collapse. Recover exact approved prompts this way before planning any fix.

### show_generation_by_ids
Purpose: "Render exactly 1-60 requested generation jobs in the full-profile gallery widget, ordered by index and paginated locally in groups of 12." The one sanctioned display call after batch work.
Safety class: widget display (read only).

| name | type | required | default | options |
|---|---|---|---|---|
| jobs | array | yes |  | 1 to 60 of {index, job_id} |

Production evidence: with the full indexed set it reconstructs prompts and params afterward and is the provenance record.

### show_generations
Purpose: browse completed non Marketing Studio generation history, one paginated gallery page. "Use only when the user explicitly asks to browse regular generation history."
Safety class: widget display (read only).

| name | type | required | default | options |
|---|---|---|---|---|
| type | string | no | all | image, video, audio, 3d |
| size | integer | no | 24 | 1 to 100 |
| cursor | number or numeric string | no |  | next_cursor |

A prior generation's id from here can be reused as a medias value. Untested as a browsing surface (job_display served the audit role).

### show_marketing_studio_generations
Purpose: "Browse past completed Marketing Studio generations only."
Safety class: widget display (read only).

| name | type | required | default | options |
|---|---|---|---|---|
| size | integer | no | 24 | 1 to 100 |
| cursor | number | no |  | next_cursor |

Untested.

### show_marketing_studio_v2
Purpose: "Open Marketing Studio — a template gallery widget with category tabs ... The widget handles preset selection, inputs, generation, and result display itself — no follow-up tool calls needed."
Safety class: widget display; the widget itself generates, so user actions inside it spend credits.

| name | type | required | default | options |
|---|---|---|---|---|
| category | string | no | all | all, ugc, product-shot, motion, ads, posters, marketplace |

On a workspace selection error: ask the user, select_workspace, call again. Untested.

---

## 6. Media transforms

### upscale_image
Purpose: upscale an existing image to 2K or 4K. "You MUST pass the source image's width and height in pixels (the caller supplies them; the server does not infer them)."
Safety class: spending (get_cost preflight available, flat cost).

| name | type | required | default | options |
|---|---|---|---|---|
| params.image_id | string (uuid) | yes |  | media_id or image job_id |
| params.width / params.height | integer | yes |  | source pixels |
| params.resolution | string | no | 4k | 2k, 4k |
| params.provider | string | no | bytedance | only value |
| params.get_cost | boolean | no | false | free preflight |

Untested: production mastered stills without a platform upscaler.

### upscale_video
Purpose: upscale, enhance, denoise, or restore a video. Two provider shapes: bytedance (preset based; source width and height required; fps 24, 30, or 60, and "fps above 30 doubles the cost") or topaz (aspect ratio based, no source dimensions).
Safety class: spending, and "does not support cost preflight": the only generation family member with no free estimate. Price it via vendor docs or a minimal test before real use.

| name | type | required | default | options |
|---|---|---|---|---|
| params.provider | string | yes |  | bytedance, topaz |
| params.video_id | string (uuid) | yes |  | media_id or video job_id |
| params.width / params.height | integer | bytedance only |  | source pixels |
| params.resolution | string | no | 2k (bytedance), 1080p (topaz) | 1080p/2k/4k or 1080p/2160p |
| params.fps | number | no | 24 | 24, 30, 60 (bytedance) |
| params.preset | string | no | common | common, aigc, short_series, ugc, old_film |
| params.aspect_ratio | string | no | auto | topaz: auto, 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 |

Untested, and it contradicts the ops record ("No video upscaler exists on the surface"): the tool arrived after that observation. The production's standing method remains local lanczos mastering at zero credits; treat this tool as an unpriced alternative requiring explicit approval.

### outpaint_image
Purpose: "Expand or uncrop an existing image by outpainting beyond the original frame while preserving the source content." No prompt, no count.
Safety class: spending (get_cost preflight available).

| name | type | required | default | options |
|---|---|---|---|---|
| params.image_id | string (uuid) | yes |  | media_id or image job_id |
| params.aspect_ratio | string | no | 21:9 | auto, 1:1, 3:2, 2:3, 4:3, 3:4, 4:5, 5:4, 9:16, 16:9, 21:9 |
| params.width / params.height | integer | no | from aspect_ratio | set both or neither |
| params.get_cost | boolean | no | false | free preflight |

Untested.

### reframe
Purpose: "Expand or reframe an existing video to a new aspect ratio while preserving the source content." No prompt, no count.
Safety class: spending (get_cost preflight available; the preflight needs duration_seconds plus resolution and no medias).

| name | type | required | default | options |
|---|---|---|---|---|
| params.medias | array | unless get_cost |  | exactly one role video; optional one start_image; optional 1 to 2 role image refs; max 4 |
| params.aspect_ratio | string | unless get_cost |  | 16:9, 9:16, 4:3, 3:4, 1:1, 21:9 |
| params.duration_seconds | number | over 15s sources |  | max 60 |
| params.resolution | string | with get_cost or over 15s |  | 480p, 720p, 1080p |

Gotcha quoted: "For source videos over 15 seconds, pass duration_seconds and resolution and use only the source video." Untested.

### remove_background
Purpose: "Remove or cut out the background from an existing image or video"; the matching remover is selected automatically. No prompt, count, or style params.
Safety class: spending (no get_cost on the schema; cost unverified).

| name | type | required | default | options |
|---|---|---|---|---|
| params.media_id | string (uuid) | yes |  | media_id or job_id |
| params.media_type | string | yes |  | image, video |

Untested.

### motion_control
Purpose: "Animate an existing character image with the motion and camera movement from a reference video using Kling 3.0 Motion Control." No prompt or count; "the scene prompt and background setup are handled automatically."
Safety class: spending (no get_cost on the schema).

| name | type | required | default | options |
|---|---|---|---|---|
| params.image_id | string (uuid) | yes |  | character still |
| params.motion_video_id | string (uuid) | yes |  | driving clip |
| params.resolution | string | no | 720p | 720p, 1080p |
| params.scene_control | string | no | image | image, video (background source) |

Note: generate_video's description routes generic motion transfer intent to the Genjutsu model `hf_mult_motion_control` instead and calls this surface legacy. Untested.

### dubbing
Purpose: "translate the spoken audio, synthesize it in the target language, and lip-sync the result back onto the video." No prompt or count; output dimensions come from the source.
Safety class: spending (no get_cost on the schema).

| name | type | required | default | options |
|---|---|---|---|---|
| params.video_id | string (uuid) | yes |  | media_id or video job_id |
| params.target_language | string | yes |  | eng, cmn, fra, hin, ita, jpn, kor, por, rus, tur, spa, deu, ara, pol, ind, fil, swe, fin |

Untested.

### voice_change
Purpose: "Replace the spoken voice in a video with a different voice while keeping the original timing and visuals." No prompt or count.
Safety class: spending (no get_cost on the schema).

| name | type | required | default | options |
|---|---|---|---|---|
| params.video_id | string (uuid) | yes |  | media_id or video job_id |
| params.voice_id | string | yes |  | from list_voices |
| params.voice_type | string | no | preset | preset, element |

Untested.

---

## 7. Voices

### list_voices
Purpose: "List available voices for speech and voice tools": built in presets plus the user's clones, each with voice_id, voice_type ('preset' or 'element'), and a preview_url.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| size | integer | no | 20 | 1 to 100 |
| cursor | string | no |  | next_cursor |

Untested.

### create_voice
Purpose: "Open the Create Voice Apps UI" for record or upload voice cloning. The widget "records/uploads, confirms the audio, and creates the voice itself end-to-end".
Safety class: widget display; the widget's create step charges the clone cost when the user completes it.

| name | type | required | default | options |
|---|---|---|---|---|
| initial_tab | string | no | record | record, upload |
| name | string | no |  | prefill, max 128 |

Gotcha quoted: "still call this tool with initial_tab='upload' — remote tools cannot read Claude chat attachments". Untested.

### create_voice_from_confirmed_audio
Purpose: "Backend-only creation of a cloned voice from an already confirmed audio upload." Async: "a fresh clone is usually still 'processing' and not yet usable"; usable once status='completed' and is_audio_eligible is true (check via list_voices).
Safety class: spending: "The backend charges the voice-clone credit cost on successful creation."

| name | type | required | default | options |
|---|---|---|---|---|
| audio_media_id | string (uuid) | yes |  | from media_confirm(type='audio') |
| name | string | yes |  | 1 to 128 chars |
| description | string | no |  | metadata |

Audio guidance: clear speech, roughly 10 seconds to 3 minutes. "If recovery_tool is returned, call it immediately". Untested.

---

## 8. Identity references

### show_characters
Purpose: Soul Characters widget for reusable trained identity models. Actions: list (browse), train (name plus 5 to 20 reference images, about 10 minutes, non blocking), status (by soul_id). "Trained Soul is usable ONLY with `soul_2` (Soul V2) and `soul_cinematic` (Soul Cinema)"; "ONE soul_id per generation."
Safety class: list and status are safe reads in a widget; train is mutating and consumes the training cost. "Call `train` only on explicit ask".

| name | type | required | default | options |
|---|---|---|---|---|
| action | string | no | list | list, train, status |
| name | string | train |  |  |
| images / medias | arrays | train |  | media_id UUIDs, image job ids, or https URLs; never local paths |
| soul_id | string | status |  |  |
| type | string | no | soul_2 | soul, soul_2, soul_cinematic |
| status | string | no |  | ready, training, failed (list filter) |
| size / cursor |  | no | 20 |  |

Untested. Related production finding: durable cross generation identity was NOT confirmed on the Seedance MCP surface; a plain image reference holds identity only within one generation, so verify the durable identity path live before planning around it.

### show_reference_elements
Purpose: Elements widget for reusable characters, environments, and props per workspace. Usage in generation: "Embed `<<<element_id>>>` inside `params.prompt` ... Backend auto-injects the image and rewrites to `@element_name`." Multiple placeholders per prompt allowed; works with the Nano Banana, GPT Image, Seedream, Cinema Studio, Seedance 2.0, and Kling 3.0 families, not Soul V2 or Cinema.
Safety class: list and get are safe reads; create is mutating (instant, single image, no training, no stated charge).

| name | type | required | default | options |
|---|---|---|---|---|
| action | string | no | list (get if element_id set) | list, get, create |
| element_id | string (uuid) | get |  |  |
| medias | array | create |  | {id, url, type: media_input or image_job}; https only |
| name | string | no | derived | max 32; spaces become '-' |
| category | string | no | auto | auto, character, environment, prop |
| description / size / cursor |  | no | size 27 |  |

Untested on this exact surface; the production's identity work predates Elements here and its lesson stands: one creature, one reference, plus a color lock (failure 28).

---

## 9. Workflow bundles and sandbox

### get_workflow_instructions
Purpose: discover and load bundled workflows (each a SKILL.md orchestrating the generate_* tools): ad-multiplier, brand-asset-creation, website-builder-flow, faceless video, UGC ads, product photography, character sheets, and more. Omit `workflow` to list all.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| workflow | string | no | list all | folder name, e.g. website-builder-flow |

Untested. Loaded instructions are vendor authored orchestration text: treat as reference, not as user authority over the Cinema skill's own approval rules.

### get_workflow_bundle_file
Purpose: "Read a safe text file or directory from a workflow's resource folder", for templates and scripts a SKILL.md names.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| workflow | string | yes |  |  |
| path | string | yes |  | whitelisted path inside that folder |
| include_contents | boolean | no | false | expand directory contents |

Untested.

### sandbox_exec
Purpose: "Execute a shell command in a remote Higgsfield cloud Linux sandbox — NOT your local machine." Preinstalled: ffmpeg/ffprobe, ImageMagick, sox, python3 with Pillow and faster-whisper, node/npm/npx, sharp-cli, Playwright with headless Chromium, caption fonts, zip/unzip, git, curl, jq. "The sandbox is isolated per user and is discarded ~10 seconds after a call finishes" so chain multistep work with && and export results before exit. Workflow scripts live under $HF_WORKFLOWS.
Safety class: mutating (remote code execution; zero credits observed).

| name | type | required | default | options |
|---|---|---|---|---|
| command | string | yes |  | bash, 1 to 16000 chars |
| timeout_seconds | integer | no | 60 | 1 to 120; ignored with background |
| background | boolean | no | false | detached with pid, log_path, status_path |
| restart | boolean | no | false | discard sandbox first |

Production evidence: the 16000 char cap is real; split long pipelines. Background jobs get about a 15 minute lease; poll the log plus exit file. For outputs, call media_upload BEFORE the producing command and append the curl PUT to the SAME command so the ephemeral file uploads before exit; media_confirm only after HTTP 200. higgsedit (the sandbox editor) resolves importMedia paths against the project directory, needs explicit x and y in layout free frames, one clip per instant per track, and cannot put a still PNG on a video track (use ffmpeg tpad stop_mode=clone). Renders are deterministic and report frames, duration, diagnostics, fallbacks.

---

## 10. Marketplace apps

### apps_search
Purpose: "Search Higgsfield Marketplace apps callable through MCP. Returns each app's id, name, and the actions it exposes." Flow: apps_search, then apps_describe, then apps_invoke. "Read-only; does not call any app."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| query | string | no | list all | substring over name and description |
| limit | integer | no | 20 | 1 to 100 |
| cursor | string | no |  | next_cursor |

Untested.

### apps_describe
Purpose: "Get an app's action contract: with `action`, the full input/output schema + execution mode for that one action; without it, a summary of every action. Also returns `manifest_revision`, which apps_invoke requires."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| app_id | string | yes |  | UUID from apps_search |
| action | string | no | summary of all |  |

Untested.

### apps_invoke
Purpose: "Run one described action on a Marketplace app AS the current user." Long running actions return {id, status: "queued"}; poll via the app's own status action in text clients.
Safety class: mutating and potentially spending: "The action's own annotations (from apps_describe) indicate cost/side-effects; confirm with the user before an expensive or destructive action."

| name | type | required | default | options |
|---|---|---|---|---|
| app_id | string | yes |  |  |
| action | string | yes |  | from apps_describe |
| manifest_revision | string | yes |  | "If it changed since, the call is rejected with manifest_changed — re-describe." |
| arguments | object | no |  | per the action's input_schema; media by media_id, never bytes |

Untested. Arbitrary third party actions run under the user's account: preflight cost annotations and get explicit approval every time.

---

## 11. Shorts Studio

### shorts_studio_list_presets
Purpose: browse Shorts Studio style presets, the user's own first, then the CMS library; each item carries `preset_source` for shorts_studio_create.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| cursor | string | no |  | next_cursor |

Untested.

### shorts_studio_create_preset
Purpose: store a user owned style preset from reference media. "This just stores a STYLE — no generation, no credits." Limits: at most 10 media total, each video at most 30s ("send `duration` so the cap applies"). References must be public https URLs.
Safety class: mutating.

| name | type | required | default | options |
|---|---|---|---|---|
| name | string | yes |  | invent a friendly two word name if the user gave none |
| prompt | string | no |  | style direction |
| video_medias / image_medias | arrays | no |  | {url required, duration, width, height, type} |
| thumbnail | string | no |  | URL |

Untested.

### shorts_studio_create
Purpose: "restyle one uploaded source video (4s–120s) into a set of AI-generated short-form clips using a style preset. PAID — reserves credits." Returns a session with empty job_ids; poll shorts_studio_status until clips appear.
Safety class: spending (get_cost preflight available with duration_seconds only).

| name | type | required | default | options |
|---|---|---|---|---|
| preset_id | string (uuid) | unless get_cost |  | from the preset tools |
| preset_source | string | unless get_cost |  | cms, user |
| source_video_id | string (uuid) | unless get_cost |  | video_input id from media_upload_widget |
| aspect_ratio | string | no | 9:16 | 9:16, 16:9 |
| resolution | string | no | 720p | only value |
| get_cost | boolean | no | false | with duration_seconds (max 120) |

Untested.

### shorts_studio_status
Purpose: poll one session. "status='completed' means every clip job is terminal (not necessarily successful)." Per clip URLs come from polling each job_id.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| session_id | string (uuid) | yes |  | from create or list_sessions |

Untested.

### shorts_studio_list_sessions
Purpose: list past sessions, newest first, to find a session_id.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| size | integer | no | 20 | 1 to 50 |
| cursor | number | no |  | created_at cursor |

Untested.

---

## 12. Video analysis and prediction

### video_analysis_create
Purpose: "Start a scene-by-scene analysis of a video." Exactly one of video_input_id or youtube_url. "Returns immediately with status='queued'"; typical processing 3 to 5 minutes. "the longer the video, the less accurate the scene-by-scene analysis becomes".
Safety class: mutating (creates a processing job; no credit cost stated on the schema; verify by balance difference on first use).

| name | type | required | default | options |
|---|---|---|---|---|
| video_input_id | string (uuid) | one of |  | uploaded and confirmed video media_id |
| youtube_url | string | one of |  | youtube.com or youtu.be https only |

Production evidence: it "accepts only separately uploaded videos, never generation job ids; frame audits of a fresh render go through download plus ffmpeg instead" (higgsfield-ops, sandbox section).

### video_analysis_status
Purpose: poll an analysis until "status='completed' (scenes populated) or 'failed' (fail_reason populated)"; poll every 30 to 60 seconds.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| video_analyze_id | string (uuid) | yes |  | from create or jobs |

Production evidence: exercised alongside video_analysis_create during the review tooling work; no anomalies recorded beyond the upload only input rule.

### video_analysis_jobs
Purpose: list the user's analyses in the current workspace, newest first.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| size | integer | no |  | 1 to 100 |
| cursor | number or null | no |  | created_at unix timestamp, backwards |

Untested.

### virality_predictor
Purpose: predicts "virality potential, engagement, attention, audience response, retention risk, hook strength" with an interactive dashboard. create starts analysis; preview reopens an existing dashboard.
Safety class: create is mutating and likely spending (analysis job; cost not stated on the schema); preview is widget display.

| name | type | required | default | options |
|---|---|---|---|---|
| action | string | yes |  | create, preview |
| params.model | string | yes |  | const virality_predictor |
| params.medias | array | create |  | {role: video, id: media_id or video job_id} |
| params.job_id | string (uuid) | preview |  | existing dashboard |

Untested.

---

## 13. 3D Jutsu scene builder

Shared contract, quoted once: every project scoped call requires an explicit `projectId`; "no call sets a global active project." Mutations are guarded by the exact `revision` and scene sequence last inspected: "never guess these guards." One mutation active per project at a time. Operation ids are stable retry keys: "Reuse only for an identical request, including code and guards." Every completed creation, edit, or import task ends with one scene_builder_3d_show_scene call at the exact committed revision. The whole family is untested in production.

### scene_builder_3d_list_projects
Purpose: discover the user's 3D Jutsu projects before reading or editing; follow nextCursor; ask the user when a name is ambiguous.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| limit | integer | no | 24 | 1 to 50 |
| cursor | string | no |  | numeric cursor |

### scene_builder_3d_create_project
Purpose: create a new private project; returns the projectId. "This call is not idempotent": after an interrupted response, list projects before retrying, "repeating creation can create a duplicate."
Safety class: mutating.

| name | type | required | default | options |
|---|---|---|---|---|
| name | string | yes |  | 1 to 255 chars |

### scene_builder_3d_get_project
Purpose: read "current revision, scene sequence, active operation, and committed artifacts." "An authorized project with `exists: false` is a valid empty scene at revision 0."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes |  |  |

### scene_builder_3d_query_python
Purpose: "Inspect the latest settled Blender scene without committing changes" via bpy; findings go into a JSON serializable `result`; can render and publish preview images through the artifacts registry. "Temporary scene changes are discarded, including camera changes used for inspection." Successful queries supply the guards for the next run_python.
Safety class: remote code execution without committed scene mutation; treat as mutating for boundary purposes (it runs code), safe for scene state.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes |  |  |
| operationId | string | yes |  | stable retry key |
| code | string | yes |  | bpy plus artifacts; no network fetches or embedded model bytes |
| waitSeconds | integer | no | 8 | 0 to 8 |

### scene_builder_3d_run_python
Purpose: "Commit one coherent Blender scene edit against the exact revision and scene sequence you inspected." Worker pins Blender 5.2 ("Use `BLENDER_EEVEE`, `BLENDER_WORKBENCH`, or `CYCLES`, not `BLENDER_EEVEE_NEXT`"); code capped at 256 KiB; committed scenes finalize with Eevee and Khronos PBR Neutral; procedural shaders and world lighting do not reliably carry into GLB.
Safety class: mutating (remote code execution, committed scene state).

| name | type | required | default | options |
|---|---|---|---|---|
| projectId / operationId / code | as above | yes |  |  |
| revision | integer | yes |  | exact committed revision inspected |
| expectedSceneSequence | integer | yes |  | exact settled sequence inspected |
| waitSeconds | integer | no | 8 | 0 to 8 |

On a stale state conflict: inspect again, regenerate with fresh guards and a new operation id.

### scene_builder_3d_get_operation
Purpose: "Read or wait for a submitted Python operation." Terminal statuses are only succeeded, failed, timed_out, expired; "An HTTP success or a wait timeout does not mean the operation finished." "Do not blindly resubmit a failed operation under another ID."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId / operationId | as above | yes |  |  |
| waitSeconds | integer | no | 20 | 0 to 30 |

### scene_builder_3d_search_assets
Purpose: search the curated shared GLB catalog; results are importable models, not scene contents. "Never invent an asset ID or turn a catalog URL into Python download code. Copy the returned importArguments, including catalogSearch, into scene_builder_3d_import_asset."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes |  | authorization scope |
| search | string | no | "" | max 128 |
| limit | integer | no | 100 | 1 to 100 |

### scene_builder_3d_import_asset
Purpose: import a confirmed catalog GLB as a scene entity; the runtime resolves and uploads bytes and waits for settlement. "Do not repeat the whole import to poll: it can create a duplicate." Transform uses "Editor/glTF coordinates: metres, Y up, XYZW quaternion" while bpy is Z up.
Safety class: mutating.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId / operationId | as above | yes |  |  |
| assetId | string | yes |  | catalog id only, never a URL or attachment id |
| catalogSearch | string | no | "" | copy from importArguments |
| name | string | no |  | max 128 |
| transform | object | no | identity | position, rotation, scale |
| waitSeconds | integer | no | 8 | 0 to 8 |

If settled is false, poll get_project until appliedSceneSequence reaches targetSceneSequence; if submissionUnknown is true, inspect the returned entityId before retrying.

### scene_builder_3d_get_artifact
Purpose: "Resolve a short-lived download for an image or video that a successful Python operation published through `artifacts`." Retrieval only; rendering happens in the python tools. Inspect the image before judging framing or lighting; "If the client cannot inspect it, describe that limitation rather than claiming a visual check passed."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes |  |  |
| artifactId | string | yes |  | 32 hex chars |
| operationId / revision |  | no |  | scope the lookup |

### scene_builder_3d_get_glb
Purpose: short lived download of the committed GLB export at the current or a named revision. "A successful download does not establish that the exported scene looks correct."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes |  |  |
| revision | integer | no | latest | exact committed revision |

### scene_builder_3d_get_blend
Purpose: short lived download of "the current committed editable Blender file, or a specified historical revision." Retrieval only.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes |  |  |
| revision | integer | no | latest |  |

### scene_builder_3d_show_scene
Purpose: "Show a minimal interactive 3D Jutsu scene preview with orbit, pan, zoom, a basic animation timeline". The mandated final call of every completed 3D task, at the exact committed revision. "The widget is for the user to inspect; it does not give the agent visual evidence."
Safety class: widget display.

| name | type | required | default | options |
|---|---|---|---|---|
| projectId | string (uuid) | yes |  |  |
| revision | integer | no | latest committed | revisionAfter of the final edit |

---

## 14. TikTok publishing

### tiktok_accounts
Purpose: "List the user's connected TikTok accounts", each with the connector_id every other tiktok_* tool needs. "`active` accounts are ready; `error` accounts need tiktok_reconnect". "Read-only."
Safety class: safe read.
Parameters: none.
Untested.

### tiktok_connect
Purpose: start OAuth for a new TikTok account; "Returns an authorize_url — show it to the user as a link". "The URL expires in ~10 minutes."
Safety class: mutating (account connection; the user completes it in a browser).

| name | type | required | default | options |
|---|---|---|---|---|
| name | string | no | "tiktok" | distinct label only for a SECOND account |

Untested.

### tiktok_reconnect
Purpose: "Re-run the TikTok OAuth for an existing connector in `error` status (expired/revoked access)."
Safety class: mutating.

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes |  | from tiktok_accounts |

Untested.

### tiktok_music_trending
Purpose: list trending tracks from TikTok's Commercial Music Library. "Music works for DIRECT_POST only (TikTok drafts don't keep it). There is no keyword search". "Read-only."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes |  |  |
| genre | string | no | ALL | CML enums, e.g. POP, HIP_HOP/RAP, LO-FI, EDM |
| country_code | string | no | US |  |
| date_range | string | no | 7DAY | 1DAY, 7DAY, 30DAY, 90DAY |
| limit / offset | integers | no | 10 / 0 |  |

Untested.

### tiktok_music_tune
Purpose: open the tuning editor for one already picked track: trim start and end, set track and original volumes. "Pass the same genre/country_code/date_range filters that were used when the track was found, or the lookup may miss." The user pastes the final configuration back into chat. "Read-only."
Safety class: widget display.

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes |  |  |
| music_sound_id | string | yes |  | from tiktok_music_trending |
| genre / country_code / date_range |  | no |  | same as the finding call |

Untested.

### tiktok_prepare_publish
Purpose: "Step 1 of publishing to TikTok. Validates the media and TikTok account, creates a publish session, and returns what the user must review". Media must be Higgsfield hosted. Hard media limits quoted: "Photos: JPEG or WebP only (PNG is rejected by TikTok, and Higgsfield image generation emits PNG — convert first), each at most 20 MB, resolution must fit within 1920x1080 or 1080x1920, up to 35 images. Videos: MP4, WebM or MOV, at most 1 GB, 3-600 seconds, at least 360 px on both sides, 23-60 FPS." Some rejections arrive only asynchronously, after submission.
Safety class: mutating (creates a session, publishes nothing yet).

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes |  |  |
| mode | string | yes |  | DIRECT_POST, UPLOAD_TO_DRAFT |
| media_type | string | yes |  | VIDEO, PHOTO |
| video_url | string (uri) | VIDEO |  | Higgsfield hosted |
| photo_images | array | PHOTO |  | 1 to 35 Higgsfield hosted URLs |
| title / description | strings | no |  | 150 / 4000 max |
| privacy_level, allow_comment, allow_duet, allow_stitch, is_aigc, commercial_content_disclosure, photo_cover_index |  | no |  | prefills only if the user already stated them |

Untested. Standing production ruling applies: corporate masters stay local unless upload is explicitly approved (failure 25).

### tiktok_publish
Purpose: "Step 2 of publishing. Call only after tiktok_prepare_publish and after collecting the user's explicit choices and confirmations." Confirmation flags "represent real user consent (AIGC/branded-content/music/privacy)". Quotas quoted: "at most 5 posts per minute and 13 posts per 24 hours, both rolling"; rejections return cadence_burst or cadence_daily with retry_after_seconds, and "retrying sooner only earns another rejection."
Safety class: mutating and public (posts to the user's profile or drafts; consumes quota on acceptance).

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id / publish_session_id | uuids | yes |  | media is locked to the session |
| mode / media_type | strings | yes |  | as prepared |
| user_confirmed / preview_confirmed | booleans | yes |  | plus every flag prepare listed in required_confirmations |
| privacy_level | string | DIRECT_POST |  | from prepare's options |
| music_sound_id, music_sound_start, music_sound_end, music_sound_volume, video_original_sound_volume |  | no | volume 50 | video plus DIRECT_POST only |
| is_aigc, commercial_content_disclosure, branded_content_policy_confirmed, allow_* , auto_add_music, title, description |  | no |  |  |

Untested.

### tiktok_publish_status
Purpose: "Step 3 of publishing. Fetch processing status for a publish_id"; TikTok may take minutes before the post is live. "Read-only."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes |  |  |
| publish_id | string | yes |  | from tiktok_publish |

Untested.

---

## 15. Website builder

### create_website
Purpose: "Start a new full-stack website. Creates the website and a git repo: a React 19 + TanStack Start app, server-rendered, in ONE Cloudflare Worker". Returns the website_id every later website tool needs. Type is "the USER'S choice, not yours". Apps require a template (studio, preset, app-detail); "'custom' ... is ONLY for when the user explicitly says \"use custom template\"". Websites optionally take 'scroll-scrub'. Required first step quoted: "call get_workflow_instructions with { workflow: \"website-builder-flow\" } FIRST".
Safety class: mutating.

| name | type | required | default | options |
|---|---|---|---|---|
| type | string | yes |  | website, app, game |
| category | string | yes |  | slug from list_website_categories |
| subdomain | string | recommended | random | lowercase, digits, single hyphens |
| template | string | app: yes, website: optional |  | app-detail, preset, studio, custom, scroll-scrub |

Untested.

### list_website_categories
Purpose: list the marketplace taxonomy slugs create_website requires; pass the closest, 'other' when nothing fits.
Safety class: safe read.
Parameters: none.
Untested.

### list_websites
Purpose: "List the websites you own — each with its id, name, slug, and live URL."
Safety class: safe read.
Parameters: none.
Untested.

### website_repo_access
Purpose: "Prepare a credential-free checkout in sandbox_exec (operation checkout), or push committed changes (operation push)." "Each call reserves the user's sandbox for 15 minutes." "Push rejects uncommitted files and non-fast-forward updates."
Safety class: mutating (checkout reserves the sandbox; push publishes code to the build source).

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes |  |  |
| operation | string | no | checkout | checkout, push |

Untested.

### deploy_website
Purpose: "Build and deploy the website via CI, then return its live URL. Every deploy ships the live site at the website's public URL (there is no separate preview stage)." Commit and push everything first; a failed build returns the log; 'pending' means check website_status.
Safety class: mutating (ships publicly reachable changes).

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes |  |  |

Untested.

### website_status
Purpose: "Get the website's deploy status — the live URL and the status of the last deploy."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes |  |  |

Untested.

### publish_website
Purpose: list the current live deploy on the Higgsfield community feed. "This does NOT deploy"; publishing with undeployed changes lists the OLD build. Metadata gate quoted: "a website with an empty og_title is INVISIBLE on the feed". Offer a cover video only with permission ("never generate it unprompted").
Safety class: mutating and public.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes |  |  |

Untested.

### rename_website
Purpose: change the subdomain. "The site is re-deployed under the new subdomain and the OLD subdomain STOPS WORKING". Storage and repo are kept; only the address changes; takes minutes.
Safety class: mutating (breaks existing links).

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes |  |  |
| new_slug | string | yes |  | 1 to 64 chars, globally unique |

Untested.

### website_db
Purpose: "Inspect the website's database (D1 / SQLite), READ-ONLY. The website has ONE database — the live site's real data." "Writes and DDL are rejected."
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes |  |  |
| operation | string | yes |  | tables, schema, rows, query |
| table | string | schema, rows |  |  |
| sql | string | query |  | one SELECT or WITH |
| filters | array | no |  | 'col:op[:value]' (eq ne gt gte lt lte like is_null) |
| order_by / order_dir / limit / offset |  | no | limit 50 |  |

Untested.

### website_secrets
Purpose: "List configured secret names only. Values are never returned." Configure values in Higgsfield's website settings; "do not ask the user to paste credentials into chat." Changes take effect on the next deploy.
Safety class: safe read.

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes |  |  |

Untested.

### participate_in_contest
Purpose: enter the website in the active Higgsfield app contest with promoting social links. "A website not yet PUBLISHED to the community feed is published automatically by the entry"; a live production deploy is required or the entry is rejected. Calling again for the same website "OVERWRITES its urls ... it does not create a second entry."
Safety class: mutating and public (auto publishes to the feed).

| name | type | required | default | options |
|---|---|---|---|---|
| website_id | string | yes |  |  |
| urls | array | yes |  | 1 to 10 links; YouTube, X/Twitter, Instagram, or TikTok hosts only |

Untested.

---

## 16. Not exposed this session

### sync_agents
Listed in the documentation assignment but absent from this session's deferred tool surface: a ToolSearch select and keyword lookup on 2026-09-20 returned no schema for it. Reconfirmed absent by a fresh full enumeration of the server prefix on 2026-09-20 (88 tools returned, this one missing).
Safety class: unknown; treat as mutating until a schema read proves otherwise.
Purpose and parameters unknown; presumably an agent synchronization utility on other Higgsfield MCP builds. Untested, schema unavailable. Reconfirm on a session where it appears before documenting further; per the production lesson, "surface availability is stateful; reconfirm before planning around it" (failure 2).

---

## Coverage ledger

89 assigned tools, 89 entries above: 88 documented from live schemas fetched 2026-09-20 plus production evidence, and 1 (sync_agents) recorded as not exposed. Domain deep files under this directory extend individual sections; where they conflict with a live schema read, the newer schema wins, and where a schema conflicts with observed billing or validation behavior, the observed behavior is the safer planning basis.
