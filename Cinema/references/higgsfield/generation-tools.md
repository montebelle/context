# Higgsfield MCP: generation and transform tools

Schema level documentation of the generation and transform surface, written from full MCP schema reads on 2026-09-20. Zero jobs were submitted for this document; the only live call was one read only animation_actions query. Schema descriptions are canonical and quoted verbatim (quoted text keeps its original punctuation). Production evidence comes from `../higgsfield-ops.md` and `../failure-catalog.md`; this file extends those, it does not restate them. Model level detail (catalogs, modes, durations, per model params, media roles) belongs in the model guides and in live `models_explore` reads, not here.

Web sourcing note: higgsfield.ai/pricing serves only client rendered metadata to a fetcher and higgsfield.ai/help returned 404 (both attempted 2026-09-20), so no vendor page citations were usable. Every price in this file is observed production evidence, not brochure copy.

Tool name prefix throughout: `mcp__8d6083eb-41bb-4bd3-bba6-8ccc56929062__`.

## Shared mechanics across the generation tools

### get_cost preflight

Where supported, `get_cost: true` inside params returns the exact price without submitting. The canonical wording: "If true, return the cost in credits for this generation without submitting any job. Use to preflight cost before generating."

Coverage varies by tool, and the gaps matter:

| Tool | get_cost |
|---|---|
| generate_image | yes |
| generate_video | yes |
| generate_audio | yes |
| generate_3d | yes |
| outpaint_image | yes ("return the cost in credits without submitting an outpaint job") |
| reframe | yes, with extra requirements: "Requires duration_seconds and resolution; medias and aspect_ratio are not needed." |
| upscale_image | yes ("flat cost") |
| upscale_video | NO: "does not support cost preflight" |
| motion_control | NO field in schema (additionalProperties false, so it cannot be smuggled in) |
| remove_background | NO field in schema (additionalProperties false) |

Production evidence (ops file): estimates are free, return "No job submitted", and are identical with or without prompt and media attached. But preflight validates less than generation does: the scene 2 mode omission passed estimate and failed generate with a 422 (failure 9). A passed estimate is a price, not a payload approval. For the three tools with no preflight, the only cost control is a balance read before and after; treat any spend through them as blind at schema level.

### use_unlim and the unlim_choice flow

`use_unlim` appears on generate_image, generate_video, and generate_audio. The canonical field description, verbatim:

"Which balance pays for this generation: the caller's free-trial unlimited generations (true) or their credits (false). OMIT IT to let the server decide — if they hold an allowance that covers the model, the tool submits nothing and returns `unlim_choice`, the question to put to the user before spending anything of theirs. Answer it by calling again with the same params plus this field; the answer is remembered for a few minutes, so a multi-step flow is asked once. true also caps count to 1. Whichever way it is set, a rejected opt-in is reported rather than quietly replaced with a charge."

So the flow is: omit the field, and if an allowance covers the model the server submits nothing and hands back `unlim_choice` as a question for John; resubmit the identical params with `use_unlim` set to his answer; the answer is cached for a few minutes so a multi step job set asks once. The tool level descriptions add a hard policy line: "use_unlim defaults false — pass true only when the user explicitly asks to use their unlimited/free-trial generations, never to save them credits on your own initiative." An unlim request is always a single generation: "an unlim request is always one generation — count is capped to 1 and the cap comes back in adjustments."

generate_3d does not declare `use_unlim` in its params, yet its `count` description still says "Ignored with use_unlim"; whether the field passes through (params allow additional properties) is untested. Production never exercised unlim; the whole flow is untested and the free generation path production did use (`use_free_gens`, ops file) is a different explicit flag with typed refusals.

### recovery_tool

generate_image: "If `recovery_tool` returned, call it immediately; do not explain/ask first." generate_3d: "If `recovery_tool` is returned, call it immediately." generate_video: "Apply adjustments and immediately call any recovery_tool." The server can hand back the name of a follow up tool that repairs or completes the request, and the contract is to call it without narrating first. No recovery_tool event appears anywhere in the production record; the behavior is untested. Reconcile it with the spend loop by remembering the recovery call itself may spend nothing (nothing in the schema says it submits a job), but if a recovery call would plainly resubmit a spend, the standing approval discipline in the ops file still governs.

### adjustments

Every generation tool says to apply `adjustments` returned by the server. This is the server telling you what it silently changed about your request. Production observed two concrete cases: the role auto remap (a generic role of `image` rewritten to `image_references`, reported in adjustments with "backend expects schema-key media roles", harmless) and the documented unlim count cap ("the cap comes back in adjustments"). Because the compact API response flattens media roles, the saved payload file remains the role record; adjustments are the drift log to read after every submission.

### Transport timeout rule

Shared verbatim across generate_image, generate_video, generate_audio, generate_3d: "On a transport timeout the submission outcome may be unknown: do not automatically resubmit. Reuse returned job IDs and retry only after the original outcome is known." This is the schema level confirmation of the production retry discipline: submit once, poll the same job id, never resubmit a slow job (ops file; several production losses came from resubmitting, none from waiting).

### Media values and roles

`medias[].value` "must be media_id/job_id, not URL" and "Do not pass https:// URLs here." Confirmed uploaded media ids and completed job ids share one namespace (ops file: completed image job ids chain directly into video jobs). Role strings vary by model; "Server may auto-coerce when unambiguous." One schema level exception exists: reframe image references accept "Confirmed uploaded image media_id or https:// image URL", the only place a raw URL is legal in a medias value.

Local file gate, verbatim from generate_video: "without confirmed media_id values, call `media_upload_widget` first as the only tool in that turn; never inspect /mnt/user-data/uploads, run shell, or ask for a chat attachment." Web media goes through `media_import_url` first. In the Cinema production context the batch flow (media_upload plus curl PUT plus media_confirm) is the proven path; see the ops file for the Content Type signature trap (failure 45).

### Params as a string

generate_image, generate_video, generate_audio, and generate_3d all accept `params` as either an object or a JSON string (`anyOf` with string). The object form is the record keeping form; a string form call would bypass any client side shape checks, so avoid it.

### count versus batch

`count` (1 to 4) is "Number of variants (1-4) generated from this same prompt, inputs, and settings"; independent prompts or inputs belong in the matching `generate_*_batch` tool (2 to 12 requests, headless). generate_audio pins count to a const 1. Production warning that overrides the batch tools' convenience: blind batches lose (failures 6, 46); one scene, full review, then the next.

## Per tool entries

### models_explore

Purpose: "Find generation models. Use recommend with goal + input context; use get for model constraints." The one catalog tool on the current surface, and the discovery step every entry below leans on; it replaces the retired models_get and models_search names in the ops record. Safety class: safe read. This file is the deep home for this tool; the master file keeps its own entry like every other tool.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| action | string | yes | | list, search, get, recommend |
| query | string | no | | free text with input context, e.g. text only, reference image, image to video |
| model_id | string | for get | | |
| type | string | no | all | image, video, audio, 3d |
| input | string | no | | text, image |
| unlim | boolean | no | | true filters to supports_unlim models; each item still carries aspect_ratios, parameters, durations |
| limit | integer | no | 20 (5 for recommend) | 1 to 100 |
| after | string | no | | next_page_token; not used by recommend |

Result reading: items carry `supports_unlim`; the top level `unlim` block says whether the caller can spend an allowance right now, and the trailing "Unlim configs" text lists the configurations it actually covers. Production evidence: catalogs drift and backends route (a nano_banana_pro request was labeled nano_banana_2 on the job); "Trust recorded job model ids, not brochure names." Verify model constraints here before relying on them, and reverify prices with a get_cost preflight, never from the catalog text.

### generate_image

Purpose: one image request, 1 to 4 variants, rendered in the generation widget. Safety class: mutating and spending (safe read only in get_cost mode).

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| model | string | yes | | model id from the catalog |
| prompt | string | no | | |
| aspect_ratio | string | no | | model dependent, see models_explore |
| count | integer | no | 1 | 1 to 4, capped to 1 under unlim |
| medias | array of {value, role} | no | | media_id or job_id values |
| get_cost | boolean | no | | |
| use_unlim | boolean | no | omitted | see unlim_choice flow above |

Params allow additional properties: model specific fields ride at top level (production used `is_inpaint`, quality tiers, and seeds this way on Seedream; each Seedream job returns a seed).

Description encoded routing, verbatim: "Default general image model: `gpt_image_2_5` — use it for ordinary generation, photorealistic images, typography, and reference-based editing unless a specialized route applies." Specialized defaults: `marketing_studio_image` for commercial and ads, `soul_cast` for text only characters, `soul_2` plus `soul_id` for a trained Soul, `soul_2` for portraits and fashion. Also: "Ambiguous create-character/avatar: offer reusable Soul training (5-20 photos, ~10 min) vs one-off; do not train generic silently."

Production evidence overrides the routing default for continuity work: GPT Image "reinterprets and recomposes under multi reference editing; the production banned substituting it for continuity work" (ops file; failure 39 cost 3 credits and was stopped at frame 1). The working still stack was nano banana (nano_banana_pro, no mask input on the MCP surface) and Seedream (5 Pro at 1k = 1.5 credits, 4.5 basic = 1 credit). Backend routing renames models on the job record (nano_banana_pro labeled nano_banana_2); trust job model ids. Soul training, soul_cast, and marketing_studio_image are untested in production.

### generate_video

Purpose: one direct video request rendered in the widget. Safety class: mutating and spending (safe read only in get_cost mode). This is the tool the entire film ran through.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| model | string | yes | | model id from the catalog |
| prompt | string | no | | "Optional for Marketing Studio workflows." |
| aspect_ratio | string | no | model default | or pass explicit width and height, "the backend derives the aspect ratio" |
| duration | integer | no | model default | "Unsupported → nearest allowed value or clamped to range." |
| count | integer | no | 1 | 1 to 4 |
| medias | array of {value, role} | no | | media_id or job_id values |
| preset_id | string | no | | "Use only with model: higgsfield_preset." |
| declined_preset_id | string | no | | "Suppresses only that exact preset recommendation for this literal generation retry." |
| get_cost | boolean | no | | |
| use_unlim | boolean | no | omitted | see unlim_choice flow above |

Additional properties allowed: mode, resolution, generate_audio and other model params ride at top level. The production stack: `seedance_2_5`, modes t2v, omni_reference, video_edit, video_extension; duration 4 to 30 whole seconds; 480p, 720p, 1080p. Reference media are refused outside omni_reference at generate time even when the estimate passed (422, failure 9). start_image and end_image give exact boundary conditioning; video_edit bills by SOURCE duration and ignores the duration and aspect params. Prices, drift behavior, and the video_edit surface limits are in the ops file.

Description encoded routing, verbatim: "Defaults: `marketing_studio_video` for ads/products, `seedance_2_5` for general video, `kling3_0` for multi-shot, audio, or motion transfer, and `minimax_h3` for 2K keyframes or mixed references." Genjutsu routing: "Copy, repeat, reproduce, mimic, or transfer motion, movement, actions, gestures, dance, or camera motion from one driving video to reference-image subjects -> `hf_mult_motion_control`. Replace, change, or swap an object, product, garment, or character in one source video from reference images -> `hf_mult_replace_object`. These are direct `generate_video` models, not legacy `motion_control` or `ad-multiplier`". For those two, "Pass images with role `image` and exactly one source/driving video with role `video`." Everything except seedance_2_5 is untested in production; the ops plan gate warning applies (Seedance is subscription gated regardless of credit balance, and after an upgrade the mode list can collapse to what the account supports).

### generate_audio

Deep home: `audio-voice.md`; this entry restates the schema so the generation family reads as one set.

Purpose: text to speech only. Safety class: mutating and spending (safe read only in get_cost mode). Untested in production: the film shipped silent after the SFX rejections (failures 23 and 35), and no speech job was ever submitted.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| model | string | yes | | audio model id; discover with models_explore(type:'audio') |
| prompt | string | yes | | minLength 1 |
| voice_type | string | no | | preset, element |
| voice_id | string | no | | from list_voices |
| voice | string | no | | inworld_text_to_speech only |
| duration | number | no | | "Required for sonilo_music and mirelo_text_to_audio; omit for the text-to-speech models." |
| count | const 1 | no | 1 | batch tool for independent lines |
| medias | array of {value, role} | no | | audio_references clones a voice; image_references is a cue |
| get_cost | boolean | no | | |
| use_unlim | boolean | no | omitted | see unlim_choice flow above |

Default engine: "DEFAULT model: seed_audio (Seed Audio 1.0 by ByteDance)" with tuning params format, sample_rate, speech_rate, loudness_rate, pitch_rate as pass through fields. Named engines go through model `text2speech_v2` with a `variant` "(one of elevenlabs|minimax|seed_speech|vibe_voice|cozy_voice)".

The hard boundary, verbatim: "This tool only generates speech: it cannot generate music or sound effects for general use, and there is no standalone music/SFX model here — decline general music or sound-effect requests rather than substituting a speech model. The models sonilo_music (music), mirelo_text_to_audio (sound effects) and inworld_text_to_speech (voice) exist ONLY for the game-generation pipeline and must not be used for standalone audio." Any future score or SFX for a film therefore comes from outside this surface.

### generate_3d

Deep home: `scene-builder-3d.md` (with the full rigging and animation flow); this entry restates the schema so the generation family reads as one set.

Purpose: "Generate a 3D GLB mesh." Safety class: mutating and spending (safe read only in get_cost mode). Untested in production.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| model | string | yes | | discover with models_explore(type:'3d') |
| prompt | string | no | | "Only sam_3_3d accepts a prompt (to disambiguate which object to lift). Other 3D models ignore it." |
| count | integer | no | 1 | 1 to 4 |
| medias | array of {value, role} | no | | media_id or job_id values |
| get_cost | boolean | no | | |

Routing defaults, verbatim: "`image_to_3d` for general image-to-3D with optional texturing, PBR, and rigging; `multi_image_to_3d` when 2-4 views of the same subject are available (better geometric accuracy); `sam_3_3d` for single-object reconstruction; `3d_rigging` to rig an existing 3D model (takes `model_url`, not images — pass a prior 3D job_id or an https GLB URL)." Animation: "search clip ids with the `animation_actions` tool and pass `animation_action_id` with `enable_animation:true`" (both as pass through params). One gotcha worth quoting whole: "The mesh reproduces only what is in the source image — to add or change props, clothing, or held objects, edit the image first with `generate_image`, then convert the edited result." No use_unlim field is declared; see the shared section.

### motion_control

Purpose: "Animate an existing character image with the motion and camera movement from a reference video using Kling 3.0 Motion Control." Safety class: mutating and spending, with NO cost preflight. Untested in production.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| image_id | uuid string | yes | | confirmed image media_id or completed image job_id |
| motion_video_id | uuid string | yes | | confirmed video media_id or completed video job_id |
| resolution | string | no | 720p | 720p, 1080p ("720p (cheaper)") |
| scene_control | string | no | image | image, video ("Where the background comes from") |

additionalProperties is false and the ids carry a strict uuid pattern. "This tool does not use prompt or count; the scene prompt and background setup are handled automatically." Note the routing tension: the generate_video description calls this surface "legacy `motion_control`" and routes motion transfer intent to the Genjutsu model `hf_mult_motion_control` inside generate_video instead. Which path is better is unverified; preflight the generate_video path (it has get_cost) and treat this tool as the blind cost fallback.

### outpaint_image

Purpose: "Expand or uncrop an existing image by outpainting beyond the original frame while preserving the source content." Safety class: mutating and spending (safe read only in get_cost mode). Untested in production.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| image_id | uuid string | yes | | confirmed image media_id or completed image job_id |
| aspect_ratio | string | no | 21:9 | auto, 1:1, 3:2, 2:3, 4:3, 3:4, 4:5, 5:4, 9:16, 16:9, 21:9 |
| width | integer | no | derived | "If set, set height too." |
| height | integer | no | derived | "If set, set width too." |
| get_cost | boolean | no | | |

"This tool does not use prompt or count." The auto value: "Use auto to let FNF infer the closest supported ratio from the source image" (FNF is the backend's name for itself here; unexplained elsewhere). Note the default is 21:9, not a preserve the source shape value, so an absent aspect_ratio silently widens to cinema scope. Untested against the production's continuity standards; outpainted regions are generated pixels and would need the same frame audit as any generation.

### reframe

Purpose: "Expand or reframe an existing video to a new aspect ratio while preserving the source content." Safety class: mutating and spending (safe read only in get_cost mode). Untested in production.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| aspect_ratio | string | yes unless get_cost | | 16:9, 9:16, 4:3, 3:4, 1:1, 21:9 |
| medias | array, 1 to 4 items | yes unless get_cost | | see roles below |
| duration_seconds | number | conditional | | over 0, max 60; "Required with resolution when the source video is over 15 seconds." |
| resolution | string | conditional | | 480p, 720p, 1080p; "Required when get_cost is true or duration_seconds is over 15 seconds." |
| get_cost | boolean | no | | needs duration_seconds and resolution, not medias |

Media roles: exactly one role `video` (media_id or job_id), optional one `start_image` ("only when the user provides a first-frame anchor"), optional 1 to 2 role `image` references that "guide filled edges"; image values here may be a media_id or an https image URL, the surface's one URL exception. "For source videos over 15 seconds, pass only the source video." Maximum supported duration is 60 seconds. No prompt, no count. Production note: the film's aspect changes were done locally for zero credits; if reframe is ever used, the filled edges are generated pixels and inherit every invention risk in the failure catalog (invention gravity in wide framings, failure 57).

### remove_background

Purpose: "Remove or cut out the background from an existing image or video." Safety class: mutating and spending, with NO cost preflight. Untested in production (reference cutouts were done in the still models or locally).

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| media_id | uuid string | yes | | confirmed media_id or completed job_id |
| media_type | string | yes | | image, video ("Selects the matching background remover.") |

"This tool does not use prompt, count, or style parameters." additionalProperties false.

### upscale_image

Purpose: "Upscale and enhance an existing image... to 2K/4K." Safety class: mutating and spending (safe read only in get_cost mode). Untested in production.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| image_id | uuid string | yes | | confirmed image media_id or completed image job_id |
| width | integer | yes | | source width in pixels, min 1 |
| height | integer | yes | | source height in pixels, min 1 |
| provider | string | no | bytedance | bytedance only |
| resolution | string | no | 4k | 2k, 4k |
| get_cost | boolean | no | | flat cost |

The trap is in the requirement: "You MUST pass the source image's width and height in pixels (the caller supplies them; the server does not infer them)." Read the real dimensions first (job_display or a local probe); a wrong pair is an unvalidated lie to the upscaler. No prompt, no count.

### upscale_video

Purpose: "Upscale and enhance an existing video... to higher resolution." Safety class: mutating and spending, with NO cost preflight: "does not support cost preflight." Untested in production, and this tool's existence corrects an ops file claim: during production "No video upscaler exists on the surface (models_search returns none)" and mastering went through a local lanczos upscale at zero credits. The dedicated tool now exists at schema level even though the model catalog search saw nothing; the surface drifted. The local zero credit mastering path remains the proven default; any spend here is blind until the first job's charge is confirmed by balance difference.

Two mutually exclusive provider branches (oneOf, additionalProperties false in each):

Provider bytedance ("preset-based"):

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| provider | const | yes | | bytedance |
| video_id | uuid string | yes | | confirmed video media_id or completed video job_id |
| width | integer | yes | | source width in pixels |
| height | integer | yes | | source height in pixels |
| resolution | string | no | 2k | 1080p, 2k, 4k |
| fps | number | no | 24 | 24, 30, 60; "fps above 30 doubles the cost." |
| preset | string | no | common | common, aigc, short_series, ugc, old_film ("matching the source content type") |

Provider topaz ("Topaz Video, aspect-ratio based, target 1080p/2160p — no source dimensions needed"):

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| provider | const | yes | | topaz |
| video_id | uuid string | yes | | confirmed video media_id or completed video job_id |
| resolution | string | no | 1080p | 1080p, 2160p ("Use 2160p for 4K upscale.") |
| aspect_ratio | string | no | auto | auto, 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 ("Use auto to preserve the closest source-video ratio.") |

For AI generated footage the bytedance `aigc` preset is the schema's own hint at the right choice; unverified.

### animation_actions

Purpose: "Read-only catalog of the 3D rig animation library (678 actions: locomotion, gestures, dancing, combat, daily actions)." Safety class: safe read. "Does not create jobs." Feeds `animation_action_id` for generate_3d with `enable_animation: true`.

| Param | Type | Required | Default | Options |
|---|---|---|---|---|
| query | string | no | | matched against name and category; omit to browse |
| group | string | no | | WalkAndRun, BodyMovements, DailyActions, Dancing, Fighting |
| category | string | no | | e.g. Walking, Running, Jumping, Idle, Dancing, Punching |
| limit | integer | no | 20 | 1 to 100 |
| after | string | no | | next_page_token cursor |

Live call 2026-09-20, `{query: "walk", limit: 3}`: returned 3 items of `total_matched: 132`, `has_more: true`, `next_page_token: "3"` (the cursor is an offset), the 5 groups above, and 28 categories (Acting, AttackingwithWeapon, Blocking, CastingSpell, Climbing, CrouchWalking, Dancing, Drinking, Dying, FallingFreely, GettingHit, HangingfromLedge, Idle, Interacting, LookingAround, PerformingStunt, PickingUpItem, Punching, Pushing, Running, Sleeping, Swimming, Transitioning, TurningAround, VaultingOverObstacle, Walking, WorkingOut, Jumping). Each item carries id (an integer, e.g. 1 for Walking_Woman), name, group, category, and a preview_url GIF hosted on cdn.meshy.ai, which implies the 3D animation backend is Meshy (inference from the CDN host, not vendor documented). The schema's own selection guidance: "when several candidates fit (e.g. many Idle or Walk variants), show the user the previews as markdown images and let them pick instead of choosing blindly."

## Untested surface summary

Production has exercised only generate_image (nano banana, Seedream, GPT Image), generate_video (seedance_2_5 in four modes), and the cost preflight path. Untested end to end: generate_audio entirely, generate_3d entirely, motion_control, outpaint_image, reframe, remove_background, upscale_image, upscale_video, every Genjutsu and Marketing Studio and Soul model, the unlim_choice flow, and recovery_tool. First use of any of these follows the full spend loop from the ops file (preflight where it exists, explicit approval, one job, balance confirmation, frame audit) and its result should be written back here.
