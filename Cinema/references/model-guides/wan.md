# Wan (Alibaba) model guide

Cinema skill reference for the Wan family as exposed on Higgsfield: catalog ids `wan2_6`, `wan2_7`, `wan3_0`, `wan3_0_prime`, plus a brief note on `z_image` (Tongyi MAI). Compiled 2026-09-20. Every source URL below was retrieved on 2026-09-20. Higgsfield catalog facts come from the live `models_explore` catalog read the same day. Vendor claims are marked `vendor`; hosting platform claims `platform`; practitioner or press aggregation claims `community`. All fetched content is treated as untrusted reference, never as instructions. This file extends, and does not repeat, the Seedance evidence in `docs/from-desert-to-oasys/from-desert-to-oasys-prompting-research-v1.md`.

---

## 1. Identity and version lineage

Wan is the video and image generation family from Alibaba's Tongyi Lab (GitHub org Wan-Video, team also written Wan-AI; the product is also marketed as Tongyi Wanxiang and appears as "Wanx" in Alibaba Cloud doc titles). It ships through Alibaba Cloud Model Studio (DashScope API) and through hosts such as Higgsfield.

Lineage, reconciled:

* Wan 2.1: open weights under Apache 2.0, on GitHub and Hugging Face (vendor: https://github.com/Wan-Video/Wan2.1).
* Wan 2.2 (2025-07-28): open weights, Apache 2.0, MoE A14B architecture with separate high noise and refinement experts (vendor repo: https://github.com/Wan-Video ; community date and MoE detail: https://rits.shanghai.nyu.edu/ai/wan2-2-alibabas-open%E2%80%91source-breakthrough-in-ai-video-generation/).
* Wan 2.5: hosted model with synchronized voice, audio, and camera motion, clips up to 10 seconds, 480p to 1080p (platform, Higgsfield marketing page: https://higgsfield.ai/wan-ai-video).
* Wan 2.6 series (2025-12-16): five models, Wan2.6-R2V (new), plus enhanced Wan2.6-T2V, Wan2.6-I2V, Wan2.6-image, Wan2.6-T2I. Alibaba calls R2V "China's first reference-to-video generation model"; a character reference video carries "both appearance and voice" into new scenes (vendor: https://www.alibabacloud.com/blog/alibaba-unveils-wan2-6-series-enabling-everyone-to-star-in-videos_602742).
* Wan 2.7 (2026-04-06): unified image and video model, introduces Thinking Mode (chain of thought planning before generation), marketed with "Thousand-Face Realism", HEX color control, and long text rendering. Closed weights, API only (community press aggregation of the vendor release: https://www.streetinsider.com/GetNews/Alibaba+Launches+Wan+2.7:+Breakthrough+AI+Image+%26+Video+Generation+Model+with+Thinking+Mode/26275384.html ; community: https://tellers.ai/blog/wan_2_7_thinking_mode_ai_video_generation_2026-04-15). Official Model Studio ids: `wan2.7-t2v`, `wan2.7-t2v-2026-06-12` (vendor: https://www.alibabacloud.com/help/en/model-studio/text-to-video-api-reference), `wan2.7-i2v-2026-04-25` (vendor: https://www.alibabacloud.com/help/en/model-studio/image-to-video-general-api-reference).
* Wan 3.0 (public beta 2026-08-06, community date: https://www.cometapi.com/what-is-wan-3-0/): "generates up to 30 seconds of video in a single pass", accepts "text, images, audio, video, and — for the first time — documents", and improves faces from a "glossy, interchangeable look" to "diverse, lifelike human faces" (vendor: https://www.alibabacloud.com/blog/wan3-0-30-second-ai-video-generation-from-any-input_603452). Official Model Studio ids: `wan3.0-video` (standard) and `wan3.0-video-prime`, the latter described by Alibaba as the high speed version with improved end to end speed (vendor: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-api-reference). 30fps output, up to 20 multimodal reference materials per request (vendor: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-guide). Closed weights, API only (community: https://www.cometapi.com/what-is-wan-3-0/).

Higgsfield id mapping (catalog, `models_explore`, 2026-09-20): `wan2_6` = "Wan 2.6 Video", `wan2_7` = "Wan 2.7", `wan3_0` = "Wan 3.0", `wan3_0_prime` = "Wan 3.0 Prime". All four report provider_name "Wan".

Flagged naming drift: the Higgsfield catalog tags `wan2_6` as "open-weight", but Wan 2.6 itself is a hosted series and only Wan 2.1 and 2.2 have published weights (vendor: https://github.com/Wan-Video ; vendor 2.6 press blog above). Treat the tag as marketing shorthand, not a license claim.

---

## 2. Availability and cost tier on Higgsfield

All numbers in this section are from the live Higgsfield catalog (`models_explore` action get, 2026-09-20) unless marked otherwise. The catalog exposes no credit prices for any wan id; per Higgsfield's help center, exact credit cost appears on the Generate button at configuration time (vendor: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-seedance). Never invent prices.

* `wan2_6`: quality 720p or 1080p (default 720p); duration 5, 10, or 15 seconds (default 5); aspect ratios 16:9, 9:16, 1:1; media roles image_references, video_references, audio_references. Tags: stylized, experimental, creative, artistic. No unlim support flag.
* `wan2_7`: duration 2 to 15 seconds (default 5); resolution 720p or 1080p (default 720p); aspect ratios 16:9, 9:16, 1:1, 4:3, 3:4; media roles start_image, end_image, audio_references. Carries `supports_unlim: true`, so it accepts free trial unlimited generations where an account has that allowance (none available on the account at retrieval time).
* `wan3_0` and `wan3_0_prime` (identical parameter surface): duration 2 to 30 seconds, or -1 for smart duration, catalog text verbatim: "Duration in seconds (2-30), or -1 to let the model choose the length from the prompt and media. Smart duration is billed as 10 seconds." Resolution 480p, 720p, 1080p (default 720p). `generate_audio` boolean, default true. `enable_thinking` boolean, default false, catalog text verbatim: "Let the model reason about the prompt before generating (slower, better prompt adherence)." Aspect ratios auto, 16:9, 9:16, 1:1, 4:3, 3:4. Media roles start_image, end_image, image_references, video_references, audio_references. Prime is the same surface with the "prime" tag; per Alibaba it is the faster variant (vendor: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-api-reference).

CLI drift, flagged (same pattern the Seedance research found): the official Higgsfield CLI `MODELS.md` lists only `wan2_6` and `wan2_7`, no `wan3_0` or `wan3_0_prime` and no z_image (vendor: https://github.com/higgsfield-ai/cli/blob/main/MODELS.md). The CLI page adds two constraints the catalog omits: for `wan2_6`, "Reference-to-video (with video_references) supports only 5 or 10 second durations"; for `wan2_7`, end_image requires start_image and at most 1 audio reference is allowed. The Higgsfield marketing page for Wan is stale at the Wan 2.5 era and never mentions 2.7 or 3.0 (platform: https://higgsfield.ai/wan-ai-video); prefer the catalog over that page.

---

## 3. Prompt structure the vendor prescribes

Alibaba publishes one unified prompt guide covering Wan text to video and image to video (vendor: https://www.alibabacloud.com/help/en/model-studio/text-to-video-prompt). Its formulas, quoted verbatim:

* Basic: "Prompt = Entity + Scene + Motion".
* Advanced: "Prompt = Entity (description) + Scene (description) + Motion (description) + Aesthetic control + Stylization".
* Image to video (the image already fixes entity, scene, and style): "Prompt = Motion + Camera movement".
* Sound, for Wan 3.0, 2.7, 2.6, 2.5: "Prompt = Entity + Scene + Motion + Sound description (voice/sound effect/background music)".
* Multi shot, for Wan 3.0, 2.7, 2.6: "Prompt = Overall description + Shot number + Timestamp + Shot content", with shots written as "Shot 1 [0–3 s]" style timestamped lines and an overall description carrying theme, narrative style, and core emotion.
* Reference to video, for Wan 3.0 and 2.7: "Prompt = Reference identifier + Action + Scene + Lines (optional) + Background music (optional)", with references named "Image 1", "Video 1", "Audio 1" by upload order, each media type counted separately.
* Audio sub formulas: "Voice = Character's lines + Emotion + Tone + Speed + Timbre + Accent"; "Sound effect = Source material + Action + Ambient sound"; "Background music = Background music/score + Style". Suppression is positive instruction text: write "No dialogue," or "No background music" in the prompt.

Single shot control is a literal sentence, not a parameter. The guide states that Wan 2.7 no longer supports the `shot_type` parameter and that to generate a single shot video you write "Generate single shot." in English (vendor: https://www.alibabacloud.com/help/en/model-studio/text-to-video-prompt). On Wan 2.6, `shot_type` still exists as an API parameter, values `single` (default) or `multi` (vendor: https://www.alibabacloud.com/help/en/model-studio/legacy-wan-reference-to-video-api-reference).

Wan 2.6 reference naming differs from 2.7 and 3.0: references are addressed as "character1, character2" in array order, for example "character1 happily watches a movie on the sofa", and each reference must contain one subject only (vendor: https://www.alibabacloud.com/help/en/model-studio/legacy-wan-reference-to-video-api-reference).

Prompt length caps (Model Studio): wan3.0 prompt up to 20,000 characters with truncation beyond (vendor: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-api-reference); wan2.7 t2v and i2v 5,000 characters, negative_prompt 500 (vendor: https://www.alibabacloud.com/help/en/model-studio/text-to-video-api-reference ; https://www.alibabacloud.com/help/en/model-studio/image-to-video-general-api-reference); wan2.6 r2v 1,500 characters (vendor: legacy r2v reference above).

Alibaba also ships a downloadable prompt optimization Skill for Wan 3.0: "The platform provides a Wan 3.0 prompt optimization Skill to help you refine prompts", file wan3-pe.zip, used as "/wan3-pe" in the AI chat box (vendor: https://docs.modelstudio.console.alibabacloud.com/en/model-studio/wan3-video-generation-guide).

---

## 4. Parameters that change output

Model Studio surface (the vendor's own API):

* `duration`: wan3.0 2 to 30 seconds, default 5, or -1 for smart duration, "the model automatically recommends an appropriate duration"; with input video, input plus output must not exceed 30 seconds (vendor: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-api-reference). wan2.7 2 to 15, default 5. wan2.6 r2v 2 to 10, default 5.
* `resolution` and `ratio`: wan3.0 480P, 720P, 1080P, default 1080P, ratio adaptive, 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 (vendor: wan3 API reference above). wan2.7 720P or 1080P, default 1080P, five ratios, exact pixel table published per ratio (vendor: https://www.alibabacloud.com/help/en/model-studio/text-to-video-api-reference). wan2.6 r2v uses explicit `size` strings such as 1920*1080 (vendor: legacy r2v reference above). Note the default divergence: Model Studio defaults to 1080P, the Higgsfield catalog defaults every wan id to 720p.
* `audio`: default true on wan3.0. A community read of the billing page reports the rate is the same with audio on or off: "The `audio` boolean controls whether a track comes back, not whether one is produced. The published rate is the same either way" (community: https://dev.to/whereisthisplace/seven-defaults-in-the-wan-30-video-api-that-decide-your-bill-before-you-write-a-prompt-183j). On Higgsfield the equivalent is `generate_audio`, default true, on wan3_0 and wan3_0_prime only (catalog, 2026-09-20).
* `enable_thinking`: exists on the Higgsfield catalog for wan3_0 and wan3_0_prime, default false, quoted in section 2. Confirmed absence: three separate reads of Alibaba's wan3.0 guide and API reference found no enable_thinking, thinking, or reasoning parameter (vendor pages: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-guide ; https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-api-reference ; https://docs.modelstudio.console.alibabacloud.com/en/model-studio/wan3-video-generation-guide). Thinking Mode is documented at the Wan 2.7 launch as an automatic internal chain of thought stage, not a request field (community: https://zenn.dev/kai_kou/articles/186-wan-27-thinking-mode-image-video-guide?locale=en). So the toggle is a Higgsfield surface affordance; treat its exact semantics as platform documented, not vendor documented.
* `prompt_extend`: default true on Model Studio, "Enables LLM-based prompt rewriting for quality improvement" (vendor: wan3 API reference above; same default on wan2.7). This silently rewrites your prompt. Not exposed on any Higgsfield wan id (catalog, 2026-09-20), and whether Higgsfield runs it server side is unknown; flagged as an open question.
* `negative_prompt`: real parameter on Model Studio wan2.7 and wan2.6, up to 500 characters (vendor: wan2.7 t2v reference and legacy r2v reference above). Not exposed on Higgsfield wan ids (catalog, 2026-09-20).
* `seed`: Model Studio exposes seed in [0, 2147483647]; "A fixed seed improves reproducibility" (vendor: wan2.7 t2v reference above), and the wan2.6 page adds the caution that the same seed does not guarantee identical results (vendor: legacy r2v reference above). No Higgsfield wan id exposes seed (catalog and CLI MODELS.md, 2026-09-20), matching the seedless Higgsfield video surface the Seedance research established.
* `watermark`: default false; true stamps "AI Generated" in the lower right (vendor: wan2.7 t2v reference above).
* Smart duration billing: only the Higgsfield catalog states a rule, "Smart duration is billed as 10 seconds" (catalog, 2026-09-20). Confirmed absence: Alibaba's own pages state no billing methodology for duration -1 (vendor: https://docs.modelstudio.console.alibabacloud.com/en/model-studio/wan3-video-generation-guide). Budget smart duration as a 10 second spend on Higgsfield and do not assume the same rule elsewhere.
* Frame rate: wan3.0 outputs 30fps (vendor: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-guide). No fps figure is published for 2.6 or 2.7 in the pages read; unconfirmed.

Resolution cost shape (Model Studio, community read of the published international rates): 1080P is roughly four times the 480P per second rate, "$0.20 per second against $0.05 for 480P — so a thirty-second clip is $6.00 instead of $1.50" (community: https://dev.to/whereisthisplace/seven-defaults-in-the-wan-30-video-api-that-decide-your-bill-before-you-write-a-prompt-183j). These are Model Studio API prices, not Higgsfield credits; on Higgsfield read the Generate button.

---

## 5. Documented best practices

Vendor documented (https://www.alibabacloud.com/help/en/model-studio/text-to-video-prompt unless noted):

* Put the effort into motion and camera. For image to video the vendor's whole formula is motion plus camera movement; the image carries everything else.
* Use the published camera vocabulary with intent attached: push in "creates intimacy or tension", pull out "reveals scale or isolation", tracking shot "places the viewer alongside the subject", orbit "emphasizes the subject's importance", fixed camera "signals stillness and focus".
* Use the aesthetic control axes by name: light source (daylight, firelight, overcast, clear sky), light type (soft, hard, side, high contrast), shot size (close up, close shot, wide angle), composition (center, left heavy, right heavy), lens (long focus, ultra wide fisheye), angle (over the shoulder, high angle, aerial), tone (warm, cool, low saturation).
* Style keywords the vendor lists: felt style, 3D cartoon, pixel style, puppet animation, claymation, black and white animation, tilt shift, time lapse, cyberpunk, line art illustration, wasteland style.
* Multi character dialogue: unique persistent labels per character, visual anchoring ("describe the action first, then the speech"), distinct voice labels, and clear temporal connectives between beats.
* For multi shot work, give every shot a number, a timestamp range, and its content, under one overall description; for a single continuous shot, write "Generate single shot." explicitly.
* Short prompts: either leave `prompt_extend` on and accept rewriting, or expand the prompt yourself with the published formulas (the guide suggests passing the formulas to a text model such as qwen3.6-plus), or use the wan3-pe Skill.
* Wan 3.0 reference budget (vendor: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-guide and API reference): at most 20 materials per request; up to 10 images each up to 20MB; up to 5 video clips totaling 15 seconds, each up to 100MB; up to 5 audio clips totaling 15 seconds, each up to 15MB; at most 1 document file (docx, doc, xlsx, xls, pptx, ppt, pdf, txt, md, up to 100MB, up to 50 pages) or 1 web link, not both. First and last frame inputs are mutually exclusive with the reference input types: "first_frame/last_frame and reference_image/reference_video/reference_audio/file/link types are mutually exclusive" (vendor: wan3 API reference).
* Video extension exists on 3.0 (continue an existing generation), with the 30 second total budget (vendor: wan3 guide and API reference above).

Higgsfield surface practice (platform, catalog 2026-09-20): default resolution is 720p, so the preview low, finalize high workflow from the Seedance canon carries over directly; the only Higgsfield side determinism levers are start_image and end_image, since no seed is exposed.

---

## 6. Known failure modes

Vendor documented:

* "Audio texture and on-screen text rendering accuracy are still improving" on Wan 3.0 (vendor: https://www.alibabacloud.com/blog/wan3-0-30-second-ai-video-generation-from-any-input_603452).
* The prompt guide's own avoid list: specific real people by name, rapid scene changes within a single clip, exact text legibility requirements, very long or complex action sequences at 30 seconds and beyond, and lip synced dialogue to exact words (vendor: https://www.alibabacloud.com/help/en/model-studio/text-to-video-prompt).
* Same seed does not guarantee identical results, even on the surface that has a seed (vendor: https://www.alibabacloud.com/help/en/model-studio/legacy-wan-reference-to-video-api-reference).
* Wan 2.6 r2v requires one subject per reference asset; multi subject reference images are out of spec (vendor: same legacy r2v reference).
* Pre 3.0 face realism: Alibaba itself describes the 2.x look as "glossy, interchangeable" and claims 3.0 fixes it (vendor: wan3 blog above). Treat 2.6 and 2.7 face work accordingly.

Community reported:

* Thinking Mode latency: roughly 30 to 50 percent longer generation, and "for simple single-action prompts it adds latency without improving quality" (community: https://gptproto.com/news/what-is-wan-2-7 via search summary; https://zenn.dev/kai_kou/articles/186-wan-27-thinking-mode-image-video-guide?locale=en notes generation time may be longer). On Higgsfield, leave `enable_thinking` false for simple single action shots and enable it for dense multi shot or document conditioned prompts.
* Defaults burn money: on Model Studio the resolution default is 1080P, the most expensive tier, and audio off does not reduce cost (community: https://dev.to/whereisthisplace/seven-defaults-in-the-wan-30-video-api-that-decide-your-bill-before-you-write-a-prompt-183j). On Higgsfield the default is 720p, so this specific trap is a Model Studio one.
* Thinking is better with documents: community hands on reporting says a PDF or webpage reference parses much better with thinking enabled (community: https://www.cometapi.com/what-is-wan-3-0/ via search summary; unverified against vendor docs).

---

## 7. Text rendering behavior

Two vendor signals point in opposite directions, so keep both in view. The Wan 2.7 launch material claims industry leading text rendering, handling 3,000 plus tokens across 12 languages with tables and formulas (community press aggregation of the vendor release: https://www.streetinsider.com/GetNews/Alibaba+Launches+Wan+2.7:+Breakthrough+AI+Image+%26+Video+Generation+Model+with+Thinking+Mode/26275384.html; this is marketing distributed through a wire service, weigh accordingly). The Wan 3.0 blog concedes that "on-screen text rendering accuracy are still improving" (vendor: wan3 blog above), and the prompt guide tells you to avoid "exact text legibility requirements" outright (vendor: prompt guide above). Working rule: never depend on in video text on any wan id; the OASYS canon forbids generated text anyway, and the Wan avoid list gives that prohibition vendor backing here too. For still images where text matters, Z Image (section below) is the family member whose bilingual text rendering is an advertised strength (vendor: https://github.com/Tongyi-MAI/Z-Image).

---

## 8. Reference and conditioning behavior

Per Higgsfield id (catalog, 2026-09-20), cross checked against Model Studio:

* `wan2_6`: catalog roles are image_references, video_references, audio_references. Model Studio's wan2.6 r2v takes 0 to 5 images and 0 to 3 videos with a combined cap of 5 and no audio reference slot (vendor: https://www.alibabacloud.com/help/en/model-studio/legacy-wan-reference-to-video-api-reference). Flagged discrepancy: the audio_references role on Higgsfield's wan2_6 has no counterpart in the Model Studio r2v spec read; confirm live before relying on audio conditioning here. References map to character1, character2 by order; CLI constraint: video_references limits duration to 5 or 10 seconds (vendor: https://github.com/higgsfield-ai/cli/blob/main/MODELS.md).
* `wan2_7`: start_image plus end_image (end requires start), plus at most one audio reference (catalog; CLI MODELS.md above). Model Studio's wan2.7 i2v defines three task shapes: first frame to video (first_frame, optionally with driving_audio), first and last frame to video (first_frame plus last_frame, optionally driving_audio), and video continuation (first_clip, optionally plus last_frame) (vendor: https://www.alibabacloud.com/help/en/model-studio/image-to-video-general-api-reference). Audio: WAV or MP3, 2 to 30 seconds, up to 15MB; if shorter than the video, the remainder is silent (vendor: wan2.7 t2v reference above).
* `wan3_0` and `wan3_0_prime`: the full set, start_image, end_image, image_references, video_references, audio_references (catalog). Model Studio adds the omni reference layer on top: one document file or one web link as conditioning input, with the mutual exclusivity rule quoted in section 5. In prompt naming is order based, "Image 1", "Video 1", "Audio 1", counted separately per type (vendor: https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-guide).
* Determinism: on Higgsfield there is no seed on any wan id, so shot to shot continuity rides on exact start_image and end_image frames, the same shared boundary frame method the Seedance research established as the only lever on this platform (catalog and https://github.com/higgsfield-ai/cli/blob/main/MODELS.md). On Model Studio a seed exists but is explicitly not a guarantee.
* Reference discipline: Wan's caps are low (5 combined on 2.6, 20 total on 3.0 versus Seedance 2.5's 50), and the one subject per reference rule on 2.6 is vendor law, not community lore. The Seedance era finding that a small, role scoped reference set beats slot filling needs no translation here; the platform enforces it.

---

## 9. Z Image (Tongyi MAI), briefly

Higgsfield id `z_image`, "Z Image", provider Tongyi-MAI, "Super fast, stylized text-to-image", zero exposed parameters, aspect ratios 1:1, 4:3, 3:4, 16:9, 9:16, tags fast, budget, stylized, quick (catalog, 2026-09-20). Upstream this is the Z Image family from Alibaba's Tongyi MAI team: a 6B parameter single stream DiT (S3-DiT) image model; the shipped open checkpoint Z-Image-Turbo is a distilled variant running in 8 function evaluations, released under Apache 2.0 on 2025-11-26, with sub second latency on H800 class GPUs, a fit inside 16GB consumer VRAM, and bilingual English and Chinese text rendering as an advertised strength (vendor: https://github.com/Tongyi-MAI/Z-Image ; https://huggingface.co/Tongyi-MAI/Z-Image-Turbo ; https://tongyi-mai.github.io/Z-Image-blog/). Community benchmark placement: top open weights model on the Artificial Analysis text to image leaderboard, 8th overall (community: https://stable-learn.com/en/z-image-turbo-tutorial/ ; echoed by the Tongyi Lab account: https://x.com/Ali_TongyiLab/status/2003009481526116645). Cinema skill use: cheap stylized stills, boards, and text bearing frames; it is not a video model and exposes no knobs on Higgsfield beyond aspect ratio.

---

## 10. Seedance 2.5 delta: how prompting Wan differs from the skill's canon model

The canon model is Seedance 2.5 on Higgsfield, prompted with the labeled section block (GLOBAL STYLE, SCENE, CHARACTERS, LOCATION, FIRST FRAME AND BLOCKING, SHOT BY SHOT BREAKDOWN, OPTICS, PHYSICS, LIGHTING, AUDIO), absolute timecodes, and positive locks (see the v1 research file). Prompting Wan differs in these load bearing ways:

1. Formula, not section block. Alibaba prescribes compact equation style formulas (Entity + Scene + Motion, extended with aesthetics, sound, and shots) rather than a labeled section document (vendor: https://www.alibabacloud.com/help/en/model-studio/text-to-video-prompt). The Seedance section block will not hurt on Wan, but the vendor endorsed skeleton is flatter: one overall description plus numbered, timestamped shot lines.
2. Single shot is an explicit sentence. Wan needs "Generate single shot." written in the prompt (2.7 and later) or `shot_type: single` (2.6). Seedance holds a single shot through prose constraints alone. For the OASYS single continuous shots, this sentence is mandatory Wan hygiene, since Wan 2.6 and later actively favor multi shot storytelling (vendor: prompt guide above; 2.6 press blog above).
3. Reference naming is positional, not role tagged. Wan uses "Image 1" / "Video 1" / "Audio 1" (3.0, 2.7) or character1 (2.6) by upload order; Higgsfield Seedance uses role tags (@character, @style, @motion, @audio). Order changes meaning on Wan, so the media array order is part of the prompt.
4. Far smaller reference budgets. 20 total on 3.0, 5 combined on 2.6, versus 50 slots on Seedance 2.5, and first or last frame conditioning excludes reference conditioning entirely on wan3.0 (mutual exclusivity rule, section 5). On Seedance, boundary frames and references can travel together; on Wan 3.0 you pick one regime per job.
5. A real negative_prompt and a real seed exist, but only on Model Studio. On Higgsfield's wan surface neither is exposed, so canon practice carries over unchanged: positive locks in prose, determinism from boundary frames.
6. prompt_extend rewrites by default on the vendor API. Seedance has no documented enhance toggle; Wan on Model Studio rewrites your prompt unless you turn `prompt_extend` off. For exact canon prompts, rewriting is a drift source: disable it on Model Studio, and treat its status on Higgsfield as unknown (not exposed in the catalog).
7. enable_thinking is a Wan only knob. Default false on Higgsfield wan3_0 and wan3_0_prime; slower and more adherent when on. Nothing analogous exists on Seedance. Use it for dense multi shot or document conditioned prompts, skip it for simple single action shots (catalog; community latency notes in section 6).
8. Smart duration has no Seedance analog. duration -1 lets the model pick length; on Higgsfield it is billed as 10 seconds (catalog). For fixed length canon shots, never use -1; state the exact duration.
9. Audio defaults on. wan3_0 `generate_audio` defaults true (catalog), and Wan treats sound description as a first class prompt element. Silent canon work must set generate_audio false and may add "No dialogue." and "No background music." per the vendor's suppression syntax.
10. Duration ceilings line up at the top only. wan2_7 caps at 15 seconds, wan2_6 at 15, wan3_0 matches Seedance 2.5's 30 second single pass. Camera vocabulary is compatible (push in, pull out, tracking, orbit, fixed camera), but Wan's guide attaches emotional intent to each move rather than the physical event grammar (start position, path, speed, end framing) that Higgsfield's Seedance guide prescribes; carrying the physical grammar over to Wan is untested rather than vendor endorsed.

---

## Source summary

Vendor (Alibaba, Tongyi): help.aliyun.com and alibabacloud.com Model Studio pages (wan3 guide, wan3 API reference, wan2.7 t2v and i2v references, wan2.6 r2v reference, unified prompt guide), alibabacloud.com Wan 3.0 and Wan 2.6 blogs, github.com/Wan-Video and github.com/Tongyi-MAI/Z-Image, huggingface.co/Tongyi-MAI/Z-Image-Turbo, tongyi-mai.github.io. Platform (Higgsfield): live models_explore catalog (wan2_6, wan2_7, wan3_0, wan3_0_prime, z_image), github.com/higgsfield-ai/cli MODELS.md, higgsfield.ai/wan-ai-video, higgsfield.ai help center. Community: dev.to defaults piece, zenn.dev Wan 2.7 thinking article, cometapi.com, gptproto.com, tellers.ai, streetinsider.com press aggregation, rits.shanghai.nyu.edu, stable-learn.com. All retrieved 2026-09-20. No generation, edit, or upscale tool was called; zero credits were spent.
