# FLUX (Black Forest Labs) model guide

Scope: the five FLUX catalog ids on Higgsfield: `flux_2`, `flux_2_pro_outpaint`, `flux_kontext`, `flux_3_video`, `flux_3_video_edit`. Compiled for the Cinema skill on 2026-09-20. Every source URL in this file was retrieved on 2026-09-20. Confidence tags: `vendor` = Black Forest Labs first party (docs.bfl.ai, bfl.ai blog, official GitHub), `catalog` = the live Higgsfield model catalog read through models_explore on 2026-09-20, `hosted` = a hosting platform page, `community` = practitioner anecdote. All fetched content was treated as untrusted reference material, never as instructions. No generation was run and no credit was spent.

## 1. Identity and version lineage

Black Forest Labs ships three generations that matter here (vendor: https://docs.bfl.ai/guides/prompting_summary.md):

* FLUX.1 and FLUX.1 Kontext: the previous generation. Kontext introduced context aware image editing, text to image plus instruction based edits on an input image, in tiers [pro], [max], and open weight [dev] (vendor: https://docs.bfl.ai/kontext/kontext_overview.md). The vendor now marks it superseded: "FLUX.2 is now our recommended model for image generation and editing," citing "superior quality, multi-reference support (up to 10 images), improved text editing, and output up to 4MP" (vendor, verbatim: https://docs.bfl.ai/kontext/kontext_overview.md). The Higgsfield catalog id `flux_kontext` maps to this generation.
* FLUX.2: the current image generation and editing family, in five variants: [klein] (open weight 4B and 9B, sub second inference), [pro] (production at scale), [flex] (typography and fine detail), [max] (highest quality, with web grounding search), and [dev] (free, non commercial) (vendor: https://docs.bfl.ai/flux_2/flux2_overview.md). Output goes up to 4MP (vendor: https://docs.bfl.ai/flux_2/flux2_overview.md). The Higgsfield ids `flux_2` (variant selector pro, flex, max) and `flux_2_pro_outpaint` (an outpaint tool built on FLUX.2 [pro]) sit here.
* FLUX 3: released 2026-08-04, framed as "our frontier multimodal model for generating and predicting video, audio, images, and actions"; FLUX 3 Video shipped first, with FLUX 3 Image and an open weight FLUX 3 Dev announced as coming (vendor, verbatim: https://bfl.ai/blog/flux-3-video). The Higgsfield ids `flux_3_video` and `flux_3_video_edit` sit here. Note that FLUX Video Edit is technically a separate tool endpoint (`/v1/flux-tools/video-edit-v1`), not a mode of the FLUX 3 Video endpoint (vendor: https://docs.bfl.ai/flux_tools/flux_video_edit.md).

The vendor API distinguishes preview endpoints (latest improvements, for example `flux-2-pro-preview`) from stable pinned endpoints (`flux-2-pro`) for reproducibility (vendor: https://docs.bfl.ai/flux_2/flux2_overview.md). The Higgsfield catalog does not expose that distinction; which snapshot Higgsfield routes to is undocumented.

## 2. Availability and cost tier on Higgsfield

All figures below are read from the live Higgsfield catalog on 2026-09-20 (catalog: models_explore action get, per id). The catalog does not publish per generation credit prices for four of the five ids; exact credit numbers appear only at generation time in product. Never quote a credit price this file does not carry.

* `flux_2` (FLUX.2, image): variants pro, flex, max via a `variant` parameter (default pro); resolution `1k` or `2k` (default `1k`); aspect ratios 1:1, 4:3, 3:4, 16:9, 9:16; accepts image references. Tagged `unlim`, meaning it can accept free trial unlimited generations when an account has that allowance (catalog). No credit price stated in the catalog.
* `flux_2_pro_outpaint` (FLUX.2 Pro Outpaint, image): per side pixel expansion; a request that only crops "is served locally for free without the model" (catalog, verbatim description). No credit price stated for real expansions.
* `flux_kontext` (Flux Kontext, image): "Context-aware editing and style transfer"; no parameters exposed at all in the catalog; aspect ratios 1:1, 4:3, 3:4, 16:9, 9:16; accepts image references; tags include editing, style transfer, typography (catalog). No credit price stated.
* `flux_3_video` (FLUX 3 Video, video): duration 5 to 20 whole seconds (default 5), resolution 720p or 1080p (default 720p), `generate_audio` default true, aspect ratios auto, 21:9, 2:1, 16:9, 4:3, 1:1, 3:4, 9:16; media roles start_image, end_image, image_references, video_references (catalog). No credit price stated.
* `flux_3_video_edit` (FLUX 3 Video Edit, video): "Uses the first 15 seconds at most; costs 1 credit per second of the processed clip" (catalog, verbatim description). This is the only FLUX id whose credit cost the catalog states.

Vendor API prices exist but are BFL API prices in dollars, not Higgsfield credits: [klein] from $0.014 per image, [pro] $0.03 per MP, [max] from $0.07 per MP (vendor: https://docs.bfl.ai/flux_2/flux2_overview.md); Kontext [pro] $0.04 and [max] $0.08 per image (vendor: https://docs.bfl.ai/kontext/kontext_overview.md); FLUX Video Edit $0.03 per second of output (vendor: https://docs.bfl.ai/flux_tools/flux_video_edit.md). Do not convert these into Higgsfield credit estimates.

Surface mismatch, flagged: the vendor FLUX 3 Video API takes `resolution` as `hd`, `fhd`, `qhd`, `uhd` on a fixed grid of multiples of 32, with higher tiers produced by an upsampler (vendor: https://docs.bfl.ai/flux_3/flux3_video.md). The vendor grid for the three most used ratios:

| Aspect | hd | fhd | qhd | uhd |
| --- | --- | --- | --- | --- |
| 16:9 | 1280x704 | 1920x1088 | 2560x1440 | 3840x2176 |
| 1:1 | 960x960 | 1440x1440 | 1920x1920 | 2880x2880 |
| 9:16 | 704x1280 | 1088x1920 | 1440x2560 | 2176x3840 |

(vendor: https://docs.bfl.ai/flux_3/flux3_video.md). Higgsfield exposes only 720p and 1080p (catalog), the same two tiers fal exposes (hosted: https://fal.ai/learn/tools/how-to-use-flux-3). Treat qhd and uhd as unavailable through Higgsfield unless verified live, and note the launch blog itself says "Generates clips up to 20 seconds long in HD resolution, with Full HD output via upscaling" (vendor, verbatim: https://bfl.ai/blog/flux-3-video), so 1080p is an upscale, not native.

Variant selection inside `flux_2`, from the vendor's own positioning (vendor: https://docs.bfl.ai/flux_2/flux2_overview.md):

* pro: production grade generation at scale, the default on Higgsfield (catalog).
* flex: specialized for typography and fine detail; the pick when precise lettering matters.
* max: highest quality, and the only variant with web grounding, it "performs web searches to access real-time information" when a prompt needs current facts (vendor, verbatim: same URL).

## 3. Prompt structure the vendor prescribes

### 3.1 Images (FLUX.2 and Kontext generation)

The base rule is natural prose, not keyword lists: "FLUX works best when your prompt reads like a clear description of the image you want to generate" and "There is no single correct format — what matters is that your description gives FLUX enough to work with" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_unified_basics.md). The official BFL agent skills repo compresses the rules: "No negative prompts. FLUX doesn't support them; describe what you want instead." "Use natural language. Prose beats keyword lists." "Specify lighting. It has the biggest impact on quality." with the structure [Subject] + [Action] + [Style] + [Context] + [Lighting] + [Technical] (vendor, verbatim: https://github.com/black-forest-labs/skills). "Strong prompts usually come from iteration, not from trying to write the perfect prompt on the first attempt" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_unified_basics.md). English prompts are the most precise because most training data is English (vendor: https://docs.bfl.ai/guides/prompting_unified_basics.md).

For production automation, FLUX.2 also accepts JSON structured prompts: "Use JSON-structured prompts for precise control over generation — ideal for production workflows and automation," with fields such as subject, background, lighting, style, camera_angle, composition (vendor, verbatim: https://docs.bfl.ai/flux_2/flux2_text_to_image.md). Brand colors go in as hex: "Specify brand colors via hex codes with precision matching — no approximation" (vendor, verbatim: https://docs.bfl.ai/flux_2/flux2_overview.md).

### 3.2 Image edits (FLUX.2 editing and Kontext)

Edit prompts are instructions, not scene descriptions: "Be specific about what changes and explicit about what should stay the same" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_editing_single_reference.md). Preservation is stated in the prompt, for example "Replace the cherries in the right-most jar with multi-colored sprinkles. Change nothing else" (vendor example: same URL). Name subjects concretely instead of pronouns when several similar objects exist (vendor: same URL). Vague requests ("make it better", "improve the lighting") are called out as the failure pattern (vendor: https://docs.bfl.ai/guides/prompting_editing_multi_reference.md).

Kontext text editing has an exact syntax: "Replace '[original text]' with '[new text]'", and capitalization in the quoted string is respected (vendor, verbatim: https://docs.bfl.ai/kontext/kontext_image_editing.md). Kontext [pro] also "automatically acknowledges annotation boxes when included as part of `input_image`" and removes them from the output (vendor, verbatim: same URL).

### 3.3 Video (FLUX 3 Video)

The core stance: "Think of your prompt as directing a scene, not describing a collection of objects" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_video_text_to_video.md). The vendor prescribes three interchangeable formats (vendor: same URL):

1. Natural language one liner, the recommended default: `[camera] shot of [subject] [action] in [environment]. [supporting visual and motion details]`.
2. Structured labeled fields: separate lines for camera shot, subject plus action, depth of field, lighting plus palette, motion, style, so single elements can be tweaked between iterations.
3. Timestep prompting: contiguous time ranges with 2 to 3 beats per 5 second clip, transitions marked explicitly, for example "0.0–1.5s — locked wide of a still harbor at dawn" then further ranges, with hard cuts written into the text.

Length guidance: "Start short to explore an idea, then lengthen the prompt to lock in the details that matter. Add camera, motion, and atmosphere only where they improve control" and "Length alone is not the goal" (vendor, verbatim: same URL). Overstuffed prompts reduce motion coherence (vendor: same URL; restated hosted: https://fal.ai/learn/tools/how-to-use-flux-3).

Camera language: "Start with one framing term, one movement term, and one clear subject action. Too many camera instructions in a single sentence usually make the shot less readable" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_video_camera_terms.md). That page is the official vocabulary the model executes (vendor: same URL):

* Shot sizes: macro, extreme close up, close up, medium shot, cowboy shot, full shot, two shot, wide shot, establishing shot.
* Angles: aerial, low angle, high angle, POV, over the shoulder, Dutch angle, worm's eye, bird's eye, eye level, ground level, profile, object POV.
* Composition: leading lines, center framing, rule of thirds, symmetry, negative space, frame within frame, foreground occlusion, silhouette, reflection framing.
* Movements: pan, tilt, dolly in, tracking shot, orbit, crane, handheld, whip pan, dolly zoom, Steadicam follow, push through, Snorricam, camera roll, arc shot, pedestal, trucking, locked on.
* Focus: shallow depth of field, deep focus, rack focus, split diopter, focus breathing reveal, tilt shift.
* Optics: wide angle (24mm), telephoto compression, fisheye, anamorphic flares, macro lens, probe lens, halation, parallax, vignette.
* Shutter and time: slow motion, speed ramp, timelapse, long exposure look, bullet time, freeze frame, step printing, fast motion, cinemagraph.

Audio: sound is prompted as part of the shot. "Name the sound source you want rather than asking for silence" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_video_audio.md). Dialogue goes in quotation marks attached to a described speaker; "A visible speaker gives FLUX 3 a face to lip-sync. An off-screen voice needs a clear `voiceover` or `narration` cue" (vendor, verbatim: same URL).

Multi shot inside one generation: cap it at 2 to 3 shots per prompt, write the cut explicitly (the cookbook uses "HARD CUT"), and make consecutive shots differ strongly, because "scale is the strongest kind of difference: macro to wide to aerial reads as three deliberate cuts, where three similar angles blend into one drifting take" (vendor, verbatim: https://docs.bfl.ai/cookbook/video_multishot_films.md). For longer films the vendor recipe is a shot pipeline: one beat per shot, generate shots separately, cut in an editor, and carry continuity with a world bible, "One paragraph describing the world (place, palette, light, film grade) pasted into every shot prompt word for word" (vendor, verbatim: same URL).

### 3.4 Video edits (FLUX 3 Video Edit)

"An edit prompt describes a change, not a shot." What the prompt does not mention stays as it was in the source, including audio (vendor, verbatim: https://docs.bfl.ai/guides/prompting_video_editing.md). Phrasing order: name the change first, then placement, then appearance detail only where the edit needs it, then behavior. For dialogue replacement, "The new line can only be as long as the speech it replaces"; longer lines are truncated (vendor, verbatim: same URL). For stacked changes, edit iteratively: run one edit, use its output as the next input, rather than piling instructions into one prompt (vendor: same URL).

## 4. Parameters that change output

### 4.1 On Higgsfield (catalog, 2026-09-20)

* `flux_2`: `variant` (pro, flex, max; default pro), `resolution` (`1k`, `2k`; default `1k`), aspect ratio (five options), image references. No seed, no steps, no guidance exposed.
* `flux_2_pro_outpaint`: `expand_top`, `expand_bottom`, `expand_left`, `expand_right`, each a pixel count from -8192 to 2048 with default 0; negative values crop that side instead of expanding; `folder_id` optional. No prompt parameter is listed in the catalog, matching the vendor tool, which extends the scene without requiring a prompt (catalog; vendor: https://docs.bfl.ai/flux_tools/flux_outpainting.md).
* `flux_kontext`: no parameters at all beyond prompt, aspect ratio, and image references (catalog). The vendor API for Kontext carries more (seed, `prompt_upsampling`, `safety_tolerance` 0 to 6, `aspect_ratio` from 3:7 to 7:3, input up to 20MB or 20MP, output about 1MP) (vendor: https://docs.bfl.ai/kontext/kontext_image_editing.md), but none of that surfaces through the Higgsfield catalog, so treat Higgsfield Kontext as prompt only.
* `flux_3_video`: `duration` 5 to 20 whole seconds (default 5), `resolution` 720p or 1080p (default 720p), `generate_audio` (default true; the film is silent, so switch it off for Cinema work), eight aspect ratios including auto, 21:9 and 2:1, plus media roles start_image, end_image, image_references, video_references (catalog). No seed and no fps parameter on any surface: the vendor exposes no per parameter fps setting (vendor: https://docs.bfl.ai/flux_3/flux3_video.md) and output normalizes to 24 fps (vendor: https://docs.bfl.ai/flux_tools/flux_video_edit.md).
* `flux_3_video_edit`: prompt plus one video reference plus optional `folder_id`; everything else follows the source: "Duration, resolution and aspect ratio follow the source and cannot be set" (vendor, verbatim: https://docs.bfl.ai/flux_tools/flux_video_edit.md). Higgsfield truncates input to the first 15 seconds (catalog), matching the vendor cap of 15 seconds and 50 MiB (vendor: same URL).

### 4.2 Vendor API parameters not surfaced on Higgsfield (for awareness, not for use)

The BFL FLUX 3 Video endpoint additionally has: `keyframes` (one image = exact opening frame; two pin start and end; up to ten frames pinned to timestamps become a storyboard, timestamped and multi keyframe requests require an explicit `duration`), `start_video` for continuation (the launch blog: provide "up to four seconds of existing video and audio and tell it what should happen next"), `draft` (fast HD preview that returns a `draft_cache`) and `draft_enhance` (reproduce a chosen draft at full quality without re prompting), `safety_tolerance` 0 to 4, and duration `auto` (vendor: https://docs.bfl.ai/flux_3/flux3_video.md ; https://bfl.ai/blog/flux-3-video). Whether Higgsfield's start_image, end_image and image_references roles map onto the keyframes array internally is undocumented; the catalog roles are the contract to trust on Higgsfield.

## 5. Documented best practices

* Iterate small: start with the shortest prompt that states subject and action, then add camera, motion, atmosphere only where control is needed (vendor: https://docs.bfl.ai/guides/prompting_video_text_to_video.md ; https://docs.bfl.ai/guides/prompting_unified_basics.md).
* One framing term, one movement term, one subject action per sentence (vendor: https://docs.bfl.ai/guides/prompting_video_camera_terms.md).
* Concrete verbs and physical cause and effect beat adjectives: "footsteps sink deep into sand, kicking up small clouds" is the model of a good motion line (vendor: https://docs.bfl.ai/guides/prompting_video_text_to_video.md). fal restates the BFL principle as "Direct the scene, don't inventory the objects in it" (hosted: https://fal.ai/learn/tools/how-to-use-flux-3).
* Subject consistency across shots comes from "a fixed description held identically across shots, so identity stays consistent", pasted word for word, never paraphrased (vendor, verbatim: https://docs.bfl.ai/guides/prompting_video_text_to_video.md ; reinforced by the world bible rule in https://docs.bfl.ai/cookbook/video_multishot_films.md).
* Draft first, enhance the winner: draft mode renders a fast preview and a `draft_cache`; enhancing reproduces that exact draft at full quality with no prompt field at all, so iteration is cheap and the final is deterministic against the chosen draft (vendor: https://docs.bfl.ai/flux_3/flux3_video.md ; hosted framing: https://fal.ai/learn/tools/how-to-use-flux-3). Drafts always render at hd; combining `draft: true` with other resolutions is rejected (vendor: https://docs.bfl.ai/flux_3/flux3_video.md). Whether Higgsfield exposes draft mode is unconfirmed; do not assume it.
* For edits, keep prompts minimal and preservation explicit; run multiple edits as sequential passes on each intermediate result (vendor: https://docs.bfl.ai/guides/prompting_video_editing.md ; https://docs.bfl.ai/guides/prompting_editing_single_reference.md).
* Photorealism styling: name camera bodies, lenses, film stocks ("Shot on Fujifilm X-T5, 35mm f/1.4") instead of the word professional (vendor: https://docs.bfl.ai/guides/prompting_unified_style.md).

## 6. Known failure modes

Vendor documented:

* Overstuffed prompts reduce motion coherence; conflicting constraints (static and dynamic at once) and vague unanchored description are the named antipatterns (vendor: https://docs.bfl.ai/guides/prompting_video_text_to_video.md ; https://docs.bfl.ai/guides/prompting_video_overview.md).
* Multi angle clips blend into one drifting take when consecutive shots are too similar; the fix is explicit hard cut language plus strong scale contrast between shots (vendor: https://docs.bfl.ai/cookbook/video_multishot_films.md).
* Interpolation between unrelated boundary frames fails: "Keep the two frames related — same subject, scene, or camera setup — so the interpolation has a plausible path between them" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_video_image_to_video.md). Wider spacing between pinned frames grants freedom but increases unpredictability (vendor: same URL).
* Audio failures and fixes are tabulated by the vendor (vendor: https://docs.bfl.ai/guides/prompting_video_audio.md):

| Problem | Vendor fix |
| --- | --- |
| A spoken line renders as on screen text | Name a visible speaker or say voiceover; add "no on-screen text" |
| Sounds like an advertisement | Replace praise words with person, recording setup, social situation |
| Sing song cadence | Simplify punctuation, remove repetitive sentence shapes |
| Last word cut off | Shorten the line or extend duration |
| Generic soundscape | Name each sound source and connect effects to visible actions |
* Video Edit hard limits: sources over 720p are downscaled; sides under 160 px or fewer than 17 frames after 24 fps normalization fail; a video as style or motion reference, image input, audio only input, masks, and extending a clip are all unsupported (vendor: https://docs.bfl.ai/flux_tools/flux_video_edit.md).
* Outpainting: canvas capped at 4MP; fast mode rejects URLs, requires the reference at 64 px or more per side and at most 8:1 aspect, and needs headroom under 4MP for alignment padding (vendor: https://docs.bfl.ai/flux_tools/flux_outpainting.md).
* Moderation is a terminal state: `Request Moderated` and `Content Moderated` end a job (vendor: https://docs.bfl.ai/flux_3/flux3_video.md).
* Negative prompts do not exist on FLUX: "No negative prompts. FLUX doesn't support them; describe what you want instead" (vendor, verbatim: https://github.com/black-forest-labs/skills). Do not port Seedance style exclusion blocks as bare negations; restate them as positive statements of what is true in the frame.

Community and hosted reported:

* Identity drift across keyframe sequences when the subject description is not repeated verbatim in every segment (hosted, fal's practitioner note: https://fal.ai/learn/tools/how-to-use-flux-3).
* Abstract audio cues ("held breath", "subsonic notes") are where the audio pass has least to work with (hosted: https://fal.ai/learn/tools/how-to-use-flux-3).

## 7. Text rendering behavior

Text is a first class FLUX strength, the opposite of the Seedance situation. FLUX.2 claims "Reliable text rendering for infographics, UI mockups, and marketing materials" (vendor, verbatim: https://docs.bfl.ai/flux_2/flux2_overview.md), the [flex] variant is specialized for typography, and FLUX 3 Video renders "legible, well-placed text rendered as part of the scene" and can "render typography as a natural part of the scene" (vendor, verbatim: https://docs.bfl.ai/flux_3/flux3_video.md ; https://bfl.ai/blog/flux-3-video). The prescribed method: enclose the exact string in quotation marks, describe placement, name the font style, use hex codes for color, and "Keep text short — long strings are harder to render accurately" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_unified_style.md). Kontext edits existing text with the "Replace '[original text]' with '[new text]'" syntax (vendor: https://docs.bfl.ai/kontext/kontext_image_editing.md), and Video Edit can change text on objects in a clip (vendor: https://docs.bfl.ai/flux_tools/flux_video_edit.md).

Cinema skill caution: the canon forbids all generated text. Because FLUX renders quoted strings eagerly, never put quotation marks around any phrase in a FLUX prompt unless text on screen is wanted; quoted words also become spoken dialogue in FLUX 3 Video (vendor: https://docs.bfl.ai/guides/prompting_video_audio.md). Keep the existing "no text, no captions, no logos" line, phrased positively where possible, and strip any quoted phrases from ported Seedance prompts.

## 8. Reference and conditioning behavior

* FLUX.2 image editing takes multiple references, "up to 8 via API, up to 10 in the playground" ([klein] up to 4), addressed in the prompt by number: "image 1", "image 2", as in "Change image 1 to match the style of image 2" (vendor: https://docs.bfl.ai/flux_2/flux2_image_editing.md ; https://docs.bfl.ai/guides/prompting_editing_multi_reference.md). A real budget applies: "[pro] API has a 9MP total limit for input + output. At 1MP output you can use up to 8 reference images, at 2MP output up to 7, and so on" (vendor, verbatim: https://docs.bfl.ai/guides/prompting_editing_multi_reference.md). Reference roles in practice: content source, scene container, style reference, material source (vendor: same URL). "More reference images means more control" for character consistency and compositing (vendor, verbatim: https://docs.bfl.ai/guides/prompting_editing_overview.md), which is the opposite emphasis from the Seedance community's fewer references discipline; on FLUX the references are addressed and budgeted per image, so contradictions are the risk, not count.
* Character consistency on FLUX.2 is reference driven: provide reference images of the character, describe the new scene, and anchor identity relationally ("The couple from Image 2 is now standing in the middle of the street of Image 1"), stating what stays constant (vendor: https://docs.bfl.ai/guides/usecases_editing_character_consistency.md).
* FLUX 3 Video conditioning is keyframe based: one image is "The exact opening frame; the prompt animates forward"; two images are "The first and last frame; FLUX 3 fills the motion between"; three or more are "Ordered waypoints the shot passes through in turn", up to ten, pinnable to timestamps as a storyboard (vendor, verbatim: https://docs.bfl.ai/guides/prompting_video_image_to_video.md ; https://docs.bfl.ai/flux_3/flux3_video.md). On Higgsfield this appears as the start_image, end_image, image_references and video_references roles on `flux_3_video` (catalog). Continuation conditions on up to four seconds of existing video and audio (vendor: https://bfl.ai/blog/flux-3-video).
* FLUX 3 Video Edit takes exactly one video and no other conditioning: no style video, no image input, no masks (vendor: https://docs.bfl.ai/flux_tools/flux_video_edit.md).
* Outpaint conditions on the input image alone and "extends the existing scene naturally" without a prompt (vendor: https://docs.bfl.ai/flux_tools/flux_outpainting.md); on Higgsfield the per side expand parameters are the whole interface (catalog).

## 9. Seedance 2.5 delta: how prompting FLUX differs from the skill's canon model

The Cinema skill canon is Seedance 2.5 on Higgsfield (see docs/from-desert-to-oasys/from-desert-to-oasys-prompting-research-v1.md). The deltas that change how you write a prompt:

1. Format. Seedance 2.5's official structure is one labeled section block (GLOBAL STYLE, SCENE, CHARACTERS, LOCATION, FIRST FRAME AND BLOCKING, SHOT BY SHOT BREAKDOWN, OPTICS, PHYSICS, LIGHTING, AUDIO) (official Higgsfield: https://higgsfield.ai/blog/seedance-2-5-prompting-guide). FLUX 3 has no such canonical block; it prescribes three looser formats (one liner, labeled fields, timestep) and warns that overstuffing hurts coherence (vendor: https://docs.bfl.ai/guides/prompting_video_text_to_video.md). A canon Seedance block ported wholesale to FLUX is an overstuffed prompt; carry over the content but compress to labeled fields or a timestep list.
2. Timecodes survive the port. Both models accept absolute time ranges with hard cuts written in text (Seedance: https://higgsfield.ai/blog/seedance-2-5-prompting-guide ; FLUX: https://docs.bfl.ai/guides/prompting_video_text_to_video.md). FLUX caps a single generation at 20 seconds versus Seedance 2.5's 30, and the vendor caps in prompt cutting at 2 to 3 shots per generation (vendor: https://docs.bfl.ai/cookbook/video_multishot_films.md ; https://docs.bfl.ai/flux_3/flux3_video.md).
3. References work differently. Seedance 2.5 takes up to 50 multimodal references addressed as @character, @style, @motion or [Image1] labels (official: https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5 ; https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-seedance). FLUX addresses image references as "image 1", "image 2" with a megapixel budget on the image side, and on the video side conditions through ordered keyframes rather than role tagged assets (vendor: https://docs.bfl.ai/guides/prompting_editing_multi_reference.md ; https://docs.bfl.ai/guides/prompting_video_image_to_video.md). There is no @ syntax on FLUX.
4. Negation is off the table. The Seedance canon reconciles positive locks with targeted exclusions; FLUX states flatly that negative prompts are unsupported and everything must be described positively (vendor: https://github.com/black-forest-labs/skills). Convert every HARD EXCLUSIONS line into a positive lock before using it on FLUX; the audio guide's one sanctioned negative shape ("no announcer delivery", "no on-screen text") is a guardrail clause inside a positive description, not a negative prompt (vendor: https://docs.bfl.ai/guides/prompting_video_audio.md).
5. Quotation marks are live syntax on FLUX. On Seedance, quoted lines drive lip sync; on FLUX they drive both spoken dialogue and rendered typography (vendor: https://docs.bfl.ai/guides/prompting_video_audio.md ; https://docs.bfl.ai/guides/prompting_unified_style.md). For the silent, text free canon film: no quoted strings anywhere, and `generate_audio` off (default is on, both surfaces: catalog; vendor: https://docs.bfl.ai/flux_3/flux3_video.md).
6. Determinism levers differ. Neither surface exposes seed on Higgsfield video (Seedance research: https://github.com/higgsfield-ai/cli/blob/main/MODELS.md ; FLUX catalog: no seed parameter). Seedance determinism comes from shared boundary frames; FLUX adds the draft cache path, where an approved draft is reproduced exactly at full quality (vendor: https://docs.bfl.ai/flux_3/flux3_video.md). The shared boundary frame method itself ports cleanly: FLUX start plus end keyframes are the same lever, with the same requirement that the two frames be closely related (vendor: https://docs.bfl.ai/guides/prompting_video_image_to_video.md).
7. Repair paths differ. Seedance 2.5 offers region edit, point at one object and fix only that (official: https://higgsfield.ai/blog/seedance-2-5-on-higgsfield-2026). FLUX Video Edit is prompt scoped, not region scoped: it changes what the prompt names and preserves the rest, with no masks (vendor: https://docs.bfl.ai/flux_tools/flux_video_edit.md). On Higgsfield it costs 1 credit per second of the processed clip and reads only the first 15 seconds (catalog), so trim to the defect window before editing.
8. Camera language is compatible but leaner on FLUX. Seedance 2.5 guidance wants physical rigs, distances and lens degrees with per segment LENS LOCK (official: https://higgsfield.ai/blog/seedance-2-5-prompting-guide); FLUX wants one framing term plus one movement term per sentence from its cheatsheet vocabulary (vendor: https://docs.bfl.ai/guides/prompting_video_camera_terms.md). Port the intent, not the density.

## 10. Source list

All retrieved 2026-09-20. Vendor: https://docs.bfl.ai/llms.txt ; https://docs.bfl.ai/flux_3/flux3_video.md ; https://docs.bfl.ai/guides/prompting_video_overview.md ; https://docs.bfl.ai/guides/prompting_video_text_to_video.md ; https://docs.bfl.ai/guides/prompting_video_image_to_video.md ; https://docs.bfl.ai/guides/prompting_video_editing.md ; https://docs.bfl.ai/guides/prompting_video_audio.md ; https://docs.bfl.ai/guides/prompting_video_camera_terms.md ; https://docs.bfl.ai/cookbook/video_multishot_films.md ; https://docs.bfl.ai/flux_2/flux2_overview.md ; https://docs.bfl.ai/flux_2/flux2_text_to_image.md ; https://docs.bfl.ai/flux_2/flux2_image_editing.md ; https://docs.bfl.ai/kontext/kontext_overview.md ; https://docs.bfl.ai/kontext/kontext_image_editing.md ; https://docs.bfl.ai/flux_tools/flux_video_edit.md ; https://docs.bfl.ai/flux_tools/flux_outpainting.md ; https://docs.bfl.ai/guides/prompting_summary.md ; https://docs.bfl.ai/guides/prompting_unified_basics.md ; https://docs.bfl.ai/guides/prompting_unified_style.md ; https://docs.bfl.ai/guides/prompting_editing_overview.md ; https://docs.bfl.ai/guides/prompting_editing_single_reference.md ; https://docs.bfl.ai/guides/prompting_editing_multi_reference.md ; https://docs.bfl.ai/guides/usecases_editing_character_consistency.md ; https://bfl.ai/blog/flux-3-video ; https://github.com/black-forest-labs/skills. Catalog: Higgsfield models_explore, action get, ids flux_2, flux_2_pro_outpaint, flux_kontext, flux_3_video, flux_3_video_edit, read 2026-09-20. Hosted: https://fal.ai/learn/tools/how-to-use-flux-3. Not reachable: the legacy Kontext guide URL https://docs.bfl.ai/guides/prompting_guide_kontext_i2i returned 404; its content now lives in the prompting_editing pages cited above.
