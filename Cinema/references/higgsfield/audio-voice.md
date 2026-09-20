# Higgsfield MCP: audio and voice surface

Scope: the speech, voice, dubbing, and music tools plus the TikTok publish chain. Schemas were pulled from the live MCP surface on September 20, 2026 and are canonical; load bearing sentences are quoted verbatim (verbatim quotes keep their original punctuation). The only live call made for this document was one read only `list_voices`. Every other tool here is documented at schema level only. The production that built From Desert to OASYS never touched this surface (the film shipped silent, see failure 23 in `../failure-catalog.md`), so unless an entry says otherwise, treat it as UNTESTED.

Safety classes used below: safe read (no state change, no spend), widget display (opens a UI surface in the client), mutating (creates or changes server state), spending (deducts credits or publishes). Vendor pricing note, retrieved September 20, 2026: "All audio generations through MCP deduct credits at standard rates" (help center, vendor, https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-lipsync-voiceover-and-aspect-ratios).

---

## list_voices

Purpose: enumerate voices usable by the speech tools. "Returns built-in preset voices plus the user's own custom voices. Each voice has a voice_id and a voice_type ('preset' or 'element'); pass that exact pair to the audio models (via generate_audio — seed_audio or text2speech_v2) and to the voice_change tool to select the speaking voice." Also: "Use the preview_url to hear a sample. Paginate with the returned next_cursor."

| name | type | required | default | options |
|---|---|---|---|---|
| cursor | string | no | none | next_cursor from a previous result |
| size | integer | no | 20 | 1 to 100 |

Media roles: none.

Safety class: safe read. TESTED live in this session (September 20, 2026), the one permitted call.

Live inventory shape observed with size 100: top level `{"voices": [...], "has_more": true, "next_cursor": ":123"}`. Each voice object carried exactly `voice_id` (uuid), `voice_type` (every first page entry was `"preset"`), `name`, `gender` (`"male"` or `"female"`, present live though not promised by the schema), `preview_url` (mp3 or wav on d1xarpci4ikg0w.cloudfront.net or cdn.higgsfield.ai), `logo_url` (webp thumbnail). The first page held roughly one hundred preset voices (samples: Grady `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678`, Ainsley `731b4ffe-e95e-59f4-8c00-81608936091f`, Emily `6b3e3642-f7b7-4cb8-9688-51e233c4b92f`, Bob `ca12fd00-218c-5198-b10c-7d36e768c12c`) with `has_more: true`, so the catalog is larger than one page; custom clones would appear as `voice_type: "element"`. The cursor is an opaque literal (`":123"` observed), pass it back exactly. Voice ids are stable uuids, safe to hardcode in a job doc, but reverify before a spend since catalogs drift (standing rule from `../higgsfield-ops.md`).

---

## create_voice

Purpose: open the Create Voice Apps UI for recording or uploading a clone sample. Gotchas, quoted: "Do not ask the user to upload an audio file or provide the name in chat first; the widget collects the required name plus record/upload audio." "If the user already has or attached an audio file in chat, still call this tool with initial_tab='upload' — remote tools cannot read Claude chat attachments, so the user re-selects the file in the widget's Upload tab (it uploads directly to Higgsfield)." "After the widget reports success you do NOT need to call create_voice_from_confirmed_audio again. Only call create_voice_from_confirmed_audio yourself when a confirmed audio_media_id is already present in the prompt and no UI step is needed."

| name | type | required | default | options |
|---|---|---|---|---|
| initial_tab | string | no | record | record, upload |
| name | string | no | none | max 128 chars, prefill only |

Media roles: none (the widget handles the audio itself).

Safety class: widget display; the widget completes the clone end to end, so accepting it inside the UI spends the voice clone credit cost and creates a workspace element. The schema notes the widget "if the user is out of credits or on a free plan it shows the plans/credits UI inline." UNTESTED in production.

---

## create_voice_from_confirmed_audio

Purpose: headless voice cloning from an already confirmed upload. "Backend-only creation of a cloned voice from an already confirmed audio upload. Do not call this tool until audio_media_id and name are already known."

| name | type | required | default | options |
|---|---|---|---|---|
| audio_media_id | string (uuid) | yes | none | confirmed media_id from media_confirm(type='audio') |
| name | string | yes | none | 1 to 128 chars, display name |
| description | string | no | none | backend metadata |

Media roles: the input is a media_id, produced by the standard upload flow. Quoted: "first upload speech audio with media_upload, PUT the bytes, then call media_confirm with type='audio'." Production evidence from `../higgsfield-ops.md` applies directly: the presigned PUT signs the Content Type header, so send the exact header with binary data, and confirm promptly because URLs expire in 86400 seconds (an unconfirmed batch was wasted in production, failure 26).

Input constraint, quoted: "The audio should be clear speech, roughly 10 seconds to 3 minutes, and no larger than the upload limit."

Async lifecycle, quoted: "The backend charges the voice-clone credit cost on successful creation. Cloning is asynchronous: on success the tool returns the new voice_id plus a status, and a fresh clone is usually still 'processing' and not yet usable. Use the returned voice_id with voice_type='element' for generate_audio or voice_change only once it is ready (status='completed' and is_audio_eligible=true). If status is 'processing' or is_audio_eligible is not true, the clone is still training — re-check it with list_voices before generating instead of submitting right away; status 'voice_clone_failed'/'failed' means cloning did not succeed. If recovery_tool is returned, call it immediately; do not explain/ask first."

Safety class: mutating and spending (charged on success). UNTESTED in production. Consent note from the vendor help center (retrieved September 20, 2026): users may only clone "your own" voice or obtain permission first.

---

## dubbing

Purpose: "Dub a video into another language: translate the spoken audio, synthesize it in the target language, and lip-sync the result back onto the video."

| name | type | required | default | options |
|---|---|---|---|---|
| params.video_id | string (uuid) | yes | none | "Confirmed uploaded video media_id or completed video job_id" |
| params.target_language | string | yes | none | eng, cmn, fra, hin, ita, jpn, kor, por, rus, tur, spa, deu, ara, pol, ind, fil, swe, fin |

Media roles: video_id doubles as the media reference; a completed generation job_id is accepted directly, matching the job id as media reference pattern proven live in `../higgsfield-ops.md`. Gotcha, quoted: "This tool does not use prompt or count; output dimensions are taken from the source video automatically."

Eighteen supported languages (code=language): eng=English, cmn=Chinese, fra=French, hin=Hindi, ita=Italian, jpn=Japanese, kor=Korean, por=Portuguese, rus=Russian, tur=Turkish, spa=Spanish, deu=German, ara=Arabic, pol=Polish, ind=Indonesian, fil=Filipino, swe=Swedish, fin=Finnish. The vendor help center (retrieved September 20, 2026) matches: the Translate mode handles "18 languages".

Safety class: mutating and spending. UNTESTED in production. Community reviews warn that dubbing overage can exceed plan sticker price (https://aifunnelinsider.com/higgsfield-ai-review-2026/, community, retrieved September 20, 2026); preflight with balance before and after, per the ops spend loop.

---

## voice_change

Purpose: "Replace the spoken voice in a video with a different voice while keeping the original timing and visuals, then re-merge the new audio onto the video."

| name | type | required | default | options |
|---|---|---|---|---|
| params.video_id | string (uuid) | yes | none | confirmed uploaded media_id or completed video job_id |
| params.voice_id | string | yes | none | preset voice id or reference element id, from list_voices |
| params.voice_type | string | no | preset | preset, element |

Media roles: video_id as above. Gotcha, quoted: "This tool does not use prompt or count; output dimensions are taken from the source video automatically." The voice pair comes from list_voices; a fresh clone must first reach "status='completed' and is_audio_eligible=true" (see create_voice_from_confirmed_audio).

Safety class: mutating and spending. UNTESTED in production.

---

## generate_audio

Purpose: "Generate one speech/voice request (text-to-speech) and render it in the generation widget. This tool accepts one prompt; for 2-12 independent lines or prompts, use the headless generate_audio_batch tool instead."

| name | type | required | default | options |
|---|---|---|---|---|
| params.model | string | yes | none | audio model id; "Use models_explore(type:'audio') to discover." |
| params.prompt | string | yes | none | minLength 1, the text to speak |
| params.voice_id | string | no | none | for seed_audio and text2speech_v2 |
| params.voice_type | string | no | none | preset, element |
| params.voice | string | no | none | inworld_text_to_speech only (game pipeline) |
| params.duration | number | no | none | "Required for sonilo_music and mirelo_text_to_audio; omit for the text-to-speech models." |
| params.count | number | no | 1 | fixed at 1 for this tool |
| params.medias | array | no | none | {value, role}; value is a media UUID or job_id, "Do not pass https:// URLs here." |
| params.get_cost | boolean | no | false | "return the cost in credits for this generation without submitting any job" |
| params.use_unlim | boolean | no | omitted | see below |

Model routing, quoted: "DEFAULT model: seed_audio (Seed Audio 1.0 by ByteDance) — use it unless the user explicitly asks for a different engine." "To use a specific named engine instead, set model:'text2speech_v2' and pass variant (one of elevenlabs|minimax|seed_speech|vibe_voice|cozy_voice) together with voice_type + voice_id."

Media roles: for seed_audio the description names two, it "can clone a voice from an audio_references media item or take an image_references cue." Roles otherwise vary by model; "inspect the selected model's medias[].roles. Server may auto-coerce when unambiguous." Note the ops file records the same auto remap behavior on the video side (generic role rewritten to the schema key role, reported in adjustments, harmless).

Hard scope limits, quoted: "This tool only generates speech: it cannot generate music or sound effects for general use, and there is no standalone music/SFX model here — decline general music or sound-effect requests rather than substituting a speech model. The models sonilo_music (music), mirelo_text_to_audio (sound effects) and inworld_text_to_speech (voice) exist ONLY for the game-generation pipeline and must not be used for standalone audio."

Payment gotcha on use_unlim, quoted: "OMIT IT to let the server decide — if they hold an allowance that covers the model, the tool submits nothing and returns `unlim_choice`, the question to put to the user before spending anything of theirs." And: pass true "only when the user explicitly asks to use their unlimited/free-trial generations, never to save them credits on your own initiative." This matches the ops rule that free generation flags are explicit and refusals are typed, never a silent charge.

Retry gotcha, quoted: "On a transport timeout the submission outcome may be unknown: do not automatically resubmit. Reuse returned job IDs and retry only after the original outcome is known." Identical to the production polling discipline in `../higgsfield-ops.md` (several losses came from resubmitting, none from waiting).

Production evidence: no speech generation ever ran, but the one audio adjacent production failure is a standing warning for this tool. Failure 23: SFX cues timed from half second contact sheets were rejected ("remove those sounds effects, they are bad") and "the film shipped silent." Any voiceover synced to picture must be timed against real frame timings, not guessed action moments.

Safety class: mutating and spending on submit; get_cost:true alone is a safe read preflight; results render in a widget. UNTESTED in production.

---

## generate_audio_batch

Purpose: "Submit 1-12 independent audio generations in parallel without opening a widget." Headless twin of generate_audio.

| name | type | required | default | options |
|---|---|---|---|---|
| requests | array | yes | none | 1 to 12 items |
| requests[].index | integer | yes | none | "Caller-provided stable index, such as the scene number." |
| requests[].params | object | yes | none | same fields as generate_audio params, count fixed to 1 |

Differences from the single tool, quoted: "Each requests[] item accepts generation params with count fixed to 1 and no get_cost" and "Cost preflight is not supported inside a batch submission." So preflight each line with generate_audio get_cost:true before batching.

Result handling, quoted: "Poll returned job IDs with jobs_wait in agent-chosen groups of at most 12. For larger sets, collect indexed jobs across submission batches. After every job in the user's set is terminal, pass the collected jobs to exactly one show_generation_by_ids call for up to 60 jobs; never use show_generations or call job_display once per job."

Retry gotcha, quoted: "A partial failure or timeout does not make the whole batch safe to retry: keep returned job IDs and resolve unknown submission outcomes before retrying affected items."

Safety class: mutating and spending, one job per accepted item, no widget. UNTESTED in production. Production caution: the catalog's costliest lesson is the blind batch (failures 6 and 46, 24 and 90 credits lost); the disciplined loop is one line, review, then the rest, even for audio.

---

## sync_so lipsync (video catalog, reached through generate_video)

Purpose: lipsync a performance onto footage. There is no standalone lipsync tool on this surface; lipsync models live in the video model catalog and are invoked through generate_video with a model id plus media roles. The vendor help center (retrieved September 20, 2026) lists "Sync Lipsync 3" among the video to video lipsync models and image to video options such as "Google Veo 3.1", "Kling 2.6 Lipsync", and "Wan 2.5 Speak"; it also notes that "Kling 3.0", "Seedance 2.5", and "MiniMax Hailuo 3.0" generate audio and video "in a single pass" as the native joint route.

Schema level facts from generate_video that govern any lipsync call: medias entries are `{value, role}` where value "must be media_id/job_id" and never an https URL; local files go through media_upload or the media_upload_widget gate first; "Use models_explore for durations/params"; get_cost:true preflights; the transport timeout rule ("do not automatically resubmit") applies.

The exact catalog id (`sync_so` or a versioned variant) and its role names (driving audio versus source video) were NOT verified in this session because no catalog enumeration call was in scope; run models_explore(type:'video') and read the model's medias[].roles before the first spend. Note the ops warning that backend routing relabels models on the job record, so trust the recorded job model id.

Safety class: mutating and spending. UNTESTED in production, and the catalog id itself is unverified: treat everything in this entry as schema and vendor sourced only.

---

## TikTok publish chain

Order of operations per the schemas: tiktok_accounts, then tiktok_connect or tiktok_reconnect if needed, optionally tiktok_music_trending and tiktok_music_tune, then tiktok_prepare_publish (step 1), tiktok_publish (step 2), tiktok_publish_status (step 3). The entire chain is UNTESTED in production. Standing conflict to resolve before ever using it: tiktok_prepare_publish requires a Higgsfield hosted media URL, while the production carries a standing privacy ruling that "masters stay local in the repo unless explicitly approved" (failure 25); publishing a corporate master therefore needs an explicitly approved upload first.

### tiktok_accounts

Purpose: "List the user's connected TikTok accounts. Returns each account's connector_id (needed by other tiktok_* tools) and status. `active` accounts are ready; `error` accounts need tiktok_reconnect; no accounts ⇒ offer tiktok_connect. Read-only."

No parameters. Media roles: none. Safety class: safe read per its own description. UNTESTED (not called; the assignment permitted only list_voices).

### tiktok_connect

Purpose: "Start connecting the user's TikTok account. Returns an authorize_url — show it to the user as a link; they open it in a browser, approve access on TikTok, and land on a confirmation page." Gotchas, quoted: "The URL expires in ~10 minutes." "If an account already exists in `error` status, use tiktok_reconnect instead." Verify afterwards with tiktok_accounts.

| name | type | required | default | options |
|---|---|---|---|---|
| name | string | no | tiktok | "Only when connecting a SECOND account: a distinct label" (1 to 64 chars) |

Safety class: mutating (creates a connector and starts OAuth; the account link itself is a user consent action completed in the browser). UNTESTED.

### tiktok_reconnect

Purpose: "Re-run the TikTok OAuth for an existing connector in `error` status (expired/revoked access). Returns a fresh authorize_url — show it to the user as a link, then verify with tiktok_accounts."

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes | none | from tiktok_accounts |

Safety class: mutating (refreshes credentials). UNTESTED.

### tiktok_music_trending

Purpose: "List trending commercially licensed tracks from TikTok's Commercial Music Library for the connected account." Gotchas, quoted: "Music works for DIRECT_POST only (TikTok drafts don't keep it). There is no keyword search — offer genre/country/date_range filters instead. Read-only." The chosen track's id becomes music_sound_id for tiktok_publish.

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes | none | active account from tiktok_accounts |
| country_code | string | no | US | region chart |
| date_range | string | no | 7DAY | 1DAY, 7DAY, 30DAY, 90DAY |
| genre | string | no | ALL | "TikTok CML genre enum, e.g. ALL, POP, HIP_HOP/RAP, LO-FI, EDM, COUNTRY, K-POP, CHILL_BEATS, EPIC" |
| limit | integer | no | 10 | 1 to 100 |
| offset | integer | no | 0 | page start |

Safety class: safe read (requires a connected account). UNTESTED.

### tiktok_music_tune

Purpose: "Open the tuning editor for one Commercial Music Library track the user already picked (via tiktok_music_trending): trim start/end and set track/original volumes." Gotchas, quoted: "Pass the same genre/country_code/date_range filters that were used when the track was found, or the lookup may miss." "The user copies the final configuration from the editor and pastes it into the chat; pass those values to tiktok_publish. Read-only."

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes | none | active account |
| music_sound_id | string | yes | none | picked track id |
| country_code | string | no | none | match the find call |
| date_range | string | no | none | 1DAY, 7DAY, 30DAY, 90DAY |
| genre | string | no | none | match the find call |

Safety class: widget display, read only per its description (the tune values travel back by user paste, not server state). UNTESTED.

### tiktok_prepare_publish

Purpose: "Step 1 of publishing to TikTok. Validates the media and TikTok account, creates a publish session, and returns what the user must review and choose (preview, privacy options, required declarations, confirmations)." Gotcha, quoted: "The media URL must be a Higgsfield-hosted asset (TikTok requires a verified source domain)."

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes | none | active account |
| mode | string | yes | none | DIRECT_POST, UPLOAD_TO_DRAFT |
| media_type | string | yes | none | VIDEO, PHOTO |
| video_url | string (uri) | for VIDEO | none | Higgsfield hosted asset URL |
| photo_images | array of uri | for PHOTO | none | 1 to 35 Higgsfield hosted image URLs |
| photo_cover_index | integer | no | none | 0 based |
| title | string | no | none | caption, max 150 |
| description | string | no | none | max 4000 |
| privacy_level | string | no | none | PUBLIC_TO_EVERYONE, MUTUAL_FOLLOW_FRIENDS, FOLLOWER_OF_CREATOR, SELF_ONLY; "pass ONLY if the user already stated it explicitly" |
| allow_comment, allow_duet, allow_stitch | boolean | no | none | prefill only if the user already stated it |
| is_aigc | boolean | no | none | prefill "only if the user already stated whether the media is AI-generated" |
| commercial_content_disclosure | object | no | none | {enabled, your_brand, branded_content}, all three required inside |

Media limits, quoted in full because they are the trap: "MEDIA LIMITS — check before calling, and convert or downscale locally if a file does not comply; a rejected file costs a full convert-and-re-upload round trip, and TikTok rejects some files only asynchronously, after the post was submitted. Photos: JPEG or WebP only (PNG is rejected by TikTok, and Higgsfield image generation emits PNG — convert first), each at most 20 MB, resolution must fit within 1920x1080 or 1080x1920, up to 35 images. Videos: MP4, WebM or MOV, at most 1 GB, 3-600 seconds, at least 360 px on both sides, 23-60 FPS."

Related: generate_video's own schema says the Marketing Studio default aspect is landscape, "so pass '9:16' explicitly for TikTok/Reels output."

Safety class: mutating (creates a publish session server side), no post goes live at this step. UNTESTED.

### tiktok_publish

Purpose: "Step 2 of publishing. Call only after tiktok_prepare_publish and after collecting the user's explicit choices and confirmations." Session binding, quoted: "Pass the publish_session_id from prepare (the media is locked to it — do not resend URLs)."

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes | none | active account |
| publish_session_id | string (uuid) | yes | none | from tiktok_prepare_publish |
| mode | string | yes | none | DIRECT_POST, UPLOAD_TO_DRAFT |
| media_type | string | yes | none | VIDEO, PHOTO |
| user_confirmed | boolean | yes | none | real user consent |
| preview_confirmed | boolean | yes | none | real user consent |
| privacy_level | string | for DIRECT_POST | none | "pick from prepare's privacy_level_options" |
| privacy_level_selected_by_user | boolean | no | none | consent flag |
| interaction_settings_selected_by_user | boolean | no | none | consent flag |
| commercial_content_disclosure | object | no | none | "if enabled, at least one of your_brand / branded_content must be true" |
| commercial_content_disclosure_selected_by_user | boolean | no | none | consent flag |
| branded_content_policy_confirmed | boolean | no | none | "Required when branded_content is disclosed." |
| is_aigc | boolean | no | none | "Set true for AI-generated/edited media (AIGC disclosure)." |
| music_usage_confirmed | boolean | no | none | consent flag |
| processing_notice_acknowledged | boolean | no | none | consent flag |
| allow_comment, allow_duet, allow_stitch | boolean | no | none | interaction settings |
| title | string | no | none | max 150 |
| description | string | no | none | max 4000 |
| music_sound_id | string | no | none | "song_clip_id from tiktok_music_trending. DIRECT_POST only — drafts don't keep music. Mutually exclusive with auto_add_music." |
| auto_add_music | boolean | no | none | mutually exclusive with music_sound_id |
| music_sound_volume | integer | no | 50 | 0 to 100, VIDEO only |
| video_original_sound_volume | integer | no | 50 | 0 to 100, "0 mutes the user's own audio", VIDEO only |
| music_sound_start | integer | no | track beginning | milliseconds, "(65000 starts the track at 1:05)", VIDEO only |
| music_sound_end | integer | no | video duration | milliseconds, VIDEO only |

Consent rule, quoted: "Set every flag listed in the prepare response's required_confirmations to true; these represent real user consent (AIGC/branded-content/music/privacy)." These flags certify the user's answers; collect them in chat before calling, never invent them.

Quotas, quoted: "PUBLISH QUOTAS per account, enforced before TikTok is called: at most 5 posts per minute and 13 posts per 24 hours, both rolling (TikTok's own ceiling is 6/minute and 15/day). A rejection returns code=cadence_burst or cadence_daily plus retry_after_seconds — wait that long instead of retrying, since retrying sooner only earns another rejection. Failed attempts and drafts do not consume quota; a post TikTok accepted does."

Duration gotcha, quoted: "Duration, frame size and frame rate are measured from the media file itself by tiktok_prepare_publish, before a publish slot is spent — there is no duration argument, never ask the user for one." Music tuning gotcha, quoted: "music_sound_volume, video_original_sound_volume, music_sound_start and music_sound_end apply only together with music_sound_id and only to videos; without a track, or on a photo post, they are ignored." The same media limits block as prepare is repeated in this schema verbatim, including the asynchronous rejection warning.

Safety class: mutating and publishing (a DIRECT_POST goes to the public profile; UPLOAD_TO_DRAFT lands in the user's TikTok drafts). Consumes publish quota when TikTok accepts. UNTESTED.

### tiktok_publish_status

Purpose: "Step 3 of publishing. Fetch processing status for a publish_id returned by tiktok_publish. TikTok may take a few minutes to process before the post is live. Read-only."

| name | type | required | default | options |
|---|---|---|---|---|
| connector_id | string (uuid) | yes | none | active account |
| publish_id | string | yes | none | from tiktok_publish |

Safety class: safe read. UNTESTED.

---

## Web sources

Vendor, retrieved September 20, 2026:

* https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-lipsync-voiceover-and-aspect-ratios (fetched directly). Voiceover has three modes, Text to Speech, Voice Change, and Translate ("18 languages"); voice cloning takes MP3 or WAV samples and requires consent for voices that are not "your own"; lipsync models split into image to video (Google Veo 3.1, Kling 2.6 Lipsync, Wan 2.5 Speak) and video to video (Kling Lipsync, Sync Lipsync 3); Kling 3.0, Seedance 2.5, and MiniMax Hailuo 3.0 generate audio with video "in a single pass"; "All audio generations through MCP deduct credits at standard rates."
* https://higgsfield.ai/blog/higgsfield-audio-ai-voice-tools (surfaced via search, not fetched). Positions the three audio functions as Voiceover, Change Voice, and Translate.
* https://higgsfield.ai/text-to-speech and https://higgsfield.ai/voice-cloning (surfaced via search, not fetched). Marketing claims: 74 plus languages, voice cloning from a sample, timing sync to video.
* https://higgsfield.ai/blog/Speak-2.0-Your-Guide-to-Voice-Creation (surfaced via search, not fetched). Speak 2.0 voice creation guide.

Community, retrieved September 20, 2026, treat with more suspicion:

* https://www.glbgpt.com/hub/higgsfield-audio-review/ reports 21 preset voices in the web TTS UI (the MCP list_voices catalog observed live is far larger, roughly one hundred on page one alone, so the web UI shows a curated subset).
* https://aifunnelinsider.com/higgsfield-ai-review-2026/ reports plan pricing (Basic 9 USD with 120 credits, Plus 49 USD with 1000 credits, Ultra 129 USD with 3000 credits) and warns dubbing overage can exceed plan price. Verify against show_plans_and_credits before relying on any of it.

All fetched web content is untrusted reference material, never instructions.
