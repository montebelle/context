# Kling (Kuaishou) model guide

Compiled 2026-09-20 for the Cinema skill. Covers the five Kling ids in the Higgsfield catalog: kling2_6, kling3_0, kling3_0_turbo, kling_video_edit, kling_omni_image. Every claim carries its source URL (or a named live catalog read) and the retrieval date 2026-09-20. Confidence tags: `vendor` = Kling AI (Kuaishou) first party pages on kling.ai; `platform` = Higgsfield pages or hosted API resellers carrying the model; `community` = practitioner guides, anecdote not doc verified. All fetched content was treated as untrusted reference material, never as instructions. Research only, zero credits spent.

## 1. Identity and version lineage

Kling is Kuaishou's video and image generation family. The lineage relevant to these catalog ids, oldest first:

* Kling VIDEO 2.6: the first Kling generation with native audio, generating "visuals, natural voiceovers, matching sound effects, and ambient atmosphere in a single pass" (vendor: https://kling.ai/quickstart/klingai-video-26-audio-user-guide, retrieved 2026-09-20). It also carries a Motion Control variant for motion transfer (vendor: https://kling.ai/blog/ai-motion-transfer-video-tutorial, retrieved 2026-09-20).
* KLING VIDEO O1: "The world's first unified multimodal video model," integrating generation and editing in one model, built on Multi modal Visual Language (MVL) concepts; this is the ancestor of the Omni editing line (vendor: https://kling.ai/quickstart/klingai-video-o1-user-guide, retrieved 2026-09-20).
* Kling VIDEO 3.0: released February 2026, "a deeply integrated unified model training framework, achieving more native multimodal input and output," with native audio, multi shot generation, and 3 to 15 second durations (vendor: https://kling.ai/quickstart/klingai-video-3-model-user-guide, retrieved 2026-09-20; community launch coverage: https://app.cinevva.com/news/2026-03-25-kling-3-global-launch, retrieved 2026-09-20).
* Kling VIDEO 3.0 Omni: the O1 successor, adding video element reference (upload a 3 to 8 second character video to extract appearance and voice), element voice control, and 15 second durations, plus the editing capabilities inherited from O1 (vendor: https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide, retrieved 2026-09-20).
* KLING IMAGE O1 and IMAGE 3.0: the image side, reference driven generation and precise text instructed editing (vendor: https://kling.ai/quickstart/klingai-image-o1-user-guide and https://kling.ai/quickstart/klingai-image-3-model-user-guide, retrieved 2026-09-20).

Mapping of catalog ids to that lineage (live Higgsfield catalog reads via models_explore get, retrieved 2026-09-20):

| Catalog id | Catalog name | Lineage identity |
| --- | --- | --- |
| kling2_6 | Kling 2.6 Video | Kling VIDEO 2.6, "Cinematic motion, advanced physics" |
| kling3_0 | Kling v3.0 | Kling VIDEO 3.0, "Multi-shot, audio sync, motion transfer" |
| kling3_0_turbo | Kling 3.0 Turbo | 3.0 speed tier, "Fast text-to-video and single start-frame animation" |
| kling_video_edit | Kling 3.0 Omni Edit | VIDEO 3.0 Omni editing path, "Edit a source video with text instructions and optional reference images" |
| kling_omni_image | Kling O1 Image | KLING IMAGE O1, "Versatile photorealistic generation" |

Naming drift, flagged: the Higgsfield CLI MODELS.md documents kling2_6, kling3_0, and kling3_0_turbo but contains no Kling edit or image model (platform: https://github.com/higgsfield-ai/cli/blob/main/MODELS.md, retrieved 2026-09-20), while the live catalog serves all five ids. Treat the live catalog as authoritative for what is submittable and the CLI file as lagging. The same MODELS.md drift pattern was already documented for Seedance in the OASYS research file.

## 2. Availability and cost tier on Higgsfield

From the live catalog (models_explore get, retrieved 2026-09-20). The catalog carries no credit prices; price figures below come only from Higgsfield's blog and Kling's own guides and are labeled as such. Never invent prices; the exact cost is shown on the Generate button at submission time.

* kling3_0 and kling_omni_image carry `supports_unlim: true`, meaning they can accept free trial unlimited generations when an allowance is active; at retrieval the unlim block reported `available: false`, so no free configuration was live for this account (live catalog read, 2026-09-20).
* kling2_6, kling3_0_turbo, and kling_video_edit do not carry supports_unlim (live catalog read, 2026-09-20). kling3_0_turbo is tagged `budget` in the catalog, marking it as the cheap iteration tier.
* The kling3_0 `sound` parameter description states the cost direction explicitly: "Use 'off' for silent video and lower credits." (live catalog read, 2026-09-20).
* Higgsfield blog pricing for Kling 3.0 (platform, first party marketing, not the catalog): 720p at 15s is 30 credits (about $1.50), 1080p at 15s is 37.5 credits (about $1.88), 4K at 15s is 90 credits (about $4.50) (platform: https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation, retrieved 2026-09-20).
* Kling's own platform prices in credits per second, for calibration of relative cost only (vendor, applies to kling.ai, not Higgsfield): VIDEO 3.0 native audio 12/s at 1080p, 9/s at 720p; audio off 8/s and 6/s; voice tone control +2/s (https://kling.ai/quickstart/klingai-video-3-model-user-guide, retrieved 2026-09-20). Omni with a video input rises to 16/s at 1080p (https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide, retrieved 2026-09-20). VIDEO 2.6 native audio on is 10/s; off is 5/s pro, 3/s standard (https://kling.ai/quickstart/klingai-video-26-audio-user-guide, retrieved 2026-09-20). 4K mode is "30 credits per second (cinema-grade native 4K)" (vendor: https://kling.ai/blog/kling-ai-prompt-guide, retrieved 2026-09-20).

## 3. Prompt structure the vendor prescribes

The official Kling text to video formula, quoted verbatim including its fullwidth punctuation (vendor: https://kling.ai/quickstart/text-to-video-prompt-guide, retrieved 2026-09-20):

> "Prompt = Subject（Subject Description）+ Subject Movement + Scene（Scene Description）+（Camera Language + Lighting + Atmosphere)"

Element definitions from the same page (vendor, verbatim, retrieved 2026-09-20):

* Subject: "The main focus in the video, serving as an important embodiment of the theme. It can be people, animals, plants, objects, and so on".
* Subject movement: "Descriptions of the subject's movement status, including stillness and motion, should be straightforward and suitable for a 5-second video".
* Scene: "The environment in which the subject is situated, encompassing the foreground, background, and other elements", kept "Concise and focused, using a few short sentences".
* Style guidance: "Use simple words and sentence structures, avoiding overly complex language" and "Keep the visual content as simple as possible, aiming for a completion within 5 to 10 seconds".

The 2.6 audio era formula extends this to Scene + Element + Movement + Audio + Other parameters, with dialogue bound to labeled speakers: "[Character A, angrily] says, 'Sentence.' [Character B, calmly] replies, 'Sentence.'" (vendor: https://kling.ai/quickstart/klingai-video-26-audio-user-guide, retrieved 2026-09-20).

The current blog guide frames it as six elements (subject, action, scene, camera, lighting and mood) and states the philosophy: "Strong cinematic prompts are built from clear scene direction rather than secret formulas." (vendor: https://kling.ai/blog/kling-ai-prompt-guide, retrieved 2026-09-20).

Camera language the vendor prescribes (vendor: https://kling.ai/blog/kling-ai-camera-control-video-guide, retrieved 2026-09-20): the named moves are push in, pull back, pan left, pan right, tilt up, tilt down, track forward, orbit slowly, static camera. The core principle, verbatim: "A prompt such as 'camera slowly pushes in on the [character's face] as she turns toward the window' is usually clearer than 'cinematic camera movement.'" The rules are "One main camera move per shot" and connect the move to the subject's action; the named mistake is "Avoid asking the camera to pan while the subject also moves in the opposite direction too quickly".

Multi shot prompting (kling3_0, this is the model's signature behavior):

* Two modes, vendor defined. Automatic: "the model will automatically plan shot transitions and generate multi-scene video content without requiring manual description." Custom: the user sets number of shots, duration per shot, and framing per shot, and "The model will strictly follow the prompts to generate a multi-shot video that meets your expectations." (vendor: https://kling.ai/quickstart/klingai-video-3-model-user-guide, retrieved 2026-09-20).
* On Higgsfield the same two modes surface as auto ("the model reads your prompt and splits it into shots on its own") and custom ("you build the shot list yourself...and set the duration of each"), with "up to 5 shots per video, each with its own prompt and duration" (platform: https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation, retrieved 2026-09-20). Shot count discrepancy, flagged: the vendor guide states no maximum, Higgsfield says 5, community coverage says 6 (community: https://www.atlabs.ai/blog/kling-3-0-prompting-guide-master-ai-video-generation and https://www.veed.io/learn/kling-ai-prompting-guide, retrieved 2026-09-20). Trust the in product shot editor over any of these numbers.
* Shot prompts on Higgsfield use timecode segments ("0-1.5s: [action]", "1.5-3s: [shot description]") (platform: https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation, retrieved 2026-09-20). Community restates this as "Think in Shots, Not Clips" with "Shot 1 (0-3 seconds): [description]" formatting (community: https://www.atlabs.ai/blog/kling-3-0-prompting-guide-master-ai-video-generation, retrieved 2026-09-20).

## 4. Parameters that change output

Exact parameter surfaces from the live Higgsfield catalog (models_explore get, retrieved 2026-09-20):

| Id | Parameters | Media inputs | Aspect ratios |
| --- | --- | --- | --- |
| kling2_6 | duration 5 or 10 (default 5); sound bool (default true) | one image, role start_image | 16:9, 9:16, 1:1 |
| kling3_0 | duration 3 to 15 (default 5); mode std, pro, 4k (default std); sound on or off (default on) | image roles start_image and end_image | 16:9, 9:16, 1:1 |
| kling3_0_turbo | resolution 720p or 1080p (default 720p); duration 3 to 15 (default 5) | one image, role start_image | 16:9, 9:16, 1:1 |
| kling_video_edit | mode std, pro, 4k (default pro) | roles video_references and image_references | none listed |
| kling_omni_image | resolution 1k or 2k (default 1k) | image role image_references | 1:1, auto, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 21:9 |

Reading of that table:

* Only kling3_0 accepts an end image, so it is the only Kling id on this surface that can lock both ends of a shot. Higgsfield's phrasing: "Attach a start frame to define the opening of the clip, an end frame to define where the motion resolves, or both to lock the full trajectory." (platform: https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation, retrieved 2026-09-20).
* No Kling id on this surface exposes a seed, a cfg scale, or a negative prompt field (live catalog read, 2026-09-20). Determinism therefore rests on start and end frames, exactly as with the skill's canon Seedance surface.
* mode std versus pro versus 4k on kling3_0 and kling_video_edit is the quality and resolution lever; kling3_0_turbo swaps mode for a plain resolution enum and has no sound parameter at all, so turbo output is silent iteration footage (live catalog read, 2026-09-20).
* On other hosting surfaces the Kling 3 API additionally accepts `negative_prompt` ("Text describing what to avoid (max 2500 chars)"), a 2500 character `prompt` limit, `multi_shot`, `shot_type`, `multi_prompt` (per shot prompts, 2500 chars each), and `cfg_scale`: "CFG scale controls how closely the model follows your prompt. Use 0 for maximum creativity and artistic interpretation, 0.5 (default) for balanced results, or 1 for strict adherence to your prompt with less creative variation." (platform reseller: https://docs.magnific.com/api-reference/video/kling-v3/overview, retrieved 2026-09-20). The older `camera_control` config object (pan, tilt, roll, zoom) is documented only for the 1.x era API (platform reseller: https://piapi.ai/docs/kling-api/create-task, retrieved 2026-09-20) and is not listed for v3. Kling's own API portal renders as a JavaScript app and could not be read directly (https://kling.ai/document-api/quickStart/userManual, attempted 2026-09-20), so these API parameters are reseller documented, not vendor verified.

## 5. Documented best practices

Vendor documented (kling.ai, all retrieved 2026-09-20):

* Keep prompts simple and short; one action that completes within the clip length (https://kling.ai/quickstart/text-to-video-prompt-guide).
* One main camera move per shot, tied to the subject's action (https://kling.ai/blog/kling-ai-camera-control-video-guide).
* For custom multi shot, "Organize the scene by shot order so each beat has a clear purpose." (https://kling.ai/blog/kling-ai-prompt-guide).
* For dialogue, keep the "speaker's name, line, and delivery close together" and use clear speaker labels (https://kling.ai/blog/kling-ai-prompt-guide).
* For image to video, "The video quality is highly dependent on the input image resolution. For better video quality, it's recommended to upload higher-resolution images." (https://kling.ai/quickstart/klingai-video-26-audio-user-guide).
* For motion transfer, treat the text prompt as "production direction, not choreography": "Describe where the subject is, what the camera/lighting mood feels like, and the visual style." The motion itself comes from the video reference (https://kling.ai/blog/ai-motion-transfer-video-tutorial).

Platform documented (Higgsfield, retrieved 2026-09-20):

* Chain scenes through frames: "use the final frame of each scene as the Start Frame of the next to anchor visual continuity." (https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-kling). This is the same shared boundary frame method the skill's canon already mandates for Seedance.
* Element discipline: "Tag the same element in every shot where it appears. Describe only the element's action in the shot prompt, since its look is already defined by the element itself." (https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation).
* Cost discipline: "draft at 720p, lock the prompt...then rerun at resolution you need"; audio is a per generation toggle, off for drafts (https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation). kling3_0_turbo exists for exactly this draft loop (live catalog read, 2026-09-20).

Community reported (marked, anecdote):

* Cinematic jargon works as a style anchor, not physics: "The model associates terms like 'f/2.8' with visual patterns from training data, not computational aperture simulation." (community, fal learn: https://fal.ai/learn/devs/kling-2-6-pro-prompt-guide, retrieved 2026-09-20). Same source suggests "++" emphasis markers around critical elements; unverified against vendor docs.
* Ground the environment first: "Always start by grounding the model in a clear environment. This gives Kling spatial and lighting context before anything moves." and prefer precise camera verbs ("dolly push, whip-pan, shoulder-cam drift, crash zoom, snap focus") over "moves" (community: https://www.atlabs.ai/blog/kling-3-0-prompting-guide-master-ai-video-generation, retrieved 2026-09-20).
* Use one stable descriptor per character ("the woman in a red coat") in every shot rather than pronouns (community: https://www.atlabs.ai/blog/kling-3-0-prompting-guide-master-ai-video-generation, retrieved 2026-09-20).

## 6. Known failure modes

Vendor documented (retrieved 2026-09-20):

* Count instability: current models "are not sensitive to numbers, making it difficult to maintain consistency in counts" (https://kling.ai/quickstart/text-to-video-prompt-guide). Directly relevant to any scene with a fixed cast count.
* Complex physics: trajectories like "the bouncing of a ball or the trajectory of a high-altitude throw" remain challenging (https://kling.ai/quickstart/text-to-video-prompt-guide).
* Motion transfer face mismatch: "If the element's face differs significantly from the face in the first frame, there is a small chance that facial quality may degrade, for example, when using a cat's face to reference a human." (https://kling.ai/quickstart/motion-control-user-guide).
* Audio degradation: singing shows "weaker voice consistency" and three or more simultaneous speakers may degrade output (https://kling.ai/quickstart/klingai-video-26-audio-user-guide).
* Vague edit instructions: for image editing, "vague wording" reduces accuracy; the prescribed formula is "Keep everything else unchanged, modify [target] to [desired change]." (https://kling.ai/quickstart/klingai-image-o1-user-guide and https://kling.ai/quickstart/klingai-image-3-model-user-guide).

Platform documented, Higgsfield's five named Kling 3.0 mistakes (https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation, retrieved 2026-09-20): overloading a single shot (fix: "split them across shots in custom mode"); an end frame that contradicts the prompt (keep the prompt "aligned with where the frame says the scene ends"); too many shots for the duration ("match the shot count to total duration"); confusing generation with motion transfer tools; and drafting at 4K.

Community reported (marked, anecdote, retrieved 2026-09-20):

* Morphing mid clip: objects change appearance mid video; fixes are Elements with multiple reference angles or stating "maintains exact appearance throughout" (community, fal learn: https://fal.ai/learn/devs/kling-2-6-pro-prompt-guide).
* Stacked camera moves distort: "360-degree rotation around subject while zooming in" often produces distorted geometry; reduce simultaneous transformations (community, fal learn: https://fal.ai/learn/devs/kling-2-6-pro-prompt-guide).
* Negative prompting is used against artifacts ("No morphing clothes, no distorted hands") (community: https://www.atlabs.ai/blog/kling-3-0-prompting-guide-master-ai-video-generation). Note the negative channel is only exposed on API resellers, not in the Higgsfield catalog parameters (live catalog read, 2026-09-20), so on this surface such constraints must live inside the prompt text.

## 7. Text rendering behavior

Documentation here is thin and mostly absence, flagged as such:

* The vendor's VIDEO 3.0 prompting guidance includes specifying text elements to preserve or generate as part of the prompt (vendor: https://kling.ai/quickstart/klingai-video-3-model-user-guide, retrieved 2026-09-20), which implies deliberate in frame text is supported but gives no fidelity guarantees.
* The IMAGE 3.0 and IMAGE O1 guides contain no explicit text rendering or typography documentation; confirmed absence on both pages (vendor: https://kling.ai/quickstart/klingai-image-3-model-user-guide and https://kling.ai/quickstart/klingai-image-o1-user-guide, retrieved 2026-09-20).
* Community: "The model can preserve text and signage from original images" when using first frame anchoring in image to video (community: https://www.atlabs.ai/blog/kling-3-0-prompting-guide-master-ai-video-generation, retrieved 2026-09-20). Preservation of supplied text is the reliable path; free generation of new text is undocumented.
* For the skill's canon work, which forbids all generated text, the working rule carries over unchanged: forbid emergent text in the prompt and keep any required markings as physical surface properties in the reference imagery.

## 8. Reference and conditioning behavior

Frames (conditioning by image):

* kling2_6 and kling3_0_turbo: start image only. kling3_0: start image and end image. kling_video_edit: a source video plus image references. kling_omni_image: image references only (live catalog reads, 2026-09-20).
* Higgsfield's chaining rule for scene sequences: final frame of scene N becomes the start frame of scene N+1 (platform: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-kling, retrieved 2026-09-20).

Elements (persistent identity):

* An element holds 2 to 4 reference images: "Each element must contain at least 2 reference images (1 main reference image + 1 additional reference image) and can include up to 4 reference images." Video character elements extract appearance and voice from a 3 to 8 second clip (vendor: https://kling.ai/quickstart/klingai-element-library-3-user-guide, retrieved 2026-09-20).
* Capacity per generation: VIDEO 3.0 binds up to 3 elements alongside start and end frames; 3.0 Omni takes up to 7 references without a video input, or 4 when a video input is present; image generation takes up to 10 (vendor: https://kling.ai/quickstart/klingai-element-library-3-user-guide and https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide, retrieved 2026-09-20).
* In Omni surfaces elements are summoned by mention: "In Omni, type '@' to quickly call up added elements without re-uploading or manual selection." (vendor: https://kling.ai/quickstart/klingai-element-library-3-user-guide, retrieved 2026-09-20). The stated purpose: "By locking the core features of key elements, it effectively solves the pain point of subjects losing their shape when the perspective or shot changes." (same source).
* Input constraints for Omni references: images 300px minimum and 10MB or less (.jpg, .jpeg, .png); one video of 3 to 10 seconds, 200MB or less, up to 2K; character audio 5 to 30 seconds, single speaker (vendor: https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide, retrieved 2026-09-20).

Motion transfer (conditioning by video):

* Motion Control "enables precise control of a character's movements and facial expressions based on a reference image" driven by an action video. Requirements, verbatim: "The supported duration for uploaded action videos is 3–30 seconds"; "The action video must be a single continuous shot, with the character consistently visible"; "Avoid cuts, shot changes, or camera movements"; with multiple people, "the motion of the character occupying the largest portion of the frame will be used"; frame size "The short edge must be at least 340px, and the long edge must not exceed 3850px" (vendor: https://kling.ai/quickstart/motion-control-user-guide, retrieved 2026-09-20).
* The three input mental model from the 2.6 tutorial: the motion reference video "provides the skeleton, the timing, and the physics"; the character image "provides the skin"; and "the text focuses on lighting, background, and style" (vendor: https://kling.ai/blog/ai-motion-transfer-video-tutorial, retrieved 2026-09-20). Proportions must match: "If your video shows a full-body shot...your image must also be a full-body shot." (same source).
* On Higgsfield, motion transfer is a separate tool (Kling 3.0 Motion Control, listed at 3 to 30 seconds and up to 1080p in the help center table) and is not one of the five catalog ids covered here; "Dance clips and gesture-based footage tend to produce the strongest results." (platform: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-kling and https://higgsfield.ai/blog/kling-motion-control-3, retrieved 2026-09-20). The kling3_0 catalog description advertises "motion transfer" but its media slots accept only start and end images (live catalog read, 2026-09-20), so route motion transfer jobs through the dedicated tool, not the kling3_0 text and frame surface.

Editing (kling_video_edit):

* Edits are natural language instructions against a source video, with optional references: "Remove bystanders," "change daytime to dusk," "replace the main character's outfit," style conversion, weather changes, recoloring, and green screen keying, applied without manual masking (vendor, O1 lineage: https://kling.ai/quickstart/klingai-video-o1-user-guide, retrieved 2026-09-20). Prescribed edit phrasing: "Change [specified subject] in [@Video] to [target subject]", "Remove [content] from [@Video]", "Change [@Video] to [style] style" (same source).

## 9. Seedance 2.5 delta

How prompting Kling differs from the skill's canon model (Seedance 2.5 on Higgsfield), against the canon evidence in /Users/mbps/Documents/GitHub/OASYS/docs/from-desert-to-oasys/from-desert-to-oasys-prompting-research-v1.md:

1. Structure lives in the interface, not the prompt. Seedance 2.5 takes one continuous labeled block (GLOBAL STYLE through AUDIO) with millisecond timecodes, an EVENT TRACK, and per segment LENS LOCK inside a single prompt (official: https://higgsfield.ai/blog/seedance-2-5-prompting-guide, retrieved 2026-09-20). Kling instead externalizes structure into a custom multi shot editor where each shot has its own prompt and duration and "The model will strictly follow the prompts" (vendor: https://kling.ai/quickstart/klingai-video-3-model-user-guide, retrieved 2026-09-20). Port canon prompts by splitting the shot by shot breakdown into Kling's per shot slots rather than pasting the whole block into one field.
2. Shorter, simpler prompts are the vendor norm. Kling prescribes "simple words and sentence structures" and actions sized to the clip (vendor: https://kling.ai/quickstart/text-to-video-prompt-guide, retrieved 2026-09-20), versus the Seedance 2.5 guide's dense multi section prompts. The canon's physics and lighting language survives, but compress it per shot.
3. References are curated Elements, not raw slots. Seedance 2.5 takes up to 50 raw references labeled in prompt ([Image1], @Image1) (official: https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5, retrieved 2026-09-20). Kling binds identity at element creation time (2 to 4 images per element), then mentions elements by @ tag, with hard caps of 3 (VIDEO 3.0) or 7 (Omni) (vendor: https://kling.ai/quickstart/klingai-element-library-3-user-guide, retrieved 2026-09-20). The canon's small matched reference discipline transfers directly; the element cap simply enforces it.
4. Identity phrasing moves out of the prompt. The Seedance canon repeats identity lock language per scene; on Kling the platform rule is the inverse: "Describe only the element's action in the shot prompt, since its look is already defined by the element itself." (platform: https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation, retrieved 2026-09-20).
5. Count locks are weaker. Kling's vendor docs concede models "are not sensitive to numbers" (vendor: https://kling.ai/quickstart/text-to-video-prompt-guide, retrieved 2026-09-20), so the canon's positive count locks (exactly five carriers) are less trustworthy on Kling; carry counts in the start frame imagery, not just prose.
6. Extra control channels exist off Higgsfield. The Kling 3 API adds `negative_prompt` and `cfg_scale` (platform reseller: https://docs.magnific.com/api-reference/video/kling-v3/overview, retrieved 2026-09-20), which Seedance never exposes (canon research, open question 9). On the Higgsfield catalog neither appears for any Kling id (live catalog read, 2026-09-20), so on this surface the canon's positive lock over negation style still applies unchanged.
7. Determinism story is identical. No seed on any Kling id in the catalog (live catalog read, 2026-09-20), same as the seedless Seedance surface; kling3_0's start plus end image pair is the same shared boundary frame lever the canon already uses, and Higgsfield documents the same last frame to start frame chaining for Kling (platform: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-kling, retrieved 2026-09-20).
8. Motion conditioning splits into a separate tool. Seedance 2.5 takes @motion video references inside the same generation (official: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-seedance, retrieved 2026-09-20); Kling motion transfer is its own Motion Control pipeline with strict reference video rules (single continuous shot, no cuts, no camera movement) and a prompt that dresses the scene rather than directing the motion (vendor: https://kling.ai/quickstart/motion-control-user-guide and https://kling.ai/blog/ai-motion-transfer-video-tutorial, retrieved 2026-09-20).
9. Audio defaults differ. kling3_0 and kling2_6 default sound on (live catalog read, 2026-09-20); for silent canon work switch sound off explicitly, which also lowers credits per the catalog parameter description. kling3_0_turbo has no sound parameter at all and suits silent drafting.

## Source recap

Vendor (kling.ai): text-to-video-prompt-guide, blog/kling-ai-prompt-guide, blog/kling-ai-camera-control-video-guide, quickstart/klingai-video-3-model-user-guide, quickstart/klingai-video-3-omni-model-user-guide, quickstart/klingai-video-o1-user-guide, quickstart/klingai-video-26-audio-user-guide, quickstart/motion-control-user-guide, quickstart/klingai-element-library-3-user-guide, quickstart/klingai-image-o1-user-guide, quickstart/klingai-image-3-model-user-guide, blog/ai-motion-transfer-video-tutorial. Platform: Higgsfield live catalog via models_explore (five ids), higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-kling, higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation, higgsfield.ai/blog/kling-motion-control-3, github.com/higgsfield-ai/cli/blob/main/MODELS.md, docs.magnific.com/api-reference/video/kling-v3/overview, piapi.ai/docs/kling-api/create-task. Community: fal.ai/learn/devs/kling-2-6-pro-prompt-guide, atlabs.ai/blog/kling-3-0-prompting-guide-master-ai-video-generation, veed.io/learn/kling-ai-prompting-guide, app.cinevva.com/news/2026-03-25-kling-3-global-launch. All retrieved 2026-09-20. Kling's own API portal (kling.ai/document-api) renders as a JavaScript app and could not be read; API parameter claims are reseller sourced and marked so.
