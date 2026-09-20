# Model guides index

Thirteen model family guides compiled 2026-09-20 for the Cinema skill, research only, zero credits spent. The canon video model remains Seedance 2.5 on Higgsfield; nothing in this directory licenses a substitute model for canon scenes. Each guide covers identity and lineage, availability and cost tier, vendor prescribed prompt structure, parameters, best practices, failure modes, text rendering, conditioning behavior, and a Seedance 2.5 delta section stating exactly how prompting that family differs from canon. The cross model synthesis of those delta sections lives in `../prompt-cookbook.md` section 10.

## The families, one line each

* **Seedance (ByteDance video)**, `seedance.md`: the canon. Reach for it for every scene generation, targeted video edit, and extension in the canon workflow; the guide adds the official Ark documentation, the four modes, and the 2.0 and 1.5 fallbacks.
* **Seedream stills and ByteDance upscalers**, `seedream.md`: the still factory feeding the video canon. Reach for it to author or repair boundary frames, character sheets, and look plates, and to upscale approved stills.
* **Kling (Kuaishou)**, `kling.md`: the second opinion video family. Reach for it when a shot wants an external multi shot editor, Elements identity persistence, or start plus end frame chaining outside the canon (kling3_0 only).
* **Google video (Veo and Gemini Omni)**, `google-video.md`: 8 second Veo shots and conversational Omni editing. Reach for Veo when a beat fits one dense cinematic paragraph, and for Omni when iterative instruction editing beats regeneration; `veo3_1_lite` is the only Google id with an audio off default.
* **MiniMax and Hailuo**, `minimax.md`: two dialects in one family. Reach for legacy Hailuo when bracket camera commands are wanted, and H3 for reference driven work, remembering keyframes and references are mutually exclusive there.
* **Wan (Alibaba)**, `wan.md`: the only family matching the canon's 30 second single pass (wan3_0). Reach for it for long takes, document conditioned generation, and the thinking toggle; write "Generate single shot." for continuous shots.
* **FLUX (Black Forest Labs)**, `flux.md`: image editing with typography strength plus FLUX 3 video with up to ten keyframe waypoints. Reach for it for multi reference still compositing and storyboard driven video; negative prompts do not exist here.
* **Nano Banana (Google Gemini image)**, `nano-banana.md`: the canon's still repair layer. Reach for `nano_banana_2` with a mask and `is_inpaint` for surgical boundary still fixes, and Pro for finishing and typography assets.
* **OpenAI (GPT Image and Sora)**, `openai.md`: GPT Image for title cards, diagrams, and text bearing assets with the change only X edit discipline; Sora and Sora 2 are off catalog and watermarked, never finished frames.
* **Runway and Luma**, `runway-luma.md`: off catalog alternates on their own platforms. Reach for the guide when porting knowledge: Runway's motion first minimal prompting and fixed seed, Luma's keyframes by generation id.
* **Pika, Midjourney, and Grok**, `pika-midjourney-grok.md`: Grok is the only reachable family here; `grok_video_v15` carries the strongest vendor documented last frame contract off canon. Pika and Midjourney are off catalog, for effect menus and image first animation on their own platforms.
* **Higgsfield native (Cinema Studio, Soul, Genjutsu, presets)**, `higgsfield-native.md`: parameters replace prose. Reach for Soul stills as hero frames, Soul Cast and Elements for persistent identity, Genjutsu for motion transfer and object swap, and presets for one move camera clips.
* **Utility and finishing pipeline**, `utility-pipeline.md`: everything that runs before, beside, or after a generation. Reach for it for upscale, deflicker, segmentation, lipsync, outpaint, background removal, and asset generators; after an approval gate, only precision tier finishing may touch the frames.

## Higgsfield catalog map

Every catalog id covered by these guides, mapped to its family file. On 2026-09-20 the live catalog comprised 74 ids, 40 video and 34 image, and every one appears below. The live catalog is authoritative for what is submittable; ids drift, so verify with a catalog read before planning a job.

| Catalog id | Guide file |
| --- | --- |
| `seedance1_5` | seedance.md |
| `seedance_2_0` | seedance.md |
| `seedance_2_5` | seedance.md |
| `ad_multiplier` | seedance.md |
| `seedream_v4_5` | seedream.md |
| `seedream_v5_lite` | seedream.md |
| `seedream_v5_pro` | seedream.md |
| `bytedance_image_upscale` | seedream.md |
| `bytedance_video_upscale` | seedream.md |
| `kling2_6` | kling.md |
| `kling3_0` | kling.md |
| `kling3_0_turbo` | kling.md |
| `kling_video_edit` | kling.md |
| `kling_omni_image` | kling.md |
| `veo3` | google-video.md |
| `veo3_1` | google-video.md |
| `veo3_1_lite` | google-video.md |
| `gemini_omni` | google-video.md |
| `gemini_omni_flash_1_1` | google-video.md |
| `minimax_hailuo` | minimax.md |
| `minimax_h3` | minimax.md |
| `minimax_h3_max` | minimax.md |
| `wan2_6` | wan.md |
| `wan2_7` | wan.md |
| `wan3_0` | wan.md |
| `wan3_0_prime` | wan.md |
| `flux_2` | flux.md |
| `flux_2_pro_outpaint` | flux.md |
| `flux_kontext` | flux.md |
| `flux_3_video` | flux.md |
| `flux_3_video_edit` | flux.md |
| `nano_banana` | nano-banana.md |
| `nano_banana_pro` | nano-banana.md |
| `nano_banana_2` | nano-banana.md |
| `nano_banana_2_lite` | nano-banana.md |
| `nano_banana_2_shots` | nano-banana.md (undocumented alias id) |
| `gpt_image_2` | openai.md |
| `gpt_image_2_5` | openai.md |
| `openai_hazel` | openai.md |
| `grok_video` | pika-midjourney-grok.md |
| `grok_video_v15` | pika-midjourney-grok.md |
| `grok_image` | pika-midjourney-grok.md |
| `grok_image_2_0` | pika-midjourney-grok.md |
| `cinematic_studio_3_0` | higgsfield-native.md |
| `cinematic_studio_video` | higgsfield-native.md |
| `cinematic_studio_video_v2` | higgsfield-native.md |
| `cinematic_studio_2_5` | higgsfield-native.md |
| `soul_2` | higgsfield-native.md |
| `soul_cinematic` | higgsfield-native.md |
| `soul_cast` | higgsfield-native.md |
| `soul_location` | higgsfield-native.md |
| `hf_mult_motion_control` | higgsfield-native.md |
| `hf_mult_replace_object` | higgsfield-native.md |
| `higgsfield_preset` | higgsfield-native.md |
| `image_auto` | higgsfield-native.md (router, not a model) |
| `soul_v2` | higgsfield-native.md (duplicate of `soul_2`) |
| `topaz_video` | utility-pipeline.md |
| `topaz_image` | utility-pipeline.md |
| `topaz_image_generative` | utility-pipeline.md |
| `video_upscale` | utility-pipeline.md |
| `video_deflicker` | utility-pipeline.md |
| `sam_3_video` | utility-pipeline.md |
| `video_background_remover` | utility-pipeline.md |
| `image_background_remover` | utility-pipeline.md |
| `sync_so` | utility-pipeline.md |
| `outpaint` | utility-pipeline.md |
| `recraft_v4_1` | utility-pipeline.md |
| `z_image` | utility-pipeline.md (full entry) and wan.md (family note) |
| `autosprite` | utility-pipeline.md |
| `happy_horse_video` | utility-pipeline.md |
| `clipify` | utility-pipeline.md |
| `marketing_studio_video` | utility-pipeline.md |
| `marketing_studio_image` | utility-pipeline.md |
| `ms_image` | utility-pipeline.md |

Off catalog families, documented for comparison and for work on their own platforms only: Runway Gen-3, Gen-4, and Gen-4.5 and Luma Dream Machine with Ray (`runway-luma.md`); Pika and Midjourney video (`pika-midjourney-grok.md`); Sora and Sora 2 (`openai.md`). Live catalog searches for each returned zero items on 2026-09-20.
