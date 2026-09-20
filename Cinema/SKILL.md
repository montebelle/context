---
name: cinema
description: Take any concept to a finished AI generated film on Higgsfield plus Seedance using scene level generation, targeted edits, and watch at speed approval.
---

# Cinema

Distilled from a real production: a 30 second brand film ("From Desert to OASYS") made entirely on Higgsfield with Seedance 2.5 for video and still models for references and repairs, roughly 970 credits spent across two long sessions. Every approved second of film came from the simple path below. Roughly 600 of those credits went to schemes that abandoned it. This file teaches the path; the reference files hold the proof.

## The spine, non negotiable

* The unit of generation is the whole scene: one continuous 5 to 6 second cinematic take with internal acting beats, generated in a single job. A scene generated as one continuous take has cinematic flow for free: camera energy, acting continuity, physical light, believable transitions. That flow cannot be assembled afterward from parts.
* Prompts are natural chronological prose of roughly 350 words: timestamped beats in story order, camera as a physical event with lens, path, and easing, one compact negative block at the end. Long labeled constraint walls made outputs worse every time they were tried. See references/prompt-cookbook.md.
* Approved footage is absolute authority. A named defect gets a targeted edit on the approved source: video_edit with the source clip as authority and one named change, or a masked still edit of one region. Never regenerate a locked scene from scratch.
* NEVER fragment a scene into per shot generations and assemble the film from defect picked windows. This was tried at full scale. Every fragment passed its audit individually and the assembled film was rejected outright ("this is absolutely terrible and the worst thing I have ever seen, the original approved full video was way better"). The audits measured identity, props, text, and geography; none of them measured whether it moves like cinema. About 330 credits burned. This is the documented core failure. See references/failure-catalog.md.

## Method flow

### 1. Concept
One emotional journey a viewer can follow with zero words. Map every business idea to a physical story element (a metaphor map: character, obstacle, destination, reward). Decide at concept time what must NEVER appear (fire, readable text, logos, extra characters, competing creatures); these become the standing negative block for the whole production.

### 2. Canon one pager
Write one page before any spend: story beats per scene, the character described in words, palette, light direction, travel direction, lens system, prop ownership (who holds what and when), locked title copy, and the banned list. Every later prompt quotes this page. When the director corrects it, mark superseded material explicitly, or stale frames and stale copy will be reused by accident. File and asset names containing approved, final, or lock never override a later rejection; the latest direct ruling always wins.

### 3. Reference stills, credit free or cheap
Build and get approved before any video spend:

* Character turnaround: one hero character, isolated, neutral background. A group image is a weak identity reference and never locks a recurring hero.
* Expression sheet: the permitted acting range, so faces perform instead of holding one smile.
* Look plate: geography, palette, atmosphere, scale, light direction, SCRUBBED of anything that must never appear. Every element in a conditioning image is an invitation: a look plate that contains a phoenix and grape clusters leaks phoenixes and grapes into every wide shot no matter what the prompt forbids.
* Boundary stills: the exact composition that ends one scene and begins the next, chained across the film (scene 1 end is scene 2 start). Once footage exists, boundaries must be actual frames extracted from approved clips, never storyboard art; storyboard boundaries that do not match the real footage force environment morphs and duplicate characters.

Each reference gets exactly one responsibility, stated in the prompt with an exclusion clause: "@Mascot controls identity, proportions, materials, and costume only. It does not control pose, camera, or background."

### 4. Scene generations
One scene at a time, in story order. On Higgsfield: seedance_2_5, mode omni_reference, 6 seconds, 16:9, 480p, audio off. Conditioning: the previous boundary as start_image, the next boundary as end_image, the identity references as image_references. Preflight the exact payload, report the exact cost and live balance, wait for explicit approval, submit once, poll the same job id until done. Mechanics: references/higgsfield-ops.md.

### 5. Per scene approval
WATCH THE CLIP AT NORMAL SPEED FIRST. That viewing is the acceptance judgment; frame analysis never replaces it. Then check only the named risks in frames: the defects this specific prompt was likely to produce (prop hands, text surfaces, the waterline, the boundary match). Reject with a precisely named defect or approve. Completion is never acceptance, and a rejected result is never presented as progress.

### 6. Targeted edits, named defects only
One defect, one edit, on the approved source.

* Video: video_edit with the source clip declared "the absolute authority for all motion, timing, camera work, framing" and exactly one named change ("Change only the white water bird into the approved full body phoenix. Do not rebuild or restage the shot.").
* Stills: a masked edit of one region at a time (Nano Banana Pro Inpaint), or a deterministic composite painted with an image tool (no model, zero credits, cannot drift). Full frame generative repair of a still always drifts something unrelated.
* Fix at the cheapest layer first: a 2 credit still edit beats a 15 credit video retry, and a corrected boundary still beats a rerendered scene.
* A retry changes ONE variable (prompt or reference set, never both) with a fresh cost approval. When a beat keeps failing (a held prop, a count of objects), delete the beat rather than retrying it.

### 7. Assembly of whole scenes
Retime complete clips into their slots; never trim away the designed boundary frames, because the shared boundary frame is the match cut. Direct cuts only, no dissolves (dissolves ghost characters and props). Judge every cut at the seam inside the assembled film, then watch the whole film at normal speed as cinema. Local tools (ffmpeg) are for trims, concatenation, frame extraction, upscaling approved picture, and measurement, never for pixel level compositing on footage.

### 8. Titles and audio in post
All text is composited in the edit over clean picture: titles, taglines, prop lettering, tool artwork. In model text always garbles, so the model renders clean physical surfaces and post supplies the typography. Leave title safe negative space in the frame plan. Titles never sit in boxes; contrast is a luminance problem, not a font weight problem. Audio is a separate post decision made late; a silent master is a legitimate deliverable.

## Verification, lightweight

* First gate: the eye at speed. Watch at normal playback before any frame work, every time.
* Second gate: named risks only. Extract frames around the risk points (boundaries, prop interactions, text surfaces, waterlines). Do not run a full forensic audit on every take.
* Boundary check: compare the join frame against its conditioning frame, eyeball first, SSIM when in doubt.
* Contact sheets hide what full resolution reveals (title wraps, fine marks, small morphs); check anything fine at full resolution, and remember scene detection misses two frame morphs.
* An independent second viewing (fresh eyes or a second model pass) catches what the maker's own checklist stops short of.

## Credit discipline

* Exact preflight before every spend: estimate_video_cost or estimate_image_cost on the exact payload returns the exact price and submits nothing. Costs are flat and deterministic per resolution and duration.
* Per spend approval: report cost, current balance, projected balance; wait for an explicit yes; one approval covers exactly one job. Live costs are read fresh; historical estimates are never reused.
* 480p is the draft tier (18 credits per 6 second scene). Go to 720p only when a named fine detail cannot be judged at 480p. Master resolution comes from a zero credit local upscale of approved picture; no generative upscaler is needed.
* One job in flight; poll the same job id; never resubmit a slow job; confirm every charge by balance difference.
* Never batch before the first item passes inspection. A blind batch always loses; the disciplined loop never produced a batch loss and every drift from it did.

## The laws, one line each

Full statements with their evidence cases: references/laws.md.

* In model text always garbles, so composite all text in post over clean generated surfaces.
* Hard negatives suppress story critical motifs, so stage required motifs positively and send their artwork to post.
* Describing an object, even to remove it, can paint it in.
* Naming a completed action replays it, so describe carried poses positively.
* Held props morph across transitions, so keep props out of hands at transitions or delete the beat.
* Shot heads drift while conditioned tails converge, so salvage from the tail.
* Clean and verify every conditioning image against approved footage before any spend.
* Fix at the cheapest layer first: still before video, edit before regeneration.
* Boundary stills carry continuity: exact shared frames are the only determinism lever on a surface with no seed.
* Seams are judged at the cut in assembly; per shot acceptance proves nothing.
* Correctness audits are not film quality; the eye at normal speed is the final gate.

## References

* references/prompt-cookbook.md: every winning prompt verbatim, why each worked, the distilled formula, and a reusable template.
* references/laws.md: every law of model behavior with its one line evidence case.
* references/failure-catalog.md: every failure from both production sessions with cost, cause, and lesson.
* references/higgsfield-ops.md: the working MCP mechanics, cost tables, surface limits, and retry discipline.
* references/higgsfield/INDEX.md: the exhaustive Higgsfield MCP surface reference, all 89 tools across a master file and eight domain files with schemas, safety classes, and production evidence; the index maps every tool to its one deep home file and safety class.
* references/model-guides/INDEX.md: the model guide library, one file per family across the whole Higgsfield catalog plus the off catalog alternates, each with when to reach for it and a Seedance 2.5 delta stating how its prompting differs from canon.
