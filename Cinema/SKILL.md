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
Write one page before any spend: story beats per scene, the character described in words, palette, light direction, travel direction, lens system, prop ownership (who holds what and when), locked title copy, and the banned list. Every later prompt quotes this page. When the director corrects it, mark superseded material explicitly, or stale frames and stale copy will be reused by accident. Under autonomous operation the canon one pager is the approval envelope, frozen before the loop starts: the loop never rewrites intent on its own. Any correction is a new envelope issued out of band by a human, and every superseded asset id must be listed in a supersededBy line the loop reads, so the loop always resolves to the latest envelope and can never condition on a superseded frame or line. File and asset names containing approved, final, or lock never override a later rejection; the latest direct ruling always wins.

### 3. Reference stills, credit free or cheap
Build and get approved before any video spend. Under autonomous operation this approval is pulled to plan time: the reference set is locked inside the approval envelope by a human before the loop starts, and the loop never approves its own references. Before each spend the loop runs a second model pass over every conditioning image and refuses any that carries a banned list item (a phoenix, grape clusters, readable text, a logo, an extra creature), because a leaked motif poisons every downstream scene and no budget cap catches it:

* Character turnaround: one hero character, isolated, neutral background. A group image is a weak identity reference and never locks a recurring hero.
* Expression sheet: the permitted acting range, so faces perform instead of holding one smile.
* Look plate: geography, palette, atmosphere, scale, light direction, SCRUBBED of anything that must never appear. Every element in a conditioning image is an invitation: a look plate that contains a phoenix and grape clusters leaks phoenixes and grapes into every wide shot no matter what the prompt forbids.
* Boundary stills: the exact composition that ends one scene and begins the next, chained across the film (scene 1 end is scene 2 start). Once footage exists, boundaries must be actual frames extracted from approved clips, never storyboard art; storyboard boundaries that do not match the real footage force environment morphs and duplicate characters.

Each reference gets exactly one responsibility, stated in the prompt with an exclusion clause: "@Mascot controls identity, proportions, materials, and costume only. It does not control pose, camera, or background."

### 4. Scene generations
One scene at a time, in story order. On Higgsfield: seedance_2_5, mode omni_reference, 6 seconds, 16:9, 480p, audio off. Conditioning: the previous boundary as start_image, the next boundary as end_image, the identity references as image_references. Preflight the exact payload and read the exact cost and live balance. Under a human, wait for explicit approval. Under autonomous operation, submit only when the projected balance stays inside the run ceiling set in the envelope, and hard stop otherwise; the per job yes is replaced by that ceiling. Submit once, poll the same job id until done, then confirm the charge by balance difference. Mechanics: references/higgsfield-ops.md.

### 5. Per scene approval
WATCH THE CLIP AT NORMAL SPEED FIRST. That viewing is the acceptance judgment; frame analysis never replaces it. Under autonomous operation no human watches each scene, so the per scene acceptance runs as a second model pass that watches the clip at normal speed and judges cinematic motion, backed by the mechanical self checks (ffprobe frame count and geometry, boundary SSIM against the conditioning frame). This pass is a proxy, weaker than a human eye: it exists to stop the loop from burning the ceiling on dead scenes, and the real creative acceptance still lands on a human at the final cut. Completion is never acceptance; the loop never treats a finished job as an approval. Then check only the named risks in frames: the defects this specific prompt was likely to produce (prop hands, text surfaces, the waterline, the boundary match). Reject with a precisely named defect or approve. Completion is never acceptance, and a rejected result is never presented as progress.

### 6. Targeted edits, named defects only
One defect, one edit, on the approved source.

* Video: video_edit with the source clip declared "the absolute authority for all motion, timing, camera work, framing" and exactly one named change ("Change only the white water bird into the approved full body phoenix. Do not rebuild or restage the shot.").
* Stills: a masked edit of one region at a time (Nano Banana Pro Inpaint), or a deterministic composite painted with an image tool (no model, zero credits, cannot drift). Full frame generative repair of a still always drifts something unrelated.
* Fix at the cheapest layer first: a 2 credit still edit beats a 15 credit video retry, and a corrected boundary still beats a rerendered scene.
* A retry changes ONE variable (prompt or reference set, never both); the one variable rule is spine and is never relaxed, proven by a payload checksum. Under a human the retry gets a fresh cost approval. Under autonomous operation the retry spends under the same run ceiling plus a per scene retry cap: after the cap is hit the loop hard stops on that scene and asks a human, so a silent retry loop cannot burn the run down (roughly 600 of 970 credits were lost to exactly that). When a beat keeps failing (a held prop, a count of objects), delete the beat rather than retrying it.

### 7. Assembly of whole scenes
Retime complete clips into their slots; never trim away the designed boundary frames, because the shared boundary frame is the match cut. Direct cuts only, no dissolves (dissolves ghost characters and props). Judge every cut at the seam inside the assembled film, then watch the whole film at normal speed as cinema. This whole film viewing is a human gate that autonomy never removes: no seam check, SSIM, or second model pass proves a film moves like cinema, and a film that passes every seam can still die as cinema (case 66). The autonomous loop assembles the cut and then stops and hands the finished master to a human for this acceptance. Local tools (ffmpeg) are for trims, concatenation, frame extraction, upscaling approved picture, and measurement, never for pixel level compositing on footage.

### 8. Titles and audio in post
All text is composited in the edit over clean picture: titles, taglines, prop lettering, tool artwork. In model text always garbles, so the model renders clean physical surfaces and post supplies the typography. Leave title safe negative space in the frame plan. Titles never sit in boxes; contrast is a luminance problem, not a font weight problem. Audio is a separate post decision made late; a silent master is a legitimate deliverable.

## Verification, lightweight

* First gate: watch at normal playback before any frame work, every time. Under a human this is the eye at speed. Under autonomous operation it is the per scene second model acceptance pass (see Per scene approval), with the human eye reserved for the final cut; this restatement adds no separate human stop beyond those two.
* Second gate: named risks only. Extract frames around the risk points (boundaries, prop interactions, text surfaces, waterlines). Do not run a full forensic audit on every take.
* Boundary check: compare the join frame against its conditioning frame, eyeball first, SSIM when in doubt.
* Contact sheets hide what full resolution reveals (title wraps, fine marks, small morphs); check anything fine at full resolution, and remember scene detection misses two frame morphs.
* An independent second viewing (fresh eyes or a second model pass) catches what the maker's own checklist stops short of.

## Credit discipline

* Exact preflight before every spend: estimate_video_cost or estimate_image_cost on the exact payload returns the exact price and submits nothing. Costs are flat and deterministic per resolution and duration.
* Per spend approval: report cost, current balance, projected balance. Under a human, wait for an explicit yes; one approval covers exactly one job. Under autonomous operation the explicit yes collapses into the run ceiling authorized once in the envelope: the loop reads the fresh live cost, submits only when the projected balance fits under the ceiling, and hard stops otherwise. Live costs are read fresh; historical estimates are never reused; every charge is confirmed by balance difference.
* 480p is the draft tier (18 credits per 6 second scene). Go to 720p only when a named fine detail cannot be judged at 480p. Master resolution comes from a zero credit local upscale of approved picture; no generative upscaler is needed.
* One job in flight; poll the same job id; never resubmit a slow job; confirm every charge by balance difference.
* Never batch before the first item passes inspection. A blind batch always loses; the disciplined loop never produced a batch loss and every drift from it did.

## Autonomous operation

This section defines how the loop runs under an autonomous harness (Claude Code ultracode or a goal gate, Codex codex exec, or any headless agent) with no human present to approve each spend. It changes who says yes to money and who catches a mechanical defect. It changes nothing about the spine or the workflow constraints: those are never relaxed for autonomy.

**The spine and the workflow constraints hold unchanged.** One scene at a time in story order, the whole scene as a single continuous take, never fragment a scene, never regenerate a locked scene, one variable per retry, never batch before the first item passes, direct cuts only, one job in flight. These are the discipline that prevented the core failure (case 66, case 47, case 29). Autonomy is never a reason to loosen one of them; a harness that drifts from them is the failure, not a shortcut. Pressure to go faster or cheaper is exactly the pressure that burned roughly 600 of 970 credits, and the loop treats it as a signal to stop, not to deviate.

**The approval envelope, written once at plan time.** Before the loop starts a human authors one envelope and authorizes the whole run with it: the canon one pager (story beats, character, palette, light and travel direction, lens, prop ownership, locked title copy), the locked and human approved reference set (turnaround, expression sheet, scrubbed look plate, boundary stills), the banned list, and the spend ceiling. The loop reads this envelope and never rewrites it. A correction is a new envelope issued out of band by a human, with every superseded asset id listed in a supersededBy line, so the loop always resolves to the latest envelope and can never condition on a superseded frame or line.

**The budget ceiling is the real spend gate.** The per job human yes collapses into one number set in the envelope. Before every spend the loop runs estimate_video_cost or estimate_image_cost on the exact payload (free, submits nothing), reads the fresh live balance, and submits only when the projected balance stays inside the ceiling and inside remaining balance; otherwise it hard stops and asks a human. A per scene retry sub cap stops a silent retry loop before it eats the run. Every charge is confirmed by balance difference, and historical estimates are never reused. A passed estimate is a price, not an approval of the payload, so the payload is validated separately (mode present, roles correct) and its bytes are asserted against the approved payload file by checksum before submit, which also proves a retry changed exactly one variable.

**Allow and deny tool posture.** The loop is allowed the generation, estimate, poll, download, frame extraction, upscale, and measurement tools it needs to run the disciplined loop. The loop is denied every upload, publish, and media export tool, so egress is impossible to perform: a finished master simply sits in the repo. Rejected takes are renamed, never deleted, and every state change is logged in the job doc, so job_display and the payload files can rebuild the whole approval ledger after a crash.

**Self checks that stand in for the human eye on mechanical risk.** The mechanical half of acceptance runs with no human: ffprobe asserts exact frame count, fps, and dimensions, and drift auto rejects the take before anything else looks at it; a boundary SSIM check compares the join frame against its conditioning frame; named risk frame extraction inspects the defects this prompt was likely to make (prop hands, text surfaces, waterline, boundary match) at full resolution where fine marks hide; and a second model acceptance pass watches the clip at normal speed and judges cinematic motion. That second model pass is a proxy, weaker than a human eye. It exists to keep the loop from burning the ceiling on dead scenes, not to prove film quality, and it never lets a finished job stand in as an approval.

**The short list of gates that still stop and ask a human.** Two, and only two.

* Final cut acceptance. When the whole film is assembled the loop stops and hands the master to a human, who watches it at normal speed as cinema. No seam check, SSIM, or second model pass proves a film moves like cinema; a film that passes every seam can still die as cinema (case 66), and per shot acceptance proves nothing. This gate is never automated.
* Egress. Sending a master out of local control is irreversible. The loop cannot do it, because the export tools are denied, and a human reopens that capability out of band only when they actually intend to publish.

Everything that used to be a human yes inside the loop (per scene cost approval, retry cost approval, the general per spend yes, the 720p tier choice) is now held by the ceiling and the self checks above. The canon and reference approvals are held by the envelope, authored by a human before the loop starts. The two gates above are the only places the running loop stops for a person.

**Across harnesses.** Most of this is app level and ports unchanged; two pieces are harness enforced and their binding differs. The credit ceiling is not an LLM token cap and not a harness flag: the loop reads the live Higgsfield balance through the MCP surface and stops itself, so it behaves the same everywhere, as do the self checks (ffprobe, SSIM, the second model pass). The two harness specific pieces are egress denial and the never stop loop. On Claude Code, egress is held by denying the upload and export tools (disallowedTools) and the loop is held open by a goal gate that a stop cannot end early. On Codex there is no per tool deny and no goal gate: block egress by running under a sandbox with no network (codex exec --sandbox workspace-write) or by leaving the upload MCP server out of the run config, so a master cannot leave the repo until the operator consciously elevates the sandbox, which is exactly the egress human gate; and because nothing enforces done, write the completion condition into the prompt with an explicit attempt cap and lean harder on the durable progress file, since the loop can stop early and must resume from that file, not from memory. The second model acceptance pass fans out as a subagent on Claude Code and runs as a separate codex exec pass, or sequentially, on Codex. On any harness with neither per tool deny nor a network sandbox, egress stays a live human approval; it is never granted to the loop by prompt wording alone.

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
