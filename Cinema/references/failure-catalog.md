# Failure catalog

Every failure from both production sessions (the Codex sessions that built the film and masters, and the Claude sessions that ran the fragmentation rebuild and recovery), with cost where known, cause, and lesson. Roughly 600 of the production's credits went to the entries below; the total plan drift alone (Draft 1, the continuity chase, v16, v17, the fragment rebuild) burned about 460. Quoted fragments keep their original punctuation.

## Phase 1: concept and Draft 1 (Codex founding session)

1. Share page transcript scrape (0 credits). Virtualized chat pages defeated in browser automation; recovered by fetching the public page and parsing the rendered HTML locally. Lesson: recover source material outside the browser when the page fights you.
2. Higgsfield plugin surface hidden (0 credits). Tools stayed invisible despite a connected account until the user mentioned the plugin again with the image attached. Lesson: surface availability is stateful; reconfirm before planning around it.
3. Seedance 24 second single take unaffordable (0 credits). Preflight said 72 credits against a 50 credit balance; not run. Lesson: preflight before route decisions, not after.
4. Seedance plan gate (0 credits). A four clip batch was refused with "Requires basic plan or higher" despite sufficient credits. Lesson: plan gating beats credits; typed refusals cost nothing.
5. Free plan concurrency (0 credits). Parallel submissions hit "max 1 concurrent job(s)"; resubmitted sequentially. Lesson: one job in flight is also the platform's rule.
6. Draft 1 Cinema Studio batch (24 credits, rejected whole: "this is absolutellly terrible and a waste of credits"). Cause: model chosen for affordability over identity consistency, four independent clips conditioned on one five mascot group photo, no cheap single test before spending the rest. Lesson: identity lock and a one scene gate before any batch.
7. v1 frame package rejected (0 credits). The concept had collapsed to a generic six branch metaphor, dropping the fruit, scroll, aquatic connections, and team shot. Lesson: canon drift happens in references too; the director's corrections must be written back as superseding canon.
8. First 18 second keyframe defect (0 credits). A palm crown read as naturalistic instead of countable branches; corrected, then superseded by the twelve plus branch ruling. Lesson: symbolic counts must be stated as counts.

## Phase 2: the five scene production (Codex, Seedance 2.5)

9. Scene 2 submission 422 (0 credits). generate_video rejected params without mode omni_reference even though the identical estimate had passed. Lesson: preflight does not validate what generation validates.
10. Scene 2 v1 (18 credits, rejected). A scroll blew in by coincidence; the director killed the premise: "how does that make sense". Lesson: story causality is a spec requirement; the model rendered the prompt faithfully and the prompt was wrong.
11. Scene 3 v1 (18 credits, rejected). The mascot ended underwater after drinking. Causes: a split level end boundary, the camera line "tilt down through the water", and seven actions in six seconds. Lesson: boundary images are destiny, camera verbs are physics, four beats maximum.
12. @B160R boundary still (1.5 credits, rejected). Regenerated WITH the flawed boundary as reference; the cross section survived every negative. Lesson: to remove a structure, remove the reference.
13. @B215 pack boundary (0 credits). The same cross section defect was caught by image inspection before any spend. Lesson: inspect every conditioning image before first use.
14. @B215R pod float (part of 1.5 credits). The open pod rendered detached in midair. Lesson: unsupported objects hover; state attachment.
15. Pod reattach edit (1.5 credits, partial fail). The scroll correction succeeded; the pod stayed floating after an explicit attach instruction. Lesson: prefer removal or regeneration over spatial rebinding; the fix that worked deleted the pod.
16. Scene 4 boundary map rug (caught by the director: "also why is there a map under the tree?"). The symbolic scroll literalized into an oversized parchment. Lesson: pin physical size on symbolic props.

## Phase 3: lock, titles, sound (Codex)

17. Trim instead of retime (0 credits). Cutting clip endings to fit slots destroyed the designed boundary frames and produced jarring jumps. Lesson: retime complete clips, preserve first and last frames.
18. Zoompan digital pullback patch (0 credits, made it worse). The real defect was a repeated beat plus an internal hard cut; the patch concealed nothing. Lesson: diagnose before patching; concealment is not repair.
19. Hidden internal cut inside an approved scene (0 credits). Found only by scene detection tooling. Lesson: the model can cut against its own prompt; audit for it.
20. Titles v1 (rejected: "absolutely terrible... font is horrendous... gross [boxes]"). Boxes flatten film into slides. Lesson: no panels, ever.
21. Titles v5 to v7 (rejected repeatedly). Thin serif strokes vanished on bright sand; heavier weight and shadows did not fix it. Lesson: contrast is a luminance problem, not a weight problem; solve with treatment (fill, outline, vignette).
22. Font wrap regressions (0 credits). Each face change silently rewrapped lines; 640 pixel contact sheets hid it. Lesson: check typography at full resolution.
23. SFX v10 and v11 (rejected: "remove those sounds effects, they are bad"). Cues timed from half second contact sheets sounded invented actions. Lesson: audio synced to guessed timing fails; the film shipped silent.
24. Final frame overlay dropout (0 credits). The end card faded because a hold frame was cloned from inside the dropout. Lesson: hold the last fully composited frame.
25. Egress blocks and a standing privacy ruling (0 credits). Uploading corporate masters to the vendor cloud was risk blocked. Lesson: masters stay local in the repo unless explicitly approved.
26. Wasted presigned upload batch (0 credits, time lost). A first batch of upload URLs expired unconfirmed. Lesson: confirm uploads promptly; URLs expire.

## Phase 4: the corrective arc (Codex)

27. Scene 3 v4 corrective (18 credits, rejected). The prompt itself said "tilt through the clear water" and the camera went under; blank badges communicated nothing at 480p. Lesson: the failure text was in the prompt all along; reread before submitting.
28. Scene 5 v4 corrective (18 credits, rejected). A white water bird reference and a copper phoenix reference blended; the bird changed color mid shot. Lesson: one creature, one reference, plus a color lock from first visible frame.
29. v5 corrective pair (36 credits, rejected as wrong workflow). Technically clean renders, but they regenerated from loose references instead of preserving approved footage, dropped approved end boundaries, and ran before reference approval. Director: "YOUR MAKING EVERYTHING WORSE". Lesson: approved footage is absolute authority; corrections are edits, not regenerations.
30. Scene 3 reference stills v1 and v2 (imagegen, ~0 credits). Floating labels ("absdolutely terrible"), then sticker medallions. Lesson: identities must be woven into bodies; approved on v3.
31. Tumbleweed storyboard v1 (0 credits, rejected: "look thrown in there and haphazard"). All four props staged in one camera facing frame. Lesson: distribute inserts across the timeline, one prominent element per moment.
32. Phoenix references v1 and v2 (0 credits, rejected as "essentially a recolored eagle"). Fixed only when the user supplied their own reference image. Lesson: when the director has a picture in mind, get the picture.
33. Scene 3 tool identity edit (18.12 credits, approved then withdrawn). Only the OneNote turtle mark survived motion. Lesson: small branded marks do not survive generative video.
34. Continuous S3+S4 identity edit (31.5 credits, rejected). The same four motifs failed AND the edit returned 249 frames for a locked 252. Lesson: video_edit drifts duration; frame count is a gate.
35. Scene 2 and Scene 4 double reach loops (0 credits). Source generation defects (repeated hand motions) excised deterministically at clean action matches. Lesson: deterministic timing surgery on frames is free; use it before any regeneration.
36. Five xfade flash attempts on the Scene 4 join (0 credits, rejected). "The flash hid the discontinuity instead of fixing it." Lesson: no concealment transitions.
37. Scene 4 omni rebuild with ten references (18 credits, rejected: "stil absolutely terrible"). Postmortem: "I forced roughly eight distinct actions into six seconds. I supplied ten competing references... More instructions did not create more control." Lesson: reference and action overload collapses into interpolation.
38. Local deterministic composite of Scene 4 (0 credits, rejected: "what the hell is this trash... i asked you to use higgsfield and seed dance, not your bullcrap video editing"). Lesson: tool choice is a directive; local compositing never substitutes for generation.
39. GPT Image five reference rebuild (3 credits, stopped at frame 1). Four competing references recomposed and cropped the frame despite role scoped authority text. Director: "this is terrible and nowhere near what we originally had, i asked for something simple". Lesson: do not substitute models or invent elaborate reference schemes without approval.
40. Scene 3 markings video_edit (18.12 credits, rejected at its opening frame). Lesson: the same small marks law again; stop paying to relearn it.
41. Scene 4 timed beats video_edit (18.12 credits, rejected). The scroll overlapped water and the ending could not match Scene 5. Lesson: edits inherit source structure; single take continuity must be generated as a single take.
42. v15 assembly (0 credits generation, rejected). Thirteen significant discontinuities plus a morph; several cuts omitted essential physical actions. Lesson: crossfades would conceal, not fix; missing actions need generated bridges (the accepted e1971966 bridge came from this diagnosis).
43. Scene 5 duplicate mascot (part of v16). The phoenix reference itself contained a mounted mascot. Lesson: content pure references, and state what each reference controls.
44. higgsedit build errors (0 credits). Relative paths resolved against the project directory, and media layers in a layout free frame needed explicit coordinates. Lesson: absolute paths and explicit placement in the sandbox editor.
45. Presigned PUT failures (0 credits). Uploads failed until the exact signed Content Type header was sent with binary data. Lesson: presigned URLs sign the content type; send it.

## Phase 5: v16 and v17 drift (Codex)

46. v16 blind batch (90 credits, all five rejected). All five scenes generated before validating one: scroll never visibly stored, environment morphed under a stationary mascot, a hard cut at 1.21 seconds, a pale generic eagle plus an unwanted OASYS plaque. Director: "you have made this completely worst, stop sending me work and not checking the output". Lesson: one scene, full review, then the next; a blind batch always loses.
47. v17 sequential 4 second scheme (60 credits, branch rejected). The agent unilaterally replaced the approved five scene system with eleven chained 4 second clips and even changed story (the canteen left behind). Two clips failed on object counts and a dropped locomotion beat; two passed and were stranded. Lesson: an unauthorized workflow change is a failure even when individual clips pass.
48. Scene 2 rebuild one (18 credits, rejected). Stale storyboard boundaries mismatched the real neighbors (SSIM about 0.26) and a 5,864 character prompt demanded about ten actions. Lesson: real frames as boundaries, and action density kills.
49. Scene 2 rebuild two (18 credits, rejected). Short prompt and real boundaries fixed the duplicates but the fingertip trace, canteen hook, and camera reveal were dropped; the oasis materialized under a near static camera. Lesson: overloaded chains drop beats; the camera must perform the reveal.
50. Scene 3 720p continuous rebuild (42 credits, rejected). The wrong opening reference compressed a distant oasis into a few steps: "this iwas not the orignal scene". Lesson: geography continuity comes from the correct adjacent frame, and memory of the footage must be checked against the footage.
51. Scene 3 source restoration edit (22 credits, rejected). The opening reframed and a duplicated upside down mascot appeared, leaked from a composite reference sheet. Lesson: sheets are design sources, never scene references.
52. 10 second Clip 1 monolith one (30 credits, rejected). A rolled scroll stayed in the backpack while the open map was held, and tumbleweed lettering distorted. Lesson: prop state must be single sourced; text belongs in post.
53. 10 second Clip 1 monolith two (30 credits, rejected). Garbled tags despite a blank tags instruction that still named the words, late cuts, a costume restyle at an internal cut, proportion drift, duplicate canteen, and a stray phoenix in the end frame. Lesson: internal cuts behave like fresh seeds; never put more than one shot in one generation.

## Phase 6: the fragmentation rebuild and collapse (Claude sessions)

54. S1 take 1 constraint wall (15 credits, rejected). Treadmill lock: nine strides, 11 to 18 pixels of terrain advance. Lesson: measure travel; walking words do not make displacement.
55. S1 retry constraint wall (15 credits, rejected). Travel passed but the scheduled weed never appeared and footprints rendered AHEAD of the feet, a literalized mechanic. Lesson: constraint walls backfire; return to the natural chronological style.
56. S3 take 1 (15 credits, rejected). The canteen became a boxy bottle and teleported into the mitt with no grab. Lesson: delete a cursed prop beat instead of retrying it.
57. S4 take 1 (15 credits, rejected). The map vanished between two frames and the ending overshot into a waterfall city with grape clusters and a white phoenix. Lesson: invention gravity in wide endings; ban the classes and pin the scale.
58. S4 retry (15 credits, salvaged in part). The held map morphed into a bottle during the rise and the ending dissolved into the end image instead of arriving by camera. Lesson: end conditioning is soft; salvage usable windows.
59. S4b hold on a stale boundary (15 credits, superseded). The boundary itself held an off model furry mascot. Lesson: verify conditioning stills against approved footage before every spend, a standing rule born here.
60. Shot H replayed drink (0 credits extra, windowed out). "hands lowered after drinking" replayed the drink at the head. Lesson: positive pose wording.
61. Shot I map over water (0 credits extra). The accepted window was re ruled to end before the parchment crossed the water. Lesson: windows are revisable in service of the film, and adjacent state must reconcile at every seam.
62. Seedream full frame carrier repairs (4 x 1 credit, abandoned). Each pass fixed one patch and drifted another: turtle flippers recolored, a follower marked, the canteen gained a turtle pattern. Lesson: full frame repair for local marks is the wrong method, always.
63. Look plate five target removal pass (2 credits, discarded). It painted in the dome, boat, and magenta mass it named. Lesson: one or two removal targets, verify against the previous iteration.
64. Browser canvas inpaint masking (0 credits, session lost). Synthetic pointer strokes failed on large masks, and the MCP path had been available all along. Lesson: check the tool surface before building workarounds.
65. Higgsfield web upload block (0 credits). Programmatic file choosing into the web UI is blocked. Lesson: the user uploads manually where automation is refused.
66. Clip 2 assembly collapse (the arc cost about 330 credits, rejected: "this is absolutely terrible and the worst thing I have ever seen, the original approved full video was way better than this"). Every shot individually approved; the film failed at the seams with cuts every 1.5 seconds and no camera energy across them. Lesson: THE lesson. Scene level continuous generation is the unit; fragments assembled from defect picked windows are dead cinema; per shot acceptance proves nothing.
67. Local ffmpeg and PIL pixel post pass (0 credits, rejected wholesale: "dont ever do that again"). Ten agents and three verify rounds converged technically and violated the standing tool directive. Lesson: pixel level post goes through the approved surface or a real editor at master resolution.
68. v15 timing surgery v8 (0 credits, rejected: "stop shortcutting its still terrible and now the cut is very noticiable"). The jumps lived in the source footage, which had violated its own no cut prompt. Lesson: know which defects are in the footage before cutting around them.
69. v7 color conversion regression (0 credits, caught internally). Inserted frames were auto color converted. Lesson: verify every export against source hashes.

## Phase 7: judged with eyes (video evidence review)

70. Fragment draft clip1 (judged frame by frame). Floating thorn balls, blank plates, an eye on the back of the head, the oasis visible during despair, locked off stills with double the cut count. Cause: regenerating without the approved takes as reference. Lesson: every loss traces to abandoning approved footage conditioning.
71. Fragment draft clip2 (judged frame by frame). A pink glowing body, blank purple squares for letter tiles, a tree growing out of the parchment, Christmas bauble fruit. Cause: same, plus prop semantics that only survive when approved frames condition the generation. Lesson: prop meaning is carried by conditioning, not description.

## The two summary numbers

* John's verdict on the drift: "you have spent over 600 credits and acheived absolutely nothing."
* The postmortem's verdict on the method: the disciplined loop (one scene, preflight, approval, watch, targeted edit) never produced a blind batch loss; every drift from it did.
