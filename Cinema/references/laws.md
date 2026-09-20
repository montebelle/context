# Laws of model behavior

Every law learned in the From Desert to OASYS production, each with its one line evidence case. Quoted fragments keep their original punctuation.

## Text and marks

1. In model text always garbles, so composite text in post over clean generated surfaces. Evidence: the approved Scene 1 preview reads "CONTEXT WINDOW FAILEEED" and "DEAD EMD" on its tags, and plaques relettered frame to frame.
2. Short prop text of about twelve characters can hold; longer phrases mutate. Evidence: "DEAD END" and "ERROR 404" stayed legible in every frame while the context window tag drifted through three misspellings in one clip.
3. Naming forbidden words anywhere in the prompt leaks them onto surfaces. Evidence: a prompt that said tags stay blank but listed the four intended post messages produced garbled lettering; the take whose prompt contained no words at all rendered zero lettering.
4. Under regeneration without approved reference footage, sign text does not garble, it vanishes to blank plates. Evidence: every tag in the rejected clip1 fragment draft was an empty metal plate.
5. Small branded marks do not survive generative video. Evidence: two separate video_edit passes (18.12 and 31.5 credits) each preserved only the largest central motif and degraded the four smaller ones despite per carrier lock language.
6. The bold mark law: one strong single color mark on the largest flat surface survives motion; subtle pigmentation drifts. Evidence: the OneNote turtle shell mark held in every pass while the four fish scale motifs failed.
7. Fine mark drift is invisible at 480p; validate fine detail at 720p or place flat placeholder patches and track exact artwork in post. Evidence: the tool inlays could not be judged at 480p and repeatedly failed there.
8. Baked in titles cannot be cleanly erased from a finished export; rebuild from clean pre title sources. Evidence: the textless v9 was produced by reassembling from the original build scripts, not by painting over the render.

## References and conditioning

9. Reference images beat text negatives: a structural flaw in a conditioning image survives any amount of prohibition prose. Evidence: the split level @B160 boundary reproduced its aquarium cross section through exhaustive negatives, and regenerating WITHOUT that reference fixed it first try.
10. Reference bleed: any content in a conditioning image can materialize in the output. Evidence: a phoenix reference containing a mounted mascot produced a duplicate mascot; a look plate containing a pale phoenix and grape clusters leaked both into wide shots.
11. Multiple references for one creature blend rather than select. Evidence: a white water bird reference plus a copper phoenix reference produced a bird that started white and turned red mid shot.
12. Clean and verify every conditioning image against approved footage before any spend. Evidence: a stale boundary still carrying an off model furry mascot wasted a 15 credit hold before anyone looked at it closely.
13. Composite sheets and montage references leak their layout into the frame. Evidence: a tools reference sheet produced duplicated upside down mascot and animal imagery in the top of the edited clip.
14. Fewer matched references beat many; reference overload plus action overload collapses into interpolation. Evidence: ten references and about eight actions in six seconds made Seedance interpolate between the stills instead of following them, per its own postmortem.
15. A group image is a weak identity reference for one recurring hero. Evidence: Draft 1 generated four independent clips from a five mascot group photo and never locked character or environment, 24 credits rejected whole.
16. Boundary stills must be actual frames extracted from the adjacent approved clips, never storyboard art. Evidence: stale storyboard boundaries matched real footage at SSIM 0.20 to 0.33 and forced environment morphs and a duplicated mascot to satisfy the target.
17. Boundary images are targets, not guarantees: end conditioning is soft, and the model may overshoot, dissolve into the end image, or materialize the target instead of arriving by camera move. Evidence: one Scene 4 take dissolved into its end frame and another overshot into an invented waterfall city.
18. Shot heads drift while conditioned tails converge, so salvage from the tail. Evidence: Shot H's tail matched its carrier boundary while its head replayed a drink that was only mentioned as a completed pose.
19. Boundary stills carry continuity: the exact same frame ends one scene and begins the next, and on a surface with no seed this is the only determinism lever. Evidence: the accepted Scene 4 bridge was conditioned on the real Scene 3 last frame and real Scene 5 first frame and repaired the film's worst gap in one take.
20. The same still in both start_image and end_image roles yields a stable living hold with believable micro motion. Evidence: the approved S4b hold breathed, blinked, and drifted dust while nothing entered or left the frame.
21. Contradictory conditioning fails: two references asserting different visual states of the same object ask the model to obey both. Evidence: an end frame with unmarked animals plus references with marked animals produced neither reliably.

## Action, props, and camera

22. Naming a completed action replays it; describe carried over poses positively. Evidence: "hands lowered after drinking" made the shot open with the mouth at the waterline and a droplet falling.
23. Held props morph and teleport across pose and camera transitions, so keep props out of hands at transitions or delete the beat. Evidence: the canteen changed design three times and teleported chest to mitt with no grab, and the held map morphed into a bottle during a rise.
24. Describing an object to remove it can paint it in; removal and negative prompts materialize named objects in still edits. Evidence: a five target removal pass painted in the dome, boat, and magenta mass it named, larger, exactly where named.
25. Symbolic props get literalized unless physically pinned. Evidence: a scroll opened flat with a motif flowing into roots rendered as a giant map rug until the prompt specified "unrolled only 20–25 centimetres" and banned map symbols.
26. Floating prop gravity: unsupported objects hover unless attachment is stated. Evidence: the seed pod rendered detached and floating twice until every later prompt pinned attachment by stem.
27. Six seconds holds about four dependent actions; overloaded chains drop beats or insert cuts. Evidence: seven actions overloaded Scene 3 v1, and about ten actions in the Scene 2 rebuilds repeatedly dropped the trace, the belt hook, and the steps.
28. One principal action per timed interval is the reliable unit of obedience. Evidence: the accepted Scene 2 structure was one action per segment across seven segments, and every accepted v6 shot followed it.
29. Camera verbs are executed as physics: what the lens does, the world does. Evidence: "tilt down through the water" put the camera and the mascot underwater.
30. Precise intra clip event timing is not honored; cuts land late and object schedules slip. Evidence: specified cuts at 1.5, 3.4, and 5.5 seconds landed about 0.35 seconds late, and a weed scheduled for the first 1.5 seconds entered at 4.4.
31. Identity and costume reset at internal cuts of a multi shot generation, like a fresh seed per shot. Evidence: the 10 second monolith flipped the whole kit brown to olive at an internal cut and the head to body ratio drifted from 53 to 60 percent.
32. The model can insert its own internal hard cut, and can replay the previous scene's closing beat when the start image matches the previous end frame. Evidence: an approved Scene 3 carried a hidden cut found only by scene detection, and a repeated drifting leaf beat opened the next scene.
33. Treadmill lock: a walking character plus a tracking camera can yield strides with no terrain displacement, unfixable in post. Evidence: nine strides with about 100 pixels of stride spread advanced the terrain 11 to 18 pixels; the audit now requires measured travel.
34. Travel must be the central stated event or the environment morphs beneath a stationary character. Evidence: v16 Scene 3 morphed the world around a standing mascot instead of descending, and a v17 clip stored the map correctly but never took the required steps.
35. Object count collapse: counts above about two of the same prop are unreliable in one shot. Evidence: four tumbleweeds collapsed to one oversized weed, then to about two persistent objects, even with per object time windows.
36. Wide vistas regress to banned or invented content under weak constraint. Evidence: waterfall lake cities, grape clusters, and white phoenixes appeared the moment the camera went wide, twice.
37. Over specified mechanics get literalized as decoration. Evidence: "each planted foot leaves a new footprint one stride apart" painted a footprint trail AHEAD of the walker.
38. Prompt style law: natural chronological prose of roughly 350 words beats labeled constraint walls of 600 plus words. Evidence: two constraint wall takes failed where the original corrective style passed first try on reuse, and the 5,864 character wall failed on every axis at once.
39. Positive locks with exact counts plus an explicit fail list is the pattern that passes. Evidence: "Exactly one mascot... Exactly two green leaves" with a FAIL THE SHOT IF paragraph produced the first accepted Scene 2 rebuild.
40. A recolor or redesign edit of one element can preserve blocking exactly. Evidence: the phoenix replacement kept eruption timing, mount choreography, and flight path frame for frame while changing the bird completely.

## Repairs and editing

41. Full frame generative repair cannot place small localized marks; every pass regenerates everything and drifts something unrelated, and escalating constraint text makes drift worse. Evidence: four still repair passes in a row recolored the turtle, marked school followers, and patterned the mascot's canteen.
42. Fine marks, text, and artwork go by masked region edit of one element at a time, or by deterministic composite with no model at all. Evidence: the deterministic patch composite changed 0.79 percent of pixels, all inside the masks, for zero credits, after four generative failures.
43. Removal with background reconstruction works first try; spatial reattachment of a floating object fails repeatedly. Evidence: two attach the pod edits failed and one surgical removal succeeded.
44. Limit removal edits to one or two targets and verify each iteration against the PREVIOUS iteration, not the original. Evidence: the five target pass regressed, and the regression was only visible against the prior version.
45. Fix at the cheapest layer first: a 1.5 to 2 credit still edit repeatedly prevented an 18 credit video loss. Evidence: boundary QA stills caught the cross section, the floating pod, and the wrong terrain before any video spend.
46. video_edit obeys "preserve the source" strongly but under delivers requested local changes, inherits the source's cut structure, is billed by source duration, ignores duration and aspect parameters, and can drift frame counts. Evidence: a locked 252 frame edit returned 249 frames, and edits told to preserve cuts kept cuts.
47. Retiming complete clips into their slots preserves designed boundary frames; trimming tails destroys the match cuts. Evidence: the first assembly trimmed scene endings and produced jarring jumps that retiming fixed.
48. Dissolves and flashes conceal discontinuities instead of repairing them and ghost characters and props. Evidence: five fadewhite attempts were rejected on principle, and the zoompan pullback patch made the cut worse.
49. Scene detection misses two frame morphs; frame stepping is the only reliable cut and morph detector. Evidence: a two frame morph scored 0.022 against a 0.3 detection threshold.
50. An 18 percent punch in turns an identical axis cut into a legitimate axial cut, and entering windows on motion while exiting on energy makes cuts read as intended. Evidence: the recut that applied both rescued two dead cuts without any generation.

## Judgment and process

51. Seams are judged at the cut in the assembled film; per shot acceptance proves nothing. Evidence: every Clip 2 shot passed its individual audit and the assembly was rejected outright, with adjacent shot state contradictions only visible at the seams.
52. Correctness audits are not film quality; the eye at normal speed is the final gate. Evidence: "The audits measured identity, props, text, geography... none of them measured whether it moves like cinema."
53. A scene generated as one continuous take has cinematic flow for free; fragments assembled from defect picked windows are dead cinema. Evidence: the five originals each read as one camera move with acting inside it, and the fragment drafts read as slideshows before any prop defect was counted.
54. Camera behavior is the cinema: locked off stills with jump cuts read as a slideshow regardless of content quality. Evidence: the rejected drafts' single visible common failure was zero camera movement across double the cut count.
55. Spectacle beats live inside a held frame: the event transforms the frame, the camera does not chase it. Evidence: the tree grows from sapling to fruited canopy inside one held composition, and the phoenix erupts inside one held wide.
56. The color arc carries the story and random regeneration breaks it. Evidence: warm desert to cool water to gold phoenix reads as three acts, and the drafts interleaved warm and cool shots at random.
57. A blind batch always loses; generate one, audit, stop. Evidence: the 90 credit v16 batch failed four of five, the 24 credit Draft 1 batch failed whole, and the disciplined loop never produced a batch loss.
58. Scene joins are matched continuity cuts, not identical frames: same set, same light, pose carried over, framing changed. Evidence: join frame PSNR between approved scenes ranged 10.7 to 19.9 dB and the closest matched setup produced the most invisible cut.
59. Preflight validation is narrower than submission validation. Evidence: an estimate passed without the mode parameter and the identical generate call was rejected with a 422.
60. Verify recorded model ids and live capabilities rather than trusting brochure names. Evidence: a requested model was routed to a different backend label, and the CLI model list omitted a model that recorded jobs prove exists.

## Suppression and binding

61. The suppression law: global hard negatives plus soft framing actively suppress story critical motifs, so a motif that must appear needs positive staging language, and its exact typography or artwork goes to post. Evidence: the original spec's bans on generated words, logos, and office objects meant the tumbleweed error text, the tool badges, and a solid phoenix never appeared at all; the corrective grammar generated clean planar plaque and badge surfaces held toward camera for a stated number of consecutive frames and left the artwork to post.
62. References and locks bind appearance; prompts do not bind motion mechanics. Evidence: the v6 S1 take passed identity, costume, and the frame zero boundary in audit while its walk failed as treadmill motion, so appearance control and motion control need different levers: references and count locks for the first, camera physics and measured travel audits for the second.
