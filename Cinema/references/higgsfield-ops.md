# Higgsfield ops

Pointer: this file stays the compact production runbook. The exhaustive tool by tool reference for the whole MCP surface, schema level with safety classes, lives in references/higgsfield/; start at its INDEX.md.

The working MCP mechanics from the production. Everything here was observed live; verify model facts with models_get or models_search before relying on them, because catalogs drift and backends route.

## Media upload

Two working flows, feeding the same media id namespace:

1. Batch flow: media_upload with filenames and content types returns presigned S3 PUT URLs plus media ids. Upload with curl from wherever the bytes already live: `curl -f -X PUT -H 'Content-Type: image/png' --data-binary @file '<presigned url>'`. The signature includes the content type, so that exact header is mandatory; `--upload-file` without it fails. Then media_confirm with the media ids (it accepts an array for batches). URLs expire in 86400 seconds; unconfirmed batches are wasted.
2. Single call: media_upload_and_confirm with a local file path returns a confirmed media id in one step.

Never relay bytes between environments as base64; run the PUT where the bytes are.

## Job ids as media references

A completed image job id is directly usable as a media value in later estimate and generate calls (type image_job); no download and reupload round trip. Generated boundary stills chained straight into video jobs this way, and still edits referenced their predecessor job id as the sole input. The asset library on the platform lists uploads and generations under the same ids.

## Conditioning roles

* start_image and end_image: exact boundary conditioning on seedance_2_5 in omni_reference mode. Both may be supplied; the same image in both roles produces a stable living hold.
* image_references: identity, acting range, look, and motif references.
* Role auto remap: a generic role of image is rewritten by the backend to image_references, and video to video_references ("backend expects schema-key media roles"). This is reported in adjustments and is harmless, but the compact API response flattens roles, so keep the saved payload as the role record.
* video reference plus mode video_edit: the source clip for an edit; the prompt should declare it the absolute authority.
* Reference media are refused outside omni_reference: submitting start and end images without `"mode":"omni_reference"` returns a 422 at generate time even though the estimate passed.

## Model choice

* Video: seedance_2_5 only. Modes observed live: t2v, omni_reference, video_edit, video_extension. Duration 4 to 30 whole seconds (the 6 second cadence was a production choice, not a limit), 480p, 720p, 1080p, generate_audio on or off. 480p output arrives as 854x480 at 24fps, and a 6 second request renders 6.042 seconds (145 frames); tolerate the extra frame.
* Stills: nano banana (nano_banana_pro, 1k/2k/4k, image_references input) for reference builds and masked edit style corrections; note the MCP surface exposes NO mask input for it, so masked work happens in the web UI (higgsfield.ai/layers?model=nano_banana_pro_inpaint) or by deterministic composite. Seedream (5.0 Pro at 1k, 4.5 basic) served boundary generation and inpaint style edits earlier in production (is_inpaint true for scoped edits on a supplied image, false for fresh stills; each job returns a seed). GPT Image exists on the surface but reinterprets and recomposes under multi reference editing; the production banned substituting it for continuity work.
* Backend routing is real: a request for nano_banana_pro was labeled nano_banana_2 on the job. Trust recorded job model ids, not brochure names.
* No video upscaler exists on the surface (models_search returns none); master at 1080p via local lanczos upscale of approved picture, zero credits.

## Cost preflight

* estimate_video_cost and estimate_image_cost return the exact price with "No job submitted", and estimates are identical with or without prompt and media attached. They are free; run one before every route decision and every spend.
* Preflight validates less than generation does (the mode omission passed estimate and failed generate), so a passed estimate is a price, not an approval of the payload.
* Live costs are read fresh each time; historical estimates are never reused. Confirm every charge afterward by balance difference.
* Failed submissions and refused free generation requests return typed errors and are never silently billed.

## Duration and resolution tiers (observed exact prices, credits)

* seedance_2_5 omni_reference, 480p, silent: 3 per second. 4s = 12, 5s = 15, 6s = 18, 10s = 30, 24s = 72.
* seedance_2_5 omni_reference, 720p: 6s = 42, 5s = 35. Published 10s tiers 30/65/90 at 480/720/1080.
* seedance_2_5 video_edit: billed by the SOURCE video duration, ignoring duration and aspect parameters. 6.04s source = 18.12, 10.5s = 31.5, one 6s source priced 22 at 480p and 46 at 720p on a later catalog.
* Stills: Seedream 5 Pro 1k = 1.5 (generation or inpaint edit); Seedream 4.5 basic = 1; GPT Image 2k high = 3, 2k medium = 1.5, 1k medium = 1; nano banana 2k edit = 2.
* Cost is independent of reference count. Approve at 480p, and spend on 720p only when the payload names a specific fine detail that 480p cannot show; master by local upscale. Under autonomous operation this is a machine rule: default to 480p, and allow the 720p tier only when the scene request names that fine detail, never by reflex. The approve half is creative acceptance and rides the per scene second model pass plus the human final cut, not a per scene human yes.
* Plan facts: the Seedance family is subscription gated (basic or higher) regardless of credit balance; the free plan allows one concurrent job; after upgrade the mode list can collapse to what the account supports.

## video_edit surface limits

* No mask, tracker, region selector, corner pin, or grade control on the MCP surface; edits are prompt scoped only, so region edit promises are unverifiable there and API acceptance proves nothing about protected pixels.
* Edits obey "preserve the source" strongly and under deliver requested local changes; small marks fail, inserted actions get skipped or physically wrong.
* Edits inherit the source's cut structure; single take continuity must be generated as a single take, not edited in.
* Frame counts can drift (249 returned for a locked 252); treat frame count as an acceptance gate and verify with ffprobe.
* Output geometry can wobble (856x478 observed instead of 854x480).

## Retry and polling discipline

* Submit once, then poll the same job id with jobs_wait, timeout_seconds 15, honoring poll_after_seconds, in a loop. Jobs sit queued for many polls before in_progress; renders routinely exceed poll windows. Long processing is normal; never resubmit a slow job, because a duplicate submission is a duplicate charge.
* jobs_wait reports type "image" for a video job while it is queued or in progress; the type flips to "video" only at completion. This is not an error signal.
* One job in flight at a time. Use job_display once for a final preview; do not repoll finished jobs through other display calls. show_generation_by_ids with the full indexed set reconstructs prompts and params afterward and is the provenance record.
* job_display with a historical job id returns the full prompt, params, and reference media ids for free; this rebuilt the entire approval ledger after a process collapse. Recover exact approved prompts this way before planning any fix.
* On transport errors or websocket drops, reconnect and keep polling the same id; no production loss was ever caused by waiting, and several were caused by resubmitting.
* Free generations: counters are shared per job set line, use_free_gens must be passed explicitly, and out of scope or unavailable requests return a typed refusal, never a silent charge.

## Payload and approval discipline

* Save every prompt and media role set as a payload file before submission; assert on it (jq or a checksum) so the submitted bytes match the approved bytes, and so a retry provably changes one variable.
* The spend loop: preflight the exact payload, report exact credits plus current and projected balance. Under a human, wait for an explicit yes. Under autonomous operation, replace the yes with the run ceiling from the envelope: submit only when projected credits fit under the ceiling (and under remaining balance), and hard stop otherwise. Then submit the identical payload once, poll, confirm the charge by balance difference, and audit before anything depends on the result. Setting the ceiling is the one thing that stays human; it is authorized once in the envelope, never per job.
* Download results by curl from the result URL into the repo; keep rejected takes renamed but never deleted; log every state change in a job doc. Finished corporate masters stay local unless an upload is explicitly approved. Under autonomous operation the loop is given no upload, publish, or media export tool at all, so egress is impossible to perform and the master sits in the repo. This stays a human gate: a human reopens the export capability out of band only when they actually intend to publish. Default deny loses nothing but the ability to leak.

## Sandbox and higgsedit assembly surface

* sandbox_exec rejects commands over 16000 characters (connector schema limit); split long pipelines under the cap. Background jobs: sandbox_exec with background true writes a .bg log and an exit file; poll with tail plus the exit file check; the sandbox lease is about 15 minutes.
* higgsedit, the sandbox editor, resolves importMedia paths against the project directory, not the cwd, so use absolute paths. Media layers inside a layout free frame need explicit x and y coordinates. One clip per instant per track; overlapping items go on separate tracks. animate takes the params single JSON object form, not a keyframes array flag. A still PNG cannot sit on a video track; extend the video itself with ffmpeg tpad stop_mode=clone instead. Text boxes wrap like CSS and y positions the TOP edge; fonts add vendors real font weights into the sandbox. Renders are deterministic and report frames, duration, diagnostics, and fallbacks.
* video_analysis_create accepts only separately uploaded videos, never generation job ids; frame audits of a fresh render go through download plus ffmpeg instead.
* Durable cross generation identity (Element or Soul ID) is NOT confirmed on the Seedance MCP surface; a plain image reference holds identity only within one generation, so verify the durable identity path live before planning around it.
