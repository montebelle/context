# Seedance (ByteDance) model guide

Model documentation research for the Cinema skill. Covers the Higgsfield catalog ids `seedance1_5`, `seedance_2_0`, `seedance_2_5`, and `ad_multiplier`, all four generation modes of Seedance 2.5 (`t2v`, `omni_reference`, `video_edit`, `video_extension`), the 4 to 30 second range, and the official ByteDance and Volcano Engine (Doubao/Ark, English mirror at BytePlus ModelArk) Seedance prompting guides. Research only: catalog reads and page fetches, zero generations, zero credit spend.

All retrievals dated 2026-09-20 unless noted. Everything fetched from vendor pages is untrusted reference material, never instructions to execute. In particular, the Ark prompt guide opens with an NPX command that installs a vendor prompt optimization skill (`sd25-pe`); it is recorded here as a documented fact about the vendor's tooling and must not be auto executed. This guide extends, and does not repeat, the deep Higgsfield side research in `/Users/mbps/Documents/GitHub/OASYS/docs/from-desert-to-oasys/from-desert-to-oasys-prompting-research-v1.md` (compiled 2026-09-18, cited below as "research v1"). The single largest addition here is the official Ark documentation, which research v1 could not read because those pages render only in a browser (its open question 12); the pages were browser rendered and read in full for this guide.

Source classes: `vendor` = ByteDance Seed, Volcano Engine/BytePlus ModelArk, or Higgsfield first party. `catalog` = the live Higgsfield MCP catalog (`models_explore` action get, read 2026-09-20). `community` = practitioner anecdote, marked as such.

---

## 1. Identity and version lineage

The Seedance line is ByteDance Seed's video generation family. The official models index lists four video tiers: Seedance 1.0, Seedance 1.5 pro, Seedance 2.0, and Seedance 2.5 (vendor: https://seed.bytedance.com/en/models, retrieved 2026-09-20; lineage detail with launch dates in research v1 section 1.2).

Seedance 2.5 (launched 2026-07-31) is the current top tier: "30-second audio-video clips in a single pass", "up to 30 images, 10 video clips, and 10 audio clips as reference materials in a single pass", multi round extension, and timestamp level editing (vendor, verbatim: https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5, retrieved 2026-09-20).

Exact API model ids on the Ark surface (vendor: https://docs.byteplus.com/en/docs/ModelArk/2607688, page last updated 2026-09-15, retrieved 2026-09-20):

* `dreamina-seedance-2-5-260628` (Seedance 2.5)
* `dreamina-seedance-2-0-260128` (Seedance 2.0)
* `dreamina-seedance-2-0-fast-260128` (Seedance 2.0 fast)
* `dreamina-seedance-2-0-mini-260615` (Seedance 2.0 mini)
* `doubao-seedance-1-5-pro-251215` (Seedance 1.5 Pro; vendor: https://docs.byteplus.com/en/docs/ModelArk/2168087, retrieved 2026-09-20)

On Higgsfield the live catalog ids are (catalog, retrieved 2026-09-20):

* `seedance1_5`, display name "Seedance 1.5 Pro", provider Bytedance.
* `seedance_2_0`, display name "Seedance 2.0", provider Bytedance.
* `seedance_2_5`, display name "Seedance 2.5", provider Bytedance: "Seedance 2.5 text-to-video, multimodal omni-reference generation, video edit, and video extension".
* `ad_multiplier`, display name "Ad Multiplier", provider Higgsfield: "Ad Multiplier video generation powered by Seedance 2.5". Its parameter schema is identical to `seedance_2_5` field for field (same modes, durations, resolutions, media roles), so it is a Higgsfield branded wrapper over the same engine, and everything in this guide about prompting `seedance_2_5` applies to it unchanged.

This closes research v1 open question 1: `seedance_2_5` does exist as a submittable model id on the Higgsfield surface as of 2026-09-20, with the full 4 to 30 second range, even though the Higgsfield CLI `MODELS.md` snapshot of 2026-09-14 did not list it. The catalog is more current than the CLI file; trust the catalog.

The Chinese language originals of the Ark guides live on Volcano Engine (vendor: https://docs.volcengine.com/docs/82379/2607688 for the 2.5 tutorial, located via search 2026-09-20, not separately fetched); the BytePlus ModelArk pages cited throughout are the vendor's own English mirror of that documentation.

## 2. Availability and cost tier on Higgsfield

What the catalog itself says (catalog, retrieved 2026-09-20): all four ids are live and callable. The catalog exposes no credit prices per generation; it exposes an `unlim` block. At retrieval, `unlim.available` was false on all four ids, and only `seedance_2_0` carries `supports_unlim: true` (it is tagged `unlim`), meaning free trial unlimited generations can in principle cover Seedance 2.0 but none of the others, and this account could not spend unlim on any of them at read time.

Credit prices are not in the catalog and must never be invented. The Higgsfield blog publishes a 2.5 table: a 10 second clip at 480p is 30 credits (about $1.50), at 720p 70 credits (about $3.50), at 1080p 120 credits (about $6.00) (vendor: https://higgsfield.ai/blog/seedance-2-5-on-higgsfield-2026, retrieved 2026-09-20). Price drift warning: the same page read on 2026-09-18 for research v1 (its section 5.3) showed 65 credits at 720p and 90 at 1080p, so the published numbers moved within two days. The help center's rule is the reliable one: "The exact cost is always on the Generate button" (vendor, verbatim: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-seedance, retrieved 2026-09-20). Treat any table as stale on arrival and read the button.

Generation through the MCP connector always deducts credits; Unlimited and Free generation allowances apply only on the web platform (vendor: https://higgsfield.ai/creator-hub/help-center/integrations/how-do-i-connect-higgsfield-to-ai-agent, via research v1 section 5.6).

## 3. Prompt structure the vendor prescribes

### 3.1 The ByteDance/Ark basic formula

The 2.5 tutorial states the base ordering: "Follow the basic formula: Organize the prompt in the order of 'subject + action/event + scene and environment + visual style + camera movement/shot cuts + sound'; unnecessary parts may be omitted" (vendor, verbatim: https://docs.byteplus.com/en/docs/ModelArk/2607688, retrieved 2026-09-20).

The 2.5 prompt guide expands this into a four part structure (vendor: https://docs.byteplus.com/en/docs/ModelArk/2607689, page last updated 2026-08-31, retrieved 2026-09-20). Its framing sentence, verbatim: "Treat Seedance 2.5 as a visual content producer, and write structured prompts with a visual storytelling mindset." The four parts:

1. Asset referencing for R2V: "Clearly identify each image, video, or audio asset by its upload order and intended purpose, such as which asset represents the subject, voice, action, scene, and so on."
2. One sentence summary: "Subject + Location + Event + Genre/Style + Camera movement..."
3. Detailed plot description: "Use timestamps or 'Shot N' to divide the video into segments, and describe each segment's specific visuals, camera movement, actions, dialogue, sound effects, and other details." And: "Use positive descriptions whenever possible. Negative constraints are supported for subtitles and audio control, such as 'no subtitles' and 'no BGM.'"
4. Additional notes: "Add any visual details that should remain consistent throughout, such as camera angle, camera movement, environment, scene setting, sound, atmosphere, and other recurring elements."

The 2.0 series guide gives the fuller element chain for detailed work: "precise subject + action details + scene/environment + lighting & color tone + camera movement + visual style + image quality + constraints" (vendor, verbatim: https://docs.byteplus.com/en/docs/ModelArk/2222480, retrieved 2026-09-20). The same guide describes the model as internally splitting prompts into a "spatial layer" and a "temporal layer", which is why the prescribed form is a timeline storyboard: shot by shot, each shot carrying camera movement or transition method, subject actions and expressions, position or spatial changes, then audio.

### 3.2 Timestamp control (2.5 only)

The 2.5 prompt guide is explicit and this is the authoritative timing doctrine (vendor, all verbatim, https://docs.byteplus.com/en/docs/ModelArk/2607689, retrieved 2026-09-20):

* "Timestamps can help clarify the progression of the story. Use 1-second intervals as the basic unit".
* "If too little plot is specified within a given time range, the model may improvise more freely."
* "If too much content is packed into a given time range, the result may contain excessive cuts or omit parts of the plot. Make sure the duration allocation is reasonable."
* "It is not recommended to use timestamps to control high-frequency actions, such as 'shake your head three times per second.'"
* Keep the timeline continuous: "Pay attention to timeline continuity and avoid gaps such as '0-3s... 5-6s...'".

Three supported time control forms, with the guide's own examples: clear intervals ("0-3 seconds...3-7 seconds...7-15 seconds" or "[1s-4s]....[4s-8s]....[8s-12s]"), time point control ("At the 2-second mark, a burst of golden lightning descends from the top of the frame..."), and relative time control ("The frame freezes for 1 second after the main character presses the shutter.").

Contradiction flag, vendor versus platform: Higgsfield's 2.5 guide drives pacing "at millisecond precision" with examples like "At 5.4s she says..." (vendor: https://higgsfield.ai/blog/seedance-2-5-prompting-guide, via research v1 section 2.2), while ByteDance's own guide above prescribes one second units and integer second timestamps. The model maker's floor is the safer bet: anchor beats to whole seconds and treat sub second timecodes as best effort, not guaranteed.

### 3.3 Sound and dialogue markup

The tutorial prescribes symbol conventions: "Use () for music, <> for sound effects, {} for dialogue, and 【】 for subtitles. For non-Chinese dialogue, it is recommended to specify the language before the dialogue" (vendor, verbatim: https://docs.byteplus.com/en/docs/ModelArk/2607688, retrieved 2026-09-20). The 2.0 guide carries the same table with examples (vendor: https://docs.byteplus.com/en/docs/ModelArk/2222480). A silent film should not use any of these; instead use the documented negative audio controls, below.

### 3.4 Camera language

The 2.5 prompt guide (vendor, https://docs.byteplus.com/en/docs/ModelArk/2607689, retrieved 2026-09-20): basic terms can be written directly, listing shot size ("extreme wide shot/wide shot/medium shot/medium close-up/close-up"), camera movement ("push in/pull out/pan/track/follow/orbit/dive/pull back/tilt up/handheld shake"), and camera angle ("low angle/overhead shot/first-person perspective"), plus named techniques ("one-shot/long take, Hitchcock zoom/dolly zoom, aerial perspective, FPV, bullet time, handheld shot, and speed ramp"). Two verbatim rules:

* "For overly niche or technical terms, convert them into [term + descriptive explanation]", with the rack focus example spelling out what the viewer sees.
* "For transition shots, clearly specify both the trigger point and the transition method."

The 2.0 guide adds the stacking limit: "Try to specify only 1 type of camera movement in a single shot. Do not require push, pull, pan, and move at the same time, as this will increase image instability" (vendor, verbatim: https://docs.byteplus.com/en/docs/ModelArk/2222480, retrieved 2026-09-20).

Higgsfield's four element order ("subject and action first, setting and lighting second, camera move third, mood or style last") and its camera as a physical event doctrine remain valid on the hosting side (vendor: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-seedance, retrieved 2026-09-20; deep treatment in research v1 sections 2.1 to 2.3). The two vendors' orders are compatible: both put subject plus action first and treat camera as an explicit labeled instruction.

## 4. Parameters that change output

### 4.1 Higgsfield catalog surface (catalog, retrieved 2026-09-20)

`seedance_2_5` and `ad_multiplier` (identical schemas):

* `mode`: `t2v` (default, prompt only), `omni_reference` (image, video, or audio references), `video_edit` ("to edit one reference video (billed by that video's duration; 'duration' and 'aspect_ratio' are ignored)"), `video_extension` ("to extend a reference video ('aspect_ratio' is ignored — the output follows the extended video)").
* `duration`: number, 4 to 30 seconds, default 5.
* `resolution`: `480p`, `720p`, `1080p`, default `720p`. No 4k value on this id.
* `generate_audio`: bool, default true. A silent film must set it false explicitly.
* `bitrate_mode`: `standard` or `high`, default `standard`.
* `extension_mode`: `backward` or `forward`; "required for mode 'video_extension' and not allowed otherwise".
* Media roles: `start_image`, `end_image`, `image_references`, `video_references`, `audio_references`. A dedicated end frame slot therefore exists on the Higgsfield 2.5 surface (this answers research v1 open question 3 for the catalog surface).
* Aspect ratios: `auto`, `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`.
* No seed parameter, no cfg, no negative prompt field, no fps field. Determinism still comes only from fixed boundary frames (research v1 section 5.4 remains correct).

`seedance_2_0`: `duration` 4 to 15 default 5; `resolution` `480p`/`720p`/`1080p`/`4k` default `720p` (4k exists here and not on `seedance_2_5`); `mode` only `std`; `bitrate_mode`; a `genre` enum (`auto`, `action`, `horror`, `comedy`, `noir`, `drama`, `epic`); `generate_audio` default true; same five media roles; same ratio list.

`seedance1_5`: `duration` only the options 4, 8, or 12; `resolution` `480p`/`720p`/`1080p` default `720p`; `generate_audio` default true; media roles only `start_image` and `end_image`, so no reference slots at all on Higgsfield; same ratio list.

### 4.2 Ark surface parameters that have no Higgsfield equivalent (vendor: https://docs.byteplus.com/en/docs/ModelArk/2607688, retrieved 2026-09-20)

* `ratio: adaptive` (Ark default): the model picks the ratio; editing, extension, and first or last frame tasks lock ratio to the input asset and only accept `adaptive`. 2.5 can hit any ratio between 0.4 and 2.5 through input assets.
* `duration: -1`: the model picks a length in [4, 30]; mandatory for editing (output tracks the input video, may run up to about 0.4 seconds shorter).
* `output_format`: `mp4` (default) or `mov`. The mov path is "H.264 video encoding, yuv444p chroma sampling, and PCM audio encoding" and is the vendor's recommended input and output format for editing and extension because it "better maintains consistency of image color and brightness".
* `resolution` color depth: 480p and 720p are 8 bit; "1080p (10-bit color depth)" with H.265/HEVC encoding on 2.5. On Ark, 4k exists only on Seedance 2.0 (10 bit), not 2.5.
* Exact pixel dimensions per ratio are published (for example 1080p 16:9 = 1920x1080, 21:9 = 2206x946, 1:1 = 1440x1440).
* `watermark`: bool, default false; true stamps an AI label bottom right.
* `omni_reference_task_type`: `auto`, `edit`, or `extend`; setting it moves constraint validation to submit time. Mismatch between the declared type and what the prompt actually asks for returns `InvalidParameter.TaskTypeMismatch`; constraint violations under auto return `InvalidParameter.TaskTypeConstraint`.
* `seed` and `camera_fixed` exist on the Ark Seedance 1.5 Pro surface (vendor: https://docs.byteplus.com/en/docs/ModelArk/2168087, retrieved 2026-09-20) but are absent from every Seedance id in the Higgsfield catalog.

### 4.3 Mode selection is partly prompt driven

On both surfaces the editing and extension subtypes are triggered by intent words in the prompt, not only by the parameter. Ark, verbatim: editing requires "at least one editing trigger in the prompt: edit video, add, insert, remove, delete, modify, replace, change to, or similar wording"; extension requires "extend forward, extend backward, continue, continue from, extend the story, or similar wording" (vendor: https://docs.byteplus.com/en/docs/ModelArk/2607689, retrieved 2026-09-20). Practical consequence: in `omni_reference` mode, avoid these trigger words unless an edit or extension is intended, or the task can be reclassified.

## 5. Documented best practices

All vendor unless marked. From the 2.5 prompt guide and tutorial (https://docs.byteplus.com/en/docs/ModelArk/2607689 and /2607688, retrieved 2026-09-20):

* Reference caps versus working counts: the ceiling is 50 assets (30 images at up to 4K input resolution, 10 videos totaling at most 30 seconds, 10 audio clips totaling at most 30 seconds), but the vendor's own working numbers are far lower: "1-5 subjects generally produce better results" for audio and video subject references; "1-8 subjects generally produce better results" for image subject references; reference clips of "5-10 seconds generally works better". This is the model maker independently confirming the community's fewer references doctrine that research v1 section 3.3 documented.
* Bind every asset in the text by upload order (@Image 1, @Video 1, @Audio 1) and give each a job. Verbatim: "It is not recommended to provide mapping information only inside the image itself. For example, avoid writing 'John' on the protagonist's image and then simply saying 'John is at school...' in the prompt, as this can easily cause character confusion or duplication."
* Scope partial references: "If only part of an asset should be referenced, clearly state which part should be used." Example: "Refer to Image 1 for lighting and filters."
* Do not over describe what a good reference already carries: "When the reference asset itself is sufficiently accurate, simply state that it should be referenced and avoid repeatedly describing the scene in detail."
* Editing: state scope, the A to B change, and what stays: "Change the man's action from drinking coffee to mopping the floor from 4-6 seconds in Video 1, and leave the rest of the content unchanged." Keep edit input videos within 20 seconds; 1 to 5 reference images for image guided edits.
* Extension: use mov in and out; extending a video that 2.5 itself generated gives the smallest seam ("the volume difference is usually smaller, resulting in better seamless continuity"; duration match is exact for 2.5 originated inputs).
* Storyboards: 15 panels or fewer, line art preferred, no text on the storyboard image; storyboards steer plot loosely. When strict adherence matters, switch to keyframes: "When the video must strictly follow the storyboard, use keyframe references... state in the first sentence of the prompt: 'Use Images X to X in order as keyframes.'"
* Actions (2.0 guide, https://docs.byteplus.com/en/docs/ModelArk/2222480): name body parts and quantify degree ("slowly raise a hand, quickly turn the head"); "Prioritize slow, gentle, coherent subtle movements"; write transitions between actions; externalize emotion as physical detail instead of abstract words.
* Asset role economy (2.0 guide, and unchanged in spirit for 2.5): a working set of 4 to 5 assets covering character anchoring, scene tone, camera movement reference, and audio atmosphere; "It is not recommended to use the full asset limit."
* Higgsfield workflow (https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-seedance, retrieved 2026-09-20): "Start at 720p for every new prompt", review the full clip, then raise resolution; change one variable per retry (research v1 sections 5.1 and 5.5 carry the full treatment).

## 6. Known failure modes

Vendor documented, from the Ark 2.0 series guide FAQ (https://docs.byteplus.com/en/docs/ModelArk/2222480, retrieved 2026-09-20; written against 2.0, most items structural enough to carry to 2.5):

* Character ID drift and midway face swap. Cause: combined reference images and small face area. Fix: a separate headshot with nothing else in frame, subject defined explicitly ("<Subject 1> facial features reference image 1 (headshot), makeup and styling reference image 2"), important assets placed first in the prompt. Explicit warning: multi view sheets worsen drift on 2.0 ("the model may easily identify them as multiple different subjects").
* Unexpected subtitles. Verbatim admission: "Currently, it is not possible to directly avoid generating subtitles 100%." Mitigations: explicit constraint lines, strip text from reference assets first, and prefer landscape ("the probability of generating subtitles in landscape is significantly lower than in portrait").
* Duplicated characters (twins). Fix: bind each character to its image inline and append a global count constraint; the guide's own constraint line: "Throughout the video, characters with completely identical appearance, clothing, and accessories are prohibited. Do not generate duplicate avatars or a twin effect."
* Jump cuts at extension joins. Post fix prescribed: trim 6 frames from the end of the earlier clip and 1 frame from the start of the later clip at each join.
* Quality degradation across repeated extensions, especially mottled faces. Mitigations: convert the source to a white 3D model video and extend that, feed high definition references, cap the number of chained extensions.
* More than 4 reference people destabilizes counts. Fix: group people into images of at most 4, then image to video.
* Style drift toward live action when references are photoreal; end of clip audio noise; mispronounced rare Chinese characters; effects that need a reference video to land (a countdown rendered wrongly from text alone).

Vendor documented, 2.5 specific:

* ByteDance's own stated weakness, verbatim: "room for improvement, particularly regarding the physical plausibility of complex motions and the stability of scenes involving interactions among multiple subjects" (https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5, retrieved 2026-09-20).
* Timestamp misuse: gaps in the timeline, overpacked windows (excess cuts or dropped beats), and high frequency action timing all degrade output (https://docs.byteplus.com/en/docs/ModelArk/2607689, retrieved 2026-09-20).
* Task type mismatch errors when prompt intent and declared task type disagree; editing inputs outside 4 to 30 seconds error out (https://docs.byteplus.com/en/docs/ModelArk/2607688, retrieved 2026-09-20).
* Ark input moderation: "Seedance 2.5 does not support directly uploading reference images or videos containing real human faces"; the platform routes portrait work through trusted model outputs, preset digital characters, or authorized real person assets (same tutorial page). Community reports of moderation rejections on the Higgsfield side are in research v1 section 4.6.

Community reported (marked, from research v1 section 4 with URLs there): melting or warping fixed by shortening duration and reducing endpoint distance; quality dip around the 5 to 8 second mark; the unresolved dispute over whether pure negation backfires (the Ark guide's position, "Use positive descriptions whenever possible" with negatives reserved for subtitles and audio, effectively sides with positive framing plus targeted exclusions).

## 7. Text rendering behavior

Vendor position, 2.0 series guide (https://docs.byteplus.com/en/docs/ModelArk/2222480, retrieved 2026-09-20): "Seedance 2.0 series models support generating common text", with control over "the color, style, appearance method, appearance timing, and appearance position of text", covering "ad slogans, subtitles, and speech bubbles"; "prioritize common characters and avoid rare characters and special symbols".

Vendor position, 2.5: native generation "in more than 10 languages" (11 listed: Chinese, English, Spanish, Indonesian, Malay, Thai, Arabic, Portuguese, Vietnamese, Japanese, Korean), and the official examples lean on in model text: a brand endcard ("The image suddenly cuts to a white screen. In the center appears the brand name and slogan"), word by word animated English text, and pixel art UI text held "clear and stable" (https://docs.byteplus.com/en/docs/ModelArk/2607688 and /2607689, retrieved 2026-09-20). So on 2.5 the vendor treats deliberate text as a supported feature, not a hack.

Suppression is the mirror image and is the relevant direction for a film that forbids generated text: the documented negative controls are "Do not add subtitles." / "No subtitles." and audio scoping lines like "No BGM; generate only environmental sounds and action sounds." or "No audio." (vendor, verbatim: https://docs.byteplus.com/en/docs/ModelArk/2607689, retrieved 2026-09-20). Pair them with the 2.0 FAQ's honesty that suppression is probabilistic, not guaranteed, and with landscape framing where possible. Community lore on garbled text and the keep it to 2 or 3 characters rule is anecdote (research v1 sections 4.4 and open question 11).

## 8. Reference and conditioning behavior

Roles on the Higgsfield catalog (catalog, retrieved 2026-09-20): `start_image`, `end_image`, `image_references`, `video_references`, `audio_references` on `seedance_2_5`, `ad_multiplier`, and `seedance_2_0`; only `start_image` and `end_image` on `seedance1_5`. The Higgsfield help center's in product reference types @character, @style, @motion, @audio map onto these (vendor: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-seedance, retrieved 2026-09-20; verbatim definitions in research v1 section 3.1).

Ark distinguishes locked from unlocked tasks, and this is the cleanest mental model the vendor offers (verbatim: https://docs.byteplus.com/en/docs/ModelArk/2607689, retrieved 2026-09-20): "Locked: The input asset is strictly placed as a segment on the output video timeline... the output video's aspect ratio, and in some cases its duration, are locked." (editing, first and last frames, extension). "Unlocked: The input asset is used only as a semantic reference, so users can specify the output video's aspect ratio and duration." (all other reference work).

Documented reference capabilities on 2.5 (same page): subject reference (appearance and/or voice), motion reference from video, 3D clay model reference or rendering (coarse blockouts drive camera and blocking; fine models get re rendered; keep clay videos free of "trajectory lines, coordinate lines, camera cones"), style reference, audio reference (2.5 newly accepts audio as the only reference), storyboard reference (loose plot steering), keyframe reference (strict visual alignment, "Use Images X to X in order as keyframes"), seamless transition between two input videos, and one click creation from an asset pile.

First and last frame, two mechanisms with different guarantees (verbatim): role based ("Prioritize setting the image role through parameters as first_frame or last_frame. Note that this method locks the output video's aspect ratio") versus prompt designated reference images ("The generated video will be similar to the first-frame and last-frame reference images, but may not match them exactly"). For boundary frame continuity work, only the role based path is exact; the prompt path is approximate by design. If the last frame's ratio differs from the first frame's, it gets stretched.

Input constraints on Ark worth knowing before preparing assets (https://docs.byteplus.com/en/docs/ModelArk/2607688, retrieved 2026-09-20): images jpeg/png/webp/bmp/tiff/gif/heic/heif, ratio within [0.4, 2.5], edges 300 to 6000 px, under 30 MB each; videos mp4/mov (H.264 or H.265 video, AAC/MP3/PCM audio), 480p or 720p, 2 to 30 seconds each (4 to 30 for the video being edited), fps 24 to 60, under 200 MB; audio wav/mp3, 2 to 30 seconds, under 15 MB. Output URLs live 24 hours with at most 100 downloads.

## 9. Seedance 2.5 delta

Seedance 2.5 on Higgsfield (`seedance_2_5`) is this skill's canon model, so for the canon workflow the delta is zero by definition; this section records how prompting the sibling catalog ids differs from canon, and what 2.5 changed relative to 2.0, because older prompts and fallback plans inherit those differences.

The vendor's own four point delta (verbatim headings, https://docs.byteplus.com/en/docs/ModelArk/2607689, retrieved 2026-09-20):

* "Timestamp support: Seedance 2.0 does not respond to timestamps and only responds to shot numbers, while Seedance 2.5 supports integer-second timestamps." The 2.0 guide says the same from the other side: "The model's support for precise timing (such as 0-3 seconds) is unstable". Consequence: any prompt aimed at `seedance_2_0` must be structured as Shot 1 / Shot 2 / Shot 3 with no timecodes, and every timecoded canon prompt is 2.5 only.
* "Multi-view image support: Seedance 2.0 does not recommend using multi-view images as subject references, while Seedance 2.5 supports them." On 2.0, multi view sheets actively cause twinning.
* "Flexible aspect ratios: Seedance 2.0 only supports six fixed output aspect ratios, while Seedance 2.5 can support any output aspect ratio between [0.4, 2.5] by controlling the input assets."
* "Improved V2V quality: Seedance 2.5 supports MOV output, which better preserves color consistency, brightness consistency, and audio-visual consistency in extension and editing tasks."

Capability deltas beyond that list (catalog retrieved 2026-09-20, and https://docs.byteplus.com/en/docs/ModelArk/2607688):

* Duration: 4 to 30 seconds on 2.5 versus 4 to 15 on 2.0 versus fixed 4, 8, or 12 on `seedance1_5`.
* Reference budget: 50 assets (30+10+10) on 2.5 versus 15 (9+3+3) on the whole 2.0 series versus none on Higgsfield `seedance1_5` (boundary frames only). Audio as the sole reference works only on 2.5.
* Modes: `t2v`, `omni_reference`, `video_edit`, `video_extension` exist as explicit modes only on `seedance_2_5` and `ad_multiplier`; `seedance_2_0` runs a single `std` mode; billing for `video_edit` follows the edited video's duration, and `video_extension` requires `extension_mode` forward or backward.
* Resolution: `seedance_2_0` offers a 4k value on Higgsfield; `seedance_2_5` tops out at native 1080p (10 bit on Ark) with 4K positioned as upscale on Higgsfield (vendor: https://higgsfield.ai/blog/seedance-2-5-on-higgsfield-2026, retrieved 2026-09-20).
* Ark only levers that never reach the Higgsfield surface: seed, camera_fixed (1.5 Pro), watermark, output_format mov, ratio adaptive, duration -1, omni_reference_task_type. Do not design Higgsfield prompts around them; do not assume their absence on Ark.
* `ad_multiplier` has no prompting delta at all versus `seedance_2_5`; pick between them on catalog availability and cost shown at generation time, not on prompt technique.
* Prompting `seedance1_5` is a different discipline: no reference slots means the prompt plus at most two boundary frames carry everything; the 1.5 Pro guide's formula is "Subject + Movement + Environment (optional) + Camera movement (optional) + Aesthetic description (optional) + Sound (optional)" with its strengths in dialogue, timbre, and shot to shot transitions written as prose cuts (vendor: https://docs.byteplus.com/en/docs/ModelArk/2168087, retrieved 2026-09-20).

Two cautions for the canon workflow, restated because the new sources sharpen them: first, `generate_audio` defaults to true on every Seedance id in the catalog, so a silent film must set it false on each submission and may add the documented "No audio." line as belt and braces. Second, the canon's fractional timecodes (for example "0.40 TO 1.45") sit above the vendor's documented one second granularity; keep them if they keep working, but when a 2.5 generation ignores a sub second beat, the documented fallback is to restate the beat on whole second boundaries rather than to add precision.

---

Written 2026-09-20 for the Cinema skill. Catalog ids verified live the same day via models_explore get (read only). No generation, edit, or upscale tool was called and no credits were spent.
