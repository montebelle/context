# Prompt cookbook

The verbatim winning prompts from the From Desert to OASYS production, each annotated with why it worked, followed by the distilled formula and a reusable template.

Quoting rule: the prompts below are exact quotes and keep their original punctuation, including hyphens and dashes. The commentary around them does not use those characters.

## 1. The shared scaffold (prepended verbatim to all five approved scene prompts)

```text
Create one six-second 16:9 cinematic animated-feature source clip for "From Desert to OASYS." Imagery only: no generated speech, music, captions, title cards, labels, logos, interface panels, or written words.

REFERENCE ROLES
@Mascot defines the exact identity, proportions, materials, and explorer costume of the only mascot. @Expressions defines its permitted acting range. @Motifs defines the scroll, aquatic connections, abundant fruit-bearing skill tree, water-born phoenix, and functional harness. @Look defines the unified geography, palette, atmosphere, environmental scale, and light direction. Use the supplied boundary images as exact composition targets, not as loose inspiration.

IDENTITY AND CONTINUITY
Exactly one mascot. Preserve the rounded pearly-white capsule body, short limbs, dark navy inset oval face, star-shaped eyes, pink cheeks, violet-blue rim glow, sand-beige pith helmet, brown backpack and bedroll, binoculars, and canteen. Maintain screen-left-to-screen-right travel, the same desert cliffs and oasis basin, one low warm sun camera-left/back, cool sky fill overhead, and pearl-blue oasis bounce camera-right/front. Props never teleport or duplicate.

CINEMATIC LANGUAGE
Emotionally grounded theatrical 3D feature animation, not an explainer or advertisement. Physical weight, quiet acting, large environments, restrained wonder. Natural perspective and motion blur. Refined pearl materials, detailed shadows, soft highlight bloom, restrained halation, atmospheric depth, and subtle film grain. Every camera move has a stated start, path, speed, easing, and end frame. Effects remain secondary to character and story.

HARD NEGATIVES
No fixed six-branch tree; no barren branches; no fruitless tree; no single decorative fruit; no identical facial expression; no permanent smile; no floating papers; no chat bubbles; no dashboards; no holographic UI; no floating software icons; no logos; no "OASYS" word over the water; no shelf or journal in the desert; no volumetric neon ribbons; no cyberpunk palette; no childish slapstick; no extra mascots; no scary phoenix; no dragon; no flames; no fire rebirth; no combat; no office objects; no generated words; no character redesign; no reversed direction or lighting; no teleporting props; no brief before the fruit opens; no oasis treated as the final destination.
```

Why it worked: one opening sentence sets format and duration; every reference has exactly one responsibility; the identity block is a word for word character sheet repeated identically on every job so the model never improvises the hero; the cinematic language block asks for a film, not an ad, and demands stated camera physics; the negatives are ONE compact block at the end, all specific nouns learned from real failures, not abstract style words. The scaffold made every scene share a world.

## 2. The five approved scene prompts (each follows the scaffold above)

### Scene 1 "The Spark" (job bb4df43f, approved, 18 credits, @B00 start_image, @B055 end_image)

```text
START AND END
Begin on the exact composition of @B00. End on the exact composition of @B055.

SUBJECT AND ACTION
0.0–1.5 seconds: the mascot walks left-to-right along the dune with alert star eyes, a small determined closed smile, upright shoulders, and a natural step.
1.5–3.5 seconds: heat and effort take over. Steps shorten; shoulders sink; upper eyelids lower; the smile disappears; the mouth parts with dry breathing; cheeks and rim glow dim. The mascot tips the same canteen and receives only two drops.
3.5–5.0 seconds: wind erases the footprints behind it. The mascot looks back with worried inward-tilted eyelids and a downturned mouth. A half-buried stone bears only a broken-path carving.
5.0–6.0 seconds: it reaches weak shade beneath the rock, sits heavily, places the empty canteen beside its foot, bows its head, and closes its eyes.

SETTING AND LIGHTING
Vast late-afternoon desert matching @Look and both boundaries: muted sandstone, dusty rose, umber, lavender-blue shadow, low champagne sun camera-left/back, cool sky fill, fine blowing sand, mild heat haze. No oasis or green vegetation yet.

CAMERA
Start at 24 mm extreme wide, low rear-left three-quarter, mascot small in lower-left. Slow forward dolly with smooth linear speed for 1.5 seconds. Cut on a footfall to a 35 mm lateral tracking shot at equal walking speed. At 3.5 seconds cut to 50 mm front three-quarter and make a slow 1.5-metre push-in with gentle ease-out. Finish completely still at mascot eye height on @B055. Dolly only—never zoom. Do not cross the axis.

MOOD
Guarded optimism gradually overwhelmed by scale, fatigue, and lost progress; quiet and cinematic, never melodramatic.
```

Why it worked: four beats in six seconds, one principal action each, told chronologically; the emotional arc is written into physical performance (eyelids, shoulders, glow) instead of adjectives; every camera segment states lens, position, move, speed, easing, and end state; the last beat lands the character exactly on the end boundary. The director approved it on first render: "this is a good start, next scene."

### Scene 2 "The Discovery", map from backpack (job 1511235c, approved, @B055 start_image, @B110 end_image)

```text
START AND END
Begin from the exact @B055 pose, props, rock shelter, geography, and lighting. End on the exact @B110 composition.

SUBJECT AND ACTION
0.0–1.2 seconds: the exhausted mascot rests beneath the rock with eyes closed and slow breathing. It opens its eyes, remembers something, and turns toward its own backpack.

1.2–2.6 seconds: the mascot reaches into the backpack and pulls out the same aged cream scroll it has been carrying. It unfolds the scroll across its knees. The scroll is clearly a wordless map showing the pearlescent continuous-path motif from @Motifs and recognizable silhouettes of the nearby rock formations. Nothing arrives from outside the scene.

2.6–3.8 seconds: the mascot studies the map, looks toward the broken-path waymarker, then compares the surrounding rock formations with the shapes on the map. Recognition gradually appears: star pupils brighten, posture lifts, and the mouth forms a small silent "oh." The map reveals that the route continues just beyond the nearby ridge.

3.8–5.1 seconds: the mascot rolls the map, secures it in the backpack, clips the canteen to its belt, and climbs the final short incline beside the rock shelter. The climb feels physically tiring: two deliberate steps, one brief slip in the sand, then a determined recovery.

5.1–6.0 seconds: the mascot reaches the crest and looks over it. Reveal the oasis surprisingly close below—distant palms, deep indigo water, and a faint pearl-blue reflection. Exhaustion shifts into cautious hope: brighter eyes, faint blush, lifted shoulders, and a restrained closed smile.

SETTING AND LIGHTING
Continue the same desert route, rock shelter, cliffs, and dune geometry. The oasis was physically hidden behind the nearby ridge, not created by magic. Warm sun remains camera-left/back. A faint pearl-blue reflection reaches the mascot only during the final reveal. No foreground oasis vegetation, magical leaves, portal, or spontaneous environmental transformation.

CAMERA
Start with a nearly still 50 mm intimate medium on the resting mascot. At 1.2 seconds, make a slow 0.4-metre dolly toward the backpack. At 2.0 seconds, rack focus from the mascot's face to the map. At 2.6 seconds, cut to a 65 mm over-the-shoulder view that clearly connects the map's landmark shapes to the real rock formations beyond it. At 3.8 seconds, cut to a 35 mm low lateral tracking shot following the short climb. At 5.1 seconds, transition into a 28 mm over-the-shoulder reveal, gently craning upward with the mascot and easing out exactly on @B110. No zoom, orbit, or axis crossing.

MOOD
Exhaustion gives way to recollection, recognition, renewed effort, and earned hope. The discovery results from using something the mascot was already carrying—not coincidence or magical intervention.
```

Why it worked: it replaced a rejected version where a scroll blew in by coincidence. The rewrite makes the discovery earned ("Nothing arrives from outside the scene", "not coincidence or magical intervention") and physically causal: remember, retrieve, compare, climb, reveal. The world stays honest ("the oasis was physically hidden behind the nearby ridge"). Story logic in the prompt is what the director actually judges.

### Scene 3 "The Oasis", corrected above water version (job bf7e0234, approved, @B110 start_image, corrected @B160R2 end_image)

```text
START AND END
Begin from the exact @B110 pose, costume, backpack, secured map, canteen, horizon, and lighting. End on the exact corrected @B160R2 composition. The mascot remains completely above water throughout the clip.

SUBJECT AND ACTION
0.0–1.4 seconds: the mascot walks down the short slope toward the nearby oasis, visibly tired but encouraged.

1.4–3.6 seconds: at the bank, the mascot kneels on dry ground, drinks from cupped hands, exhales deeply, and refills the same canteen. Its pearl sheen, cheeks, rounded posture, and violet-blue rim glow return gradually.

3.6–4.8 seconds: the mascot clips the canteen back onto its belt and notices gentle movement beneath the clear surface. It leans forward with calm curiosity while keeping both knees and its entire body safely on the bank.

4.8–6.0 seconds: from above the mascot's shoulder, reveal the five natural aquatic connection motifs moving beneath the unbroken water surface: silver messenger fish, coordinated school, layered-shell turtle, violet koi, and an orderly line of small fish. The mascot watches quietly with softened star-shaped eyes and a small relieved smile.

SETTING AND LIGHTING
Continue the same desert cliffs, oasis geography, and sun direction. Add natural pearl-blue reflections, surface ripples, shallow-water caustics, thin mist, and gentle foliage movement. The aquatic creatures remain beneath the water. No portal, hard transformation, aquarium wall, underwater room, or cross-sectional water view.

CAMERA
Start at 28 mm behind the mascot's left shoulder and track toward the oasis. At 1.4 seconds, cut to a 50 mm side medium with the lens approximately 40 centimetres above the waterline. At 3.6 seconds, cut to a 35 mm high over-the-shoulder composition and tilt downward no more than 20 degrees while remaining fully above the surface. Finish with a slow 0.4-metre push toward the clear shallows, ending exactly on @B160R2. The camera never touches, crosses, or passes beneath the waterline.

HARD PHYSICAL CONTINUITY
The mascot never enters the water, becomes submerged, floats, dives, or appears behind an underwater plane. Its head, face, torso, backpack, helmet, binoculars, and canteen remain above water and physically connected to the dry bank in every frame.

MOOD
Release, safety, nurturing restoration, then calm confidence and curiosity.
```

Why it worked: the first version drowned the mascot because the end boundary was a split level cutaway and the camera line said "tilt down through the water". The fix replaced the boundary, gave the camera absolute physical limits in centimetres and degrees, cut seven actions down to four beats, and added a HARD PHYSICAL CONTINUITY block that states the impossible state as a physical rule. Camera language is physics; the prompt now treats it that way.

### Scene 4 "The Living Skill Tree" (job 22c6a070, approved, @B160R2 start_image, @B215R3 end_image)

```text
START AND END
Begin from the exact corrected @B160R2 mascot, dry bank, continuous water surface, aquatic creatures, backpack, secured instruction scroll, costume, light, and geography. End on the exact corrected @B215R3 composition.

SUBJECT AND ACTION
0.0–1.4 seconds: the mascot removes the same small cream instruction scroll from its backpack and places it on dry sand beside the water. It unrolls only 20–25 centimetres. One pearlescent continuous-path line leaves the exposed scroll edge, flows into the sand, and becomes a compact root network. The mascot leans forward with focused curiosity.

1.4–3.0 seconds: one green shoot emerges from those roots and grows into an elegant palm. Its broad asymmetric crown unfolds with at least twelve clearly visible primary fronds or branches plus additional depth, communicating an expandable library rather than six fixed skills. The mascot rises and tracks the growth upward with wide star eyes and a softly open mouth.

3.0–4.5 seconds: many branches visibly bear abundant clusters of organic pearl, blue, violet, jade, and restrained soft-gold fruit. At least eight fruits remain readable. Several translucent fruits briefly reveal only wordless outcome motifs: forecast curve, competitive brief, shelf plan, creative board, geographic map, negotiation brief, presentation deck, and market summary.

4.5–6.0 seconds: one reachable violet-pearl fruit remains visibly attached by its stem to a lower branch. The mascot touches it once. The attached fruit ripens and opens like a graceful seed pod, presenting one finished blank-cover competitive intelligence brief. The mascot receives the brief with both hands and examines the small precise source notches along one page edge. After the brief is removed, the empty pod gently closes while remaining attached to the branch, matching @B215R3. The mascot gives a proud restrained closed smile.

SETTING AND LIGHTING
Identical corrected oasis geography. The mascot, scroll, roots, tree, and brief remain completely on dry ground. The water remains one continuous horizontal reflective surface viewed from above; aquatic motifs are only naturally refracted beneath it. Warm sun camera-left/back, cool sky fill overhead, pearl-blue water bounce camera-right/front, and restrained soft-gold completion glow only around the selected fruit and brief.

CAMERA
Start at 50 mm medium and make a slow 0.6-metre dolly toward the small scroll. At 1.4 seconds, cut to 28 mm low angle and crane upward 4 metres with the growing trunk while orbiting clockwise no more than 20 degrees. At 3.0 seconds, settle into a 35 mm medium-wide. At 4.5 seconds, cut to a 65 mm character-and-fruit close-up with a slow 0.4-metre push and gentle ease-out. End exactly on @B215R3. No rapid spin, zoom, underwater camera, or waterline crossing.

HARD PHYSICAL AND STORY CONTINUITY
Exactly one small instruction scroll; it never becomes a giant parchment, map, or rug. Exactly one brief, appearing only after the attached fruit opens. The selected fruit never floats, detaches, duplicates, or leaves its branch. No split-level water, aquarium wall, submerged mascot, water around the mascot's feet, dashboard, interface, or generated text.

MOOD
Organic wonder, abundance, understanding, and earned confidence. Never turn the tree into a dashboard.
```

Why it worked: exact counts as positive locks ("at least twelve", "at least eight", "exactly one"); physical size pinned on the symbolic prop ("unrolls only 20–25 centimetres") so it cannot literalize into a giant map rug; the causal chain scroll to roots to shoot to tree to fruit to brief is written as one visible sequence; and the floating prop tendency is preempted ("visibly attached by its stem"). Its end boundary had been repaired twice at the stills layer before this job ran, so the video landed on a physically true target.

### Scene 5 "The Phoenix" (job 01a4f506, approved, @B215R3 start_image, corrected @B270R end_image)

```text
START AND END
Begin from the exact corrected @B215R3 brief, fruit-bearing tree, small instruction scroll, compact roots, mascot pose, dry bank, continuous water surface, geography, and light. End on the exact corrected @B270R hero composition.

SUBJECT AND ACTION
0.0–1.5 seconds: the oasis becomes still. Warm pearl-blue light gathers beneath the intact water surface near the tree roots. The mascot looks up as moving reflections cross its face. Water rises in one coherent column beside the bank and droplets become pearl, blue, violet, and restrained soft-gold feathers. One majestic, kind phoenix is born from the oasis water itself—no fire, smoke, destruction, or threat. The mascot changes from wonder to trust.

1.5–3.2 seconds: the phoenix opens its wings once with believable weight, settles securely on dry ground beside the mascot, and lowers its integrated pearl-and-gold harness. Clearly show the fitted saddle frame, luminous safety band, reins, step, and one document sleeve beside the saddle.

3.2–4.6 seconds: the mascot places the same single source-notched brief into the harness document sleeve until the lower and side edges are visibly secured. The brief never duplicates or floats. The mascot uses the step, climbs aboard naturally, settles inside the safety band, places both hands on the reins or front safety handle, and looks toward the horizon with quiet determination. Helmet, backpack, binoculars, and refilled canteen remain unchanged.

4.6–6.0 seconds: the phoenix makes one powerful graceful wingbeat, rises, and flies screen-left-to-screen-right beyond the oasis. The mascot's determined expression becomes exhilarated while both hands remain safely on the reins. Below, the living many-fruited tree, small instruction scroll, root system, and reflective oasis remain; the desert continues ahead. End completely stable on @B270R.

SETTING AND LIGHTING
Same corrected oasis and desert geography. The water stays one continuous horizontal reflective surface with no cross-section. Warm sun remains camera-left/back; cool sky fill and pearl-blue reflection remain below; restrained atmospheric rays and horizon bloom. Water droplets become feathers without turning into neon trails.

CAMERA
Start 35 mm medium-wide and dolly backward 1 metre as the phoenix forms. At 1.5 seconds, cut to 28 mm low front three-quarter and hold a stable horizon. At 3.2 seconds, cut to 50 mm performance medium for securing the brief and boarding. At 4.6 seconds, transition to 24 mm and crane backward and upward 6 metres with smooth ease-out, ending completely stable on @B270R for the team-shot transition. No whip pan, crash zoom, underwater camera, waterline crossing, or orbit around the flying subject.

HARD PHYSICAL AND STORY CONTINUITY
Exactly one phoenix, one mascot, one brief, one document sleeve, one tree, and one small instruction scroll. The brief leaves the mascot's hands only by being placed into the harness sleeve and remains secured there through flight. The mascot's hands hold the reins during takeoff and flight. The phoenix is born from water-light, never fire. No loose papers, duplicated props, detached harness, unsafe riding pose, scary bird, dragon, split-level water, aquarium wall, submerged mascot, neon ribbons, text, or logos.

MOOD
Renewal, protection, trust, capability, and cinematic uplift—not fantasy aggression.
```

Why it worked: the held prop problem (a loose brief flapping in flight) was solved at the stills layer first: the end boundary was edited so the brief sits in a harness sleeve and the hands hold the reins, and the prompt then narrates exactly that transfer ("The brief leaves the mascot's hands only by being placed into the harness sleeve"). Counts lock everything singular. The spectacle (a phoenix born from water) happens inside stated camera moves, so the model performs it as cinema rather than an effect.

## 3. Approved targeted edit prompts

### Scene 1 error tumbleweeds (job d4fca50e, video_edit, approved and locked as Scene 1)

```text
Edit the supplied Scene 1 source video. The source video is the absolute authority for all motion, timing, camera work, framing, mascot identity, expression, gait, canteen action, props, desert geography, wind, lighting, color, depth, and transition frames. Change only the addition of four natural error tumbleweeds distributed across time exactly as shown by the approved storyboard reference. Do not rebuild or restage the shot.

0.0 to 1.3 seconds. One small distant dry thorn tumbleweed rolls along the existing wind direction in the middle distance. Its small weathered sand colored canvas tag reads exactly ERROR 404.

1.3 to 2.8 seconds. The first tumbleweed exits naturally. One medium tumbleweed crosses the route several metres behind the walking mascot. Its dust worn tag reads exactly CONNECTION FAILED. It never overlaps the mascot.

2.8 to 4.3 seconds. The second tumbleweed exits. One medium tumbleweed passes through the lower right middle ground while the mascot performs the existing canteen action. Its worn tag reads exactly CONTEXT WINDOW EXCEEDED. Preserve the mascot's face, body, canteen, timing, and silhouette completely.

4.3 seconds to the final frame. The third tumbleweed exits. One final tumbleweed rolls to the existing broken path stone and settles naturally beside it. Its tag reads exactly DEAD END. It does not cover the stone or mascot. Finish on the exact original final composition and expression.

Show only one prominent tumbleweed at any moment. Each tumbleweed is an irregular sphere of dry thorn branches that matches the desert scrub. Scale, orientation, speed, depth, and focus vary naturally. Moving tumbleweeds create small grounded dust wakes and inherit the source motion blur. The final settled tumbleweed has no dust wake. Each message is printed in distressed dark umber stencil lettering on a small faded sand colored canvas or parchment tag tied into the branches with dark twine. The tag follows the tumbleweed curvature and perspective, catches the original warm light, casts shadow into the thorns, and inherits dust, motion softness, and depth of field.

Do not change any existing source action or introduce new cuts. No group of tumbleweeds in one frame. No staged arrangement, oversized foreground tumbleweed, clean white sign, modern plaque, floating caption, interface card, speech bubble, neon, extra mascot, new prop, altered expression, altered costume, altered environment, typo, gibberish, extra words, title, logo, or watermark.
```

Why it worked: the source video is declared the absolute authority in the first sentence, and exactly one class of change is allowed. The inserts are distributed across the timeline, one prominent element at a time, and every physical integration cue is stated (curvature, light, shadow, dust, motion blur, depth of field), so the additions inherit the scene instead of sitting on it. Caveat proven later: the long tag texts still garbled in output (short words held, long phrases mutated), which is why the final canon puts all tag typography in post.

### Scene 5 phoenix replacement (job bdd46219, video_edit, approved)

```text
Edit the supplied Scene 5 source video. The source video is the absolute authority for all motion, timing, camera work, framing, cuts, mascot identity, mascot expression, brief handling, mounting action, harness action, wingbeat timing, flight path, screen direction, tree, fruit, oasis, geography, lighting, color, depth, opening frame, and final frame. Change only the white water bird into the approved full body phoenix. Do not rebuild or restage the shot.

Before the bird appears, preserve the source water, tree, glow, mascot, and environment exactly. From the first frame in which any part of the bird becomes visible, it is already the same solid red and gold phoenix shown in the approved reference. There is no white bird phase, pale silhouette, liquid bird phase, recoloring, species change, or second creature.

Preserve the source emergence timing, body motion, mounting choreography, wing motion, lift, and left to right flight. Apply the approved phoenix anatomy consistently to every visible frame: powerful compact feathered torso, proud chest, elegant strong neck, refined beak, intelligent amber eye, natural swept feather crown, two enormous anatomically believable wings, visible feathered legs and bronze talons, and a long cascading fan of physical crimson, copper, amber, and gold tail feathers. The complete silhouette must remain readable in the wide flight view.

The phoenix is deep ember red and burgundy through the torso and inner wings, rich copper and amber through the layered feathers, and brilliant gold at the chest and leading edges. Controlled living fire appears only along the outermost wing tips, crown tips, and ends of the longest tail feathers. Flame follows feather direction and never hides the anatomy or touches the mascot, harness, saddle, reins, brief, tree, water, or environment. The bird remains solid, opaque, physical, feathered, and rideable.

Preserve the existing pearl and soft gold harness, saddle, safety band, reins, stirrup, brief sleeve, and central pearl ornament. Keep them in their exact source positions and fit them naturally around the phoenix with believable tension. Preserve the mascot's exact body, pith helmet, backpack, face, star eyes, expression, position, and actions.

No generic eagle, hawk, swan, heron, peacock, dragon, griffin, rooster, white plumage, water tail, liquid wing, transparent body, color transformation, angry eye, screaming beak, body made entirely of flame, smoke cloud, explosion, burning environment, extra wing, duplicated limb, malformed talon, extra creature, camera change, new cut, altered expression, title, logo, text, or watermark.
```

Why it worked: this is a recolor and redesign of one element that touches nothing else, and the video honored it while preserving the eruption timing, mount choreography, and flight path frame for frame. The identity lock "from the first frame in which any part of the bird becomes visible, it is already the same solid red and gold phoenix" killed the earlier failure mode where a white bird turned red mid shot. Note: the "controlled living fire" clause was later superseded by canon (no fire anywhere, the phoenix is water born); reuse the structure, not that clause.

### Scene 3 tool identities (job a998933b, video_edit, approved then withdrawn)

```text
Edit the supplied Scene 3 source video. The source video is the absolute authority for all motion, timing, camera work, framing, mascot identity, facial performance, drinking action, shoreline position, animal positions and swimming motion, waterline, reflections, caustics, geography, lighting, color, depth, and transition frames. Change only the visual identities of the five existing aquatic carriers when they appear. Do not rebuild or restage the shot.

Keep the camera lens physically above the water surface for every frame exactly as in the source. Keep the mascot fully on the shore with its face, helmet, torso, backpack, and limbs above water. Preserve the complete drink, swallow, recovery, expression, and posture timing.

Integrate these five tool identities directly into the bodies of the five existing aquatic carriers, following the approved reference:

1. The existing silver messenger fish uses refined Outlook blue coloring with a small recognizable Outlook envelope and O motif embedded naturally into its side scales.
2. The existing violet fish pair uses restrained Teams violet coloring with a small recognizable Teams T and people motif embedded naturally into their side scales.
3. The existing deep blue lower fish uses rich blue coloring with a small recognizable Confluence ribbon motif embedded naturally into its side scales.
4. The existing turtle uses a violet blue shell with a small recognizable OneNote N and notebook motif built into one shell plate.
5. The existing coordinated small school uses subtle mint green accents with a small recognizable two person Contacts motif carried by the leading fish.

The motifs are physical parts of scales, fins, or shell. They follow body curvature, underwater perspective, refraction, caustics, surface ripple, animal motion, depth of field, and lighting. They remain readable through the clear water without becoming flat graphics.

Do not change the number, position, size, species, path, or swimming motion of the existing animals. Do not alter the mascot, drink action, camera, shore, water, environment, or light. No floating labels, written product names, pill badges, circular medallions, plaques, interface graphics, oversized logos, stickers, callouts, new animals, underwater camera, submerged mascot, extra mascot, childish toy styling, title, or watermark.
```

Why it is here anyway: the edit preserved the source perfectly and the take was approved, then the approval was revoked when frame review showed only the OneNote turtle mark survived; the four small motifs drifted or vanished. The prompt was correct and the demand was beyond the model: small branded marks do not survive generative video. The working end state was bold single color patches on the largest flat surfaces as tracking placeholders, exact artwork applied in post. Keep the prompt shape; change what you ask small marks to do.

### The Scene 4 continuity bridge (job e1971966, omni_reference, accepted as final Scene 4)

Conditioning: the actual last frame of approved Scene 3 as start_image, the actual first frame of approved Scene 5 as end_image, the mascot reference and a continuity strip as image_references.

```text
SCENE 4 CONTINUITY BRIDGE. Six seconds. One continuous cinematic shot. The supplied start image is the exact first frame and must be matched at 0.0 seconds. The supplied end image is the exact final frame and must be matched at 6.0 seconds. Preserve the same mascot, safari hat, backpack, rounded white body, short limbs, navy face, purple star eyes, pink cheeks, premium polished 3D animation, twilight oasis shoreline, warm soft gold key light, cool blue water reflections, violet accents, realistic sand, soft volumetric atmosphere, shallow cinematic depth of field, and natural motion.

0.0 to 0.7 seconds: Continue directly from the start frame. The mascot remains kneeling on the dry shoreline. In one single deliberate action, one hand reaches once to the side of the backpack, visibly grips a rolled parchment scroll, and immediately withdraws it completely. The scroll must be visible as it leaves the backpack. No empty reach. No second reach. The aquatic tool companions remain at the water surface and drift calmly toward screen right.

0.7 to 1.6 seconds: Without a cut, the mascot places the same scroll on dry sand beside the water and unrolls it once. It is never placed on or under the water. The mascot does not reach into the backpack again. A simple luminous route on the parchment ends at one bright circular marker positioned at the exact future tree root point.

1.6 to 2.5 seconds: The marker sends a narrow pearl blue and violet pulse directly into the sand at that same point. A first green shoot breaks through the exact marked point. Growing roots gently lift the parchment edge and curl the same parchment back into one rolled scroll that settles immediately beside the emerging root base, matching its location in the supplied end frame. The scroll does not teleport and the growth point never moves.

2.5 to 4.5 seconds: The single shoot grows continuously from that fixed root point into the same mature graceful oasis tree shown in the end image. The trunk, roots, canopy, shoreline, waterline, and horizon stay spatially locked. Branches emerge naturally and carry abundant pearl, blue, violet, green, and soft gold skill fruit. The camera makes only one slow smooth widening move to reveal the full tree. No hard cut, no pullback jump, no closeup, no change of camera axis.

4.5 to 5.5 seconds: One ripe luminous fruit opens on the tree. Its light resolves into one clean completed business brief with no readable small text. The mascot stands naturally and receives the brief with both hands. The rolled scroll remains on the sand at the same tree root base. The aquatic companions remain above water and move out of primary focus naturally. No underwater view.

5.5 to 6.0 seconds: Settle precisely into the supplied end frame. The mascot stands screen left holding the completed brief. The mature fruit tree is rooted at the exact marked position. The rolled scroll lies at the same root base. The water and horizon match. Hold stable for the Scene 5 cut.

HARD CONTINUITY LOCKS: identical mascot face and proportions throughout. One mascot only. One scroll only. One reach only. One tree only. The scroll, marker, first shoot, roots, mature tree, fruit, and brief form one visible causal chain. Never place the scroll on water. Never move the root point. Never cut away. Never go underwater. No phoenix in this scene. No logos. No readable generated text. No interface graphics. No new props. No extra limbs. No robotic redesign. No abrupt zoom. No time jump.
```

Why it worked: the boundary anchor doctrine at full strength. Both conditioning frames are real frames from the adjacent approved clips, so the model has nowhere legitimate to drift, and every spatial fact (the root point, the scroll's resting spot) is pinned to a fixed coordinate that the end frame already proves. One camera move for the whole shot. The causal chain is named as a chain. This job repaired the film's worst continuity gap in one 18 credit take and was accepted with "ok i accept".

## 4. Approved stills layer prompts

### Boundary regeneration @B160R2 (job dc627c9d, approved)

```text
Create one fresh 16:9 final boundary still named @B160R2 for the cinematic animated-feature film "From Desert to OASYS." Do not reproduce any previous split-level oasis composition.

REFERENCE ROLES IN ORDER
1. @B110: preserve the exact mascot identity, explorer costume, backpack, secured scroll-map, binoculars, canteen, desert geography, travel direction, and warm sunset light.
2. @Mascot: exact body proportions, materials, face, star-shaped eyes, pink cheeks, and violet-blue rim glow.
3. @Expressions: use softened relief and calm curiosity.
4. @Motifs: interpret the aquatic connection motifs as natural living creatures seen through real water.
5. @Look: preserve the premium cinematic palette, oasis geography, environmental scale, and light direction.

COMPOSITION AND PHYSICS
Camera is fully above the oasis, approximately two metres high, using a 35 mm high three-quarter over-the-left-shoulder view tilted downward 30 degrees. The mascot kneels securely on a dry sandy bank in the left third. Its complete body, helmet, backpack, scroll-map, binoculars, canteen, knees, and feet are visibly above the water and connected to dry ground. Only two fingertips lightly touch the surface.

The water occupies the centre and right of frame as one continuous horizontal surface plane covered by natural reflections, ripples, glare, and refraction. No vertical water face is visible. Beneath that intact surface, suggest the five connection motifs through naturally refracted silhouettes and partial forms: a silver messenger fish, one coordinated school, a layered-shell turtle, a violet koi, and an orderly line of small fish. They are seen from above through the surface, never from the side. Surface reflections must partially obscure them as in real shallow water.

CHARACTER AND MOOD
Exactly one mascot, looking downward with softened star eyes, a small relieved closed smile, and restored but restrained energy. Premium emotionally grounded 3D animated-feature style, physically plausible and sophisticated.

LIGHTING AND FINISH
Low warm sun camera-left/back, cool sky fill overhead, pearl-blue oasis bounce camera-right/front, detailed shadows, realistic rippled reflections, subtle caustics beneath the surface, restrained bloom, atmospheric depth, natural perspective, and subtle film grain.

HARD NEGATIVES
No use of the previous @B160 composition. No split-level view, no half-above-half-below image, no cross-section, no cutaway, no vertical wall of water, no aquarium, no underwater camera, no exposed underwater scene, no submerged mascot, no waterline crossing the mascot, no diving, swimming, or floating, no portal, no neon ribbons, no holographic UI, no text, logo, extra mascot, reversed light, or character redesign.
```

Why it worked: the flawed predecessor was DROPPED from the reference set entirely. The previous attempt kept the flawed image as a reference and reproduced the defect through every negative; removal of the reference, not more prose, fixed it.

### Surgical pod removal, @B215R3 (job 8a4e0c52, approved)

```text
Edit the supplied Scene 4 boundary still with one surgical correction only.

Remove the single detached glowing violet open pod floating in the air between the mascot and the tree. Remove it completely and reconstruct the natural background behind it. Do not add or replace any object.

Preserve every other pixel-level story element and composition: the exact mascot identity, pose, expression, explorer costume, single source-notched brief held in both hands, abundant attached pearl-blue-violet-jade-gold fruit clusters, broad many-frond tree, silver root network, one small partially unrolled cream instruction scroll at the trunk base, dry sand, continuous natural water surface, landscape, camera, lighting, color, materials, and cinematic finish.

HARD NEGATIVES
No floating pod, no detached fruit, no new pod, no new fruit, no giant parchment, no map, no duplicate scroll, no duplicate brief, no extra mascot, no text, no logo, no split-level water, no aquarium, no submerged mascot, no character redesign, and no changes outside the removed object area.
```

Why it worked: object removal with background reconstruction works first try where spatial reattachment fails. Two attempts to reattach the floating pod to a branch had failed; the winning move gave up on attachment and deleted the object, because the video only needed the aftermath state. One surgical correction, an explicit preserve list, and "no changes outside the removed object area".

### Scene 5 hero endpoint correction @B270R (job 4b28ae63, approved)

```text
Edit the supplied 16:9 Scene 5 hero boundary still with one narrowly scoped continuity correction. Preserve the exact phoenix, mascot identity and expression, explorer costume, backpack, helmet, binoculars, canteen, functional pearl-and-gold harness, saddle, safety band, reins, flight direction, wing pose, water-born pearl-blue-violet-gold materials, droplets, fruit-bearing tree below, oasis, desert horizon, camera, composition, lighting, color, and cinematic finish.

ONLY REQUIRED CHANGE
Remove the single loose business brief from the mascot's hands. Place that same brief securely inside one fitted pearl-and-gold document sleeve integrated beside the saddle within the harness. The sleeve must visibly grip the brief along its lower and side edges. Keep a small portion of the blank cream cover and the precise source notches visible above the sleeve so the brief remains identifiable. The brief does not flap in the wind.

Place the mascot's two hands naturally on the reins or the front safety handle. Preserve the seated posture inside the luminous safety band and the exhilarated but trustworthy expression.

Exactly one brief in the entire image. Do not create a second document, paper, map, scroll, or loose sheet.

HARD NEGATIVES
No brief in the mascot's hands, no loose paper, no floating paper, no duplicate brief, no missing harness sleeve, no detached harness, no unsafe riding pose, no altered mascot face or proportions, no altered phoenix anatomy, no scary bird, no dragon, no fire, no smoke, no neon ribbons, no text, logo, extra mascot, reversed flight direction, reversed lighting, changed tree, changed oasis, or changed composition.
```

Why it worked: the held prop law applied at the stills layer for 1.5 credits before an 18 credit video existed. One narrowly scoped change with an ONLY REQUIRED CHANGE header, a physical description of the desired end state (the sleeve visibly grips the edges), a count lock, and a preserve first framing. The corrected still then became the Scene 5 end boundary, so the video inherited the fix.

### Closing hero fix (nano banana masked edit path, approved on all verification lenses)

```text
Edit this image. Make exactly two changes and keep everything else identical. 1) Replace the grape cluster palm on the left with a natural green date palm: plain date palm fronds and dates only, no grapes. 2) Convert the phoenix wings and tail from fire and flame into solid opaque feathers in copper, amber, red, and gold, clean layered feathers, no fire, no flames, no embers, no smoke, no glowing wisps. Keep the mascot rider exactly: same face, helmet, visor, body, proportions, pose, reins, harness. Keep the phoenix body, head, beak, the oasis water, palms, sky, lighting, and composition unchanged. Photoreal cinematic still, warm sunset light.
```

Why it worked: exactly two changes, both named as replacements with the desired end state described positively, plus a full preserve list. Contrast with the failed five target removal pass on the look plate, which painted IN the objects it named. One or two targets per edit pass is the ceiling.

## 5. The style template: corrective v4 Scene 1

The director's ruling made this the recipe: natural chronological language of roughly 350 words, timestamped, with one compact negative block. Constraint wall prompts failed twice where this style passed first try when reused with minimal deltas.

```text
Create one six second 16:9 cinematic animated feature shot that begins on the exact @B00 geography and ends on the exact @B055 resting composition.

0.0 to 1.4 seconds. The exact mascot walks screen left to screen right across the vast desert with cautious determination. Start at 28 mm in a low rear left wide view. Track laterally at walking speed. Warm sun remains camera left and behind. Preserve the approved costume, backpack, binoculars, canteen, proportions, face, star eyes, and pearl material.

1.4 to 3.6 seconds. Dry wind strengthens. Four large natural thorn tumbleweeds roll through the route at different depths without striking the mascot. Each tumbleweed carries one rigid matte ivory rectangular plaque fixed into its branches with four dark rivets. Keep every plaque planar, undamaged, unobstructed, and facing within fifteen degrees of the camera for at least twelve consecutive frames. Leave the plaque faces completely clean for tracked typography in post. Do not generate letters, symbols, numbers, or fake writing. The intended final messages are CONTEXT WINDOW EXCEEDED, CONNECTION FAILED, ERROR 404, and DEAD END. The mascot reads the obstacles as repeated failure. Its eyelids lower, shoulders sink, mouth turns down, and glow dims.

3.6 to 4.8 seconds. Cut to a 50 mm front three quarter medium. The mascot tips the same canteen and receives only two drops. One error tumbleweed crosses the deep background while another settles against a rock, preserving clear separation from the mascot.

4.8 to 6.0 seconds. The mascot reaches the weak shade, sits heavily, places the canteen beside its foot, bows its head, and closes its eyes. Finish stable at mascot eye height in the exact @B055 composition.

The tumbleweeds must look physical and dry, not like interface graphics. No floating labels, speech bubbles, dashboard panels, neon, duplicate mascot, extra props, or generated words. The emotion moves from determined to overwhelmed to exhausted. No permanent smile.
```

One warning inside this template: naming the intended post messages in the prompt leaked garbled versions of them onto the plaques. The later canon removes forbidden words from the prompt entirely; the take that stopped mentioning words rendered clean blank surfaces.

## 6. The distilled formula

A winning scene prompt on this stack is built from these parts, in this order:

1. One opening sentence: format, duration, aspect, medium ("Create one six second 16:9 cinematic animated feature source clip... Imagery only."), audio off.
2. Reference roles: each supplied image named with exactly one responsibility and an exclusion clause. Boundary images declared exact composition targets.
3. Identity and continuity block: the character sheet in words, repeated identically on every job, plus world constants (travel direction, sun position, geography) and the prop rule (props never teleport or duplicate).
4. Cinematic language block: theatrical feature animation, physical weight, quiet acting, effects secondary to story, every camera move with stated start, path, speed, easing, and end frame.
5. Start and end: begin on the exact start image, end on the exact end image.
6. Timestamped beats: three to four beats for six seconds, one principal action each, chronological, with the emotional arc written as physical performance. Travel, when it matters, is the central stated event.
7. Setting and lighting: continuity of geography and light, plus any physical rules (what stays above water, what stays on dry ground).
8. Camera: lens in millimetres per segment, physical moves with distances and easing, an explicit end framing, and absolute physical limits where the model has previously sinned.
9. Positive locks: exact counts ("Exactly one mascot. Exactly one scroll.") and hard physical continuity for the scene's known risk.
10. One compact negative block: specific nouns from real failures, kept short. Never name forbidden words or banned text content; never name completed actions as poses.
11. Mood: one or two lines, ending on what the scene must never become.

Working ranges: roughly 350 words for a six second scene, 150 to 200 for a five second single shot. Over 600 words of labeled locks degrades obedience. Six seconds holds about four dependent actions. One camera move per shot generates cleanest; write cuts only when you truly want them, and prefer making cuts in the edit.

For targeted edits, the formula compresses to: source is absolute authority, change only X, describe X's physical integration into the scene, preserve list, negative block, no new cuts.

## 7. Reusable template

Replace bracketed parts. Keep the section order.

```text
Create one six second 16:9 cinematic animated feature source clip for "[FILM TITLE]." Imagery only: no generated speech, music, captions, title cards, labels, logos, interface panels, or written words.

REFERENCE ROLES
@[Hero] defines the exact identity, proportions, materials, and costume of the only [hero]. It does not control pose, camera, or background. @[Expressions] defines the permitted acting range. @[Look] defines the unified geography, palette, atmosphere, scale, and light direction. Use the supplied boundary images as exact composition targets, not as loose inspiration.

IDENTITY AND CONTINUITY
Exactly one [hero]. Preserve [the full character sheet in words: body, face, eyes, signature marks, costume, carried kit]. Maintain [travel direction], the same [geography constants], one [sun position], and [fill light description]. Props never teleport, duplicate, disappear between actions, or change design.

CINEMATIC LANGUAGE
Emotionally grounded theatrical 3D feature animation, not an explainer or advertisement. Physical weight, quiet acting, large environments, restrained wonder. Natural perspective and motion blur, detailed shadows, soft highlight bloom, atmospheric depth, subtle film grain. Every camera move has a stated start, path, speed, easing, and end frame. Effects remain secondary to character and story.

START AND END
Begin on the exact composition of @[StartBoundary]. End on the exact composition of @[EndBoundary].

SUBJECT AND ACTION
0.0 to [t1] seconds: [beat one: one principal action, physical performance, emotional state].
[t1] to [t2] seconds: [beat two].
[t2] to [t3] seconds: [beat three].
[t3] to 6.0 seconds: [final beat that lands exactly on the end boundary state].

SETTING AND LIGHTING
[Continuity of place and light; the scene's physical rules, stated as facts about the world.]

CAMERA
Start at [mm] [position]. [Move with distance and easing]. At [t] seconds, cut to [mm] [position] and [move]. Finish [completely still / easing out] exactly on @[EndBoundary]. [Absolute physical limits: what the lens never crosses.]

HARD PHYSICAL AND STORY CONTINUITY
Exactly one [hero]. Exactly one [key prop]. [The scene's impossible states written as physical rules.]

[ONE COMPACT NEGATIVE BLOCK: specific banned nouns from your canon. No generated words. No character redesign. No extra characters. No teleporting props.]

MOOD
[Two lines: the emotional movement, then what the scene must never become.]
```

## 8. The canon Global Seedance block (current authority)

The recovered source of truth carries this revised global block as the standing authority for NEW image or reference to video work. It supersedes the section 1 scaffold for fresh generations; it is never prepended to source preserving video edits, whose formula stays "source is absolute authority, change only X."

```text
GLOBAL STYLE
Create one six second 16:9 cinematic animated feature source clip for From Desert to OASYS. Imagery only. Generated audio is off. No generated speech, music, sound effects, captions, title cards, labels, logos, interface panels, or written words.

REFERENCE AUTHORITY
Each supplied reference controls only its named role. The mascot reference controls identity and proportions. The expression sheet controls the permitted acting range without changing identity. The look reference controls geography, palette, atmosphere, scale, and light direction. Start and end images are exact composition and object state targets. Ordered action references define one physical action chain and must not contribute unrelated backgrounds, poses, objects, or text.

IDENTITY AND CONTINUITY
Exactly one mascot. Preserve the rounded pearly white capsule body, short limbs, dark navy inset oval face, star shaped eyes, pink cheeks, violet blue rim glow, sand beige pith helmet, brown backpack and bedroll, binoculars, and canteen. Maintain screen left to screen right travel, the same desert cliffs and oasis basin, one low warm sun camera left and behind, cool sky fill overhead, and pearl blue oasis bounce camera right and front. Props never teleport, duplicate, disappear between actions, or change design.

CINEMATIC LANGUAGE
Emotionally grounded theatrical 3D feature animation, not an explainer or advertisement. Physical weight, quiet acting, large environments, restrained wonder, natural perspective, natural motion blur, refined pearl materials, tactile sand and water, detailed contact shadows, soft highlight bloom, restrained halation, atmospheric depth, and subtle film grain. Every camera move states its start position, physical path, speed, easing, and end framing.

HARD EXCLUSIONS
No extra mascot. No character redesign. No fixed expression. No repeated reach. No duplicated scroll. No scroll on water. No disconnected roots. No tree emerging from a different point. No fixed six branch tree. No sparse fruit. No brief before a fruit opens. No unstable aquatic tool identity. No underwater camera. No submerged mascot. No white bird phase. No generic eagle. No species change. No changing harness. No generated words. No floating labels or icons. No interface. No neon ribbons. No cyberpunk clutter. No hard cut unless the scene prompt explicitly calls for one. No flash, portal, hidden transition, camera reset, camera teleport, abrupt zoom, or reversed light and travel direction.
```

Why it matters: this is the section 1 scaffold rewritten after every failure had taught its lesson. The exclusions are no longer style words; each one names a defect that actually happened (repeated reach, scroll on water, white bird phase, tree emerging from a different point). The reference authority block now covers ordered action references, and the prop rule gained "disappear between actions, or change design" after the canteen and map morphs.

## 9. Approved single shot prompts from the fragmentation arc

WARNING before reuse: every prompt below was approved as an individual shot, and the film assembled from these shots was rejected outright, which is the production's core failure (see the spine in SKILL.md and failure catalog entry 66). Reuse their prompt STYLE, which is the proven natural chronological language at 5 second scale, never their workflow. They are kept because they are first take or near first take acceptances and carry the style law's proof.

### Clip 1 v6 shots (all seedance_2_5 omni_reference, 5s, 480p, 16:9, audio off, 15 credits; refs @Mascot, @Expressions, @Look unless noted)

**S1 take 3 (job 76eae3f8, approved; @B00 as start_image).** Approved FIRST TRY after two 600 plus word constraint wall takes had failed with treadmill motion and literalized footprints. This is the style law's decisive case. The plaque rendered blank on this take: the take that stopped demanding blank tags is the one that delivered them.

```text
Create one five second 16:9 cinematic animated feature shot that begins on the exact @B00 geography. The exact mascot walks screen left to screen right across the vast desert with cautious determination, visibly covering ground throughout. Start at 28 mm in a low rear left wide view. Track laterally at walking speed. Warm sun remains camera left and behind. Preserve the approved costume, backpack, binoculars, canteen, proportions, face, star eyes, and pearl material. Dry wind strengthens. Two large natural thorn tumbleweeds roll through the route one after another at different depths without striking the mascot. Each tumbleweed carries one rigid matte ivory rectangular plaque fixed into its branches with four dark rivets, planar and facing near camera as it passes. The mascot reads the obstacles as repeated failure. Its eyelids lower and its glow dims slightly as it walks. The tumbleweeds must look physical and dry, not like interface graphics. No floating labels, speech bubbles, dashboard panels, neon, duplicate mascot, or extra props. No cut. Audio off.
```

**S2 take 1 (job 9b043d50, approved first try; NO first frame conditioning, because the film cut changes angle and the references carry identity across the cut).**

```text
Create one five second 16:9 cinematic animated feature shot. At 50 mm in a front three quarter medium view, the exact mascot walks slowly up the dune, reaches to its hip, lifts the same canteen, tips it, receives only two drops, and drinks with its eyes closing in disappointment. It lowers the canteen and keeps walking. Warm sun remains camera left and behind. Preserve the approved costume, backpack, binoculars, canteen, proportions, face, star eyes, and pearl material. The canteen stays one object with one design throughout. One large natural thorn tumbleweed rolls through the deep background carrying one rigid matte ivory rectangular plaque fixed into its branches with four dark rivets, keeping clear separation from the mascot. The tumbleweed must look physical and dry, not like interface graphics. No floating labels, speech bubbles, dashboard panels, neon, duplicate mascot, or extra props. No cut. Audio off.
```

**S3 retry (job f107886d, approved).** Identical to its rejected take except the canteen beat was DELETED after the prop morphed and teleported; the working move for a cursed prop is deletion, not retry.

```text
Create one five second 16:9 cinematic animated feature shot. At 35 mm in a low front three quarter view, the exact mascot reaches the weak shade of a rock overhang, slows, sinks down and sits heavily against the rock in one continuous weighted motion, rests its mitt hands on the sand, bows its head, and closes its eyes. Warm low sun remains camera left and behind, flaring softly through the rock gap. Preserve the approved costume, backpack, binoculars, proportions, face, star eyes, and pearl material. Dry wind blows sand streamers across the slope. One large natural thorn tumbleweed rests settled against a half buried broken path stone nearby, carrying one rigid matte ivory rectangular plaque fixed into its branches with four dark rivets, facing camera. A second natural thorn tumbleweed rolls across the deep background behind the overhang, carrying the same style of riveted ivory plaque, keeping clear separation from the mascot. The tumbleweeds must look physical and dry, not like interface graphics. No floating labels, speech bubbles, dashboard panels, neon, duplicate mascot, or extra props. No cut. Audio off.
```

**S4 retry (job 2dc050b3, approved only as the window frames 6 to 90, named S4a; refs plus @Scroll, an extracted S3 frame 109 as start_image, and the scene boundary as end_image).** The map morphed into a bottle at frame 96 and the ending dissolved into the end image instead of arriving by camera; both defects sit outside the approved window. Evidence for the salvage from the tail doctrine and for soft end conditioning.

```text
Create one five second 16:9 cinematic animated feature shot that begins on the exact start image, the mascot seated in the weak shade of the rock overhang with its head bowed and eyes closed. At 35 mm in a low front three quarter medium view, the mascot lifts its head and opens its eyes, reaches once over its shoulder into its own backpack, and visibly withdraws one cream parchment map. It unrolls the same map across its knees, traces the wordless pearl route once with its mitt, and looks up as its star eyes brighten with recognition. It rolls the map and keeps it in its mitt, then rises with a continuous forward weight shift and stands at the edge of the shade, gazing toward the ridge. The camera eases back and to the mascot's side in one calm continuous move, settling onto the exact end image composition: the mascot standing large in frame at the rock edge in side view, gazing toward the small distant palm oasis on the horizon. The oasis stays small, warm, and far away. Warm low sun remains camera left and behind. Preserve the approved costume, backpack, binoculars, proportions, face, star eyes, and pearl material. Keep one map throughout. The emotion moves from exhaustion to quiet hope. No floating labels, speech bubbles, dashboard panels, neon, duplicate mascot, extra props, or generated writing. No waterfalls, no lake city, no birds, no grapes or fruit clusters. No cut. Audio off.
```

**S4b living hold (job 04e78b99, approved; the arch boundary still in BOTH start_image and end_image roles).** The recipe for a stable living hold: the same frame at both ends plus per object stillness locks. The result breathed, blinked, and drifted dust while nothing entered or left the frame.

```text
Create one five second 16:9 cinematic animated feature shot that begins and ends on the exact supplied image: the mascot standing beneath the outer edge of the rock arch in side view, gazing through the arch toward the distant valley. The mascot stands nearly still, breathing gently, its soft glow pulsing faintly. The binoculars rest motionless against its chest on a taut strap, never swinging or rotating. All backpack straps stay rigid and perfectly still. The round thornbush on the far dune crest is rooted in place and never rolls, drifts, or bounces. The settled thorn tumbleweed and its blank plaque stay perfectly still. Faint dust haze drifts very slowly; the ground, rocks, and sand stay static. The sun glow stays steady with a gentle shimmer only. The camera is locked off. Nothing enters or leaves the frame and nothing changes position. The emotion is quiet hope. No new props, no birds, no generated writing. No cut. Audio off.
```

### Clip 2 shots F to J (all approved on the FIRST take after conditioning cleanup; 5s, 480p, 15 credits each; refs @Mascot, @Expressions, and the cleaned @Look)

The first take streak came from cleaning the conditioning first: the old look plate, which contained a pale phoenix and grape clusters, was replaced by a scrubbed version, and each shot conditioned only on verified assets. Every prompt ends with this exact shared tail, written once here as [TAIL]:

```text
Warm low sun remains camera left and behind, with cool sky fill and pearl blue water bounce. Preserve the approved glossy pearl capsule, navy face, star eyes, pink cheeks, tan helmet, brown backpack, binoculars and short limbs. Keep the accepted small pack furniture unchanged. If a canteen is handled, use only the matte dark charcoal rounded flask with black open spout and no strap. No generated writing, duplicate mascot, extra props, phoenix or grapes. No cut. Audio off.
```

**Shot F, wide descent (job a3227163).** Note the elapsed travel device: when a journey does not fit the shot, a cut carries the distance and the prompt says so in world terms.

```text
Create one five second 16:9 cinematic animated feature shot. At 28 mm, track forward behind the mascot's left shoulder as it walks down the last dry sandy slope toward the indigo oasis shoreline, visibly covering ground with each step. This is the shore after elapsed travel, not a two step journey from the distant arch. The oasis is already present; the landscape does not transform. The mascot approaches the dry bank with quiet anticipation. Keep the one cream scroll stored in its backpack. [TAIL]
```

**Shot G, close drink (job e9a62936).**

```text
Create one five second 16:9 cinematic animated feature shot. At 50 mm in a side medium at water level, the exact mascot kneels on the dry bank, cups water once, raises its cupped hands, drinks once, exhales, and lowers its hands in relief. Its eyes close softly, then reopen as its pearl sheen, cheek warmth and violet blue rim glow recover. Keep the mascot and camera above the water surface throughout. Use one continuous physically believable action. The one scroll stays stored in the backpack. [TAIL]
```

**Shot H, pool reveal (job 2f2f9ff1; the deterministic carrier composite as end_image).** CAUTION: the phrase "hands lowered after drinking" names a completed action and made the raw head replay the drink; the accepted window began after it. Reuse the structure with a positive pose ("kneeling calmly, hands resting at its sides").

```text
Create one five second 16:9 cinematic animated feature shot. At 35 mm, crane upward one metre and tilt gently down into a readable high three quarter view of the clear water, remaining above the surface. The exact mascot kneels camera left on the dry bank, hands lowered after drinking, star eyes bright with calm wonder. Reveal the same natural aquatic carriers camera right: one silver messenger fish with a bold blue flank patch, two violet fish each with a dark violet flank patch, one deep blue lower fish with a light cyan flank patch, one turtle with a violet central shell patch, and the mint school with a dark green flank patch on only its largest leader. Followers stay unmarked. They swim gently without changing species or marks. Settle into the supplied approved carrier boundary. The one scroll remains stored, with no reach begun. [TAIL]
```

**Shot I, scroll retrieval and placement (job 56d8110e; the carrier composite as start_image).** Its accepted window was later re ruled to end before the parchment crossed the water: windows are revisable in service of the film, and adjacent state must reconcile at every seam.

```text
Create one five second 16:9 cinematic animated feature shot beginning on the supplied approved carrier boundary. At 50 mm in a shoreline medium, the exact mascot remains kneeling on dry land. It reaches once into its backpack, visibly grips one cream parchment scroll and withdraws it completely. It places the same scroll on dry sand beside the water and unrolls it once. A wordless pearl route ends at one bright marker on the exact future root point. Finish with the single map flat on dry land and its marker still. The same aquatic carriers remain in the water with their established solid patches, both violet fish and the mint leader with unmarked followers preserved. No second reach. [TAIL]
```

**Shot J, shoreline growth (job 02ce0b3e; the carrier composite as an image reference and the organic tree still as end_image).**

```text
Create one five second 16:9 cinematic animated feature shot. At 40 mm in a wide shoreline view, begin with the same single parchment map on dry sand and the same fixed pearl route marker. A narrow pearl blue and violet pulse enters the sand at that marker. One green shoot breaks through that exact point. Solid organic roots gently curl the same parchment into one roll resting beside the root base. The shoot grows continuously into one graceful palm, with abundant natural fronds and separate organic pearl, blue, violet, jade and soft gold fruit, not grape clusters. The mascot watches with rising wonder as the camera makes one slow smooth widening move. Keep the shoreline, root point and aquatic carriers fixed in the same geography, their established patches held. The palm has at least twelve visible primary fronds and eight distinct fruits. No molten trunk or roots, no formless flare. One ripe fruit then opens into one completed business brief with no writing, received in the mascot's two hands while the single rolled map stays at the same root base. Settle onto the exact supplied organic tree end image with the finished brief held. [TAIL]
```

## 10. Cross model notes

What survives of the section 6 formula when a prompt leaves Seedance 2.5, and what does not. Grounded in the Seedance 2.5 delta sections of the model guides at references/model-guides/ (INDEX.md maps every family; each claim below carries its guide). The canon workflow itself does not move: these notes exist for stills work, finishing work, and any sanctioned off canon experiment, never as license to substitute the canon model on canon scenes.

### Parts of the formula that transfer

**The boundary frame method transfers everywhere, because nothing else exists.** No Higgsfield video id in any family exposes a seed (every guide confirms this per catalog read), so exact start and end frames remain the only determinism lever on the whole surface, exactly as the canon holds. The strongest confirmations: Higgsfield's own Kling doctrine, "use the final frame of each scene as the Start Frame of the next to anchor visual continuity" (kling.md); Grok Imagine 1.5's pinned last frame contract, "The video ends arriving on that image rather than re-rendering it as a reference," the strongest vendor worded end frame promise off canon (pika-midjourney-grok.md); FLUX 3's two keyframe interpolation with the caveat that the frames must be closely related or the fill path fails (flux.md); and Luma's keyframes, which accept a previous generation by id as a boundary (runway-luma.md). The trap is slot availability: only kling3_0 among the Kling ids takes an end image, MiniMax requires last_frame to be paired with first_frame, and the Veo end frame slot appears only on veo3_1_lite in the catalog (kling.md, minimax.md, google-video.md). Check the slot before planning a chain.

**The targeted edit formula transfers nearly verbatim.** "Source is absolute authority, change only X, preserve list, no new cuts" is close to a universal law. MiniMax H3 markets it as "Change One Thing, Keep Everything Else" (minimax.md). Kling's vendor edit phrasing is "Change [specified subject] in [@Video] to [target subject]" with vague wording named as the failure mode (kling.md). OpenAI's GPT Image doctrine is "use 'change only X' + 'keep everything else the same,' and repeat the preserve list on each iteration to reduce drift" (openai.md). FLUX states "An edit prompt describes a change, not a shot," with unmentioned content preserved by default (flux.md). Grok's editing endpoint modifies "only what you ask for while keeping the rest of the video intact" (pika-midjourney-grok.md). Nano Banana's semantic masking template is the canon's ONLY REQUIRED CHANGE header in Google's own words (nano-banana.md). This is the most portable piece of the whole canon.

**One variable per retry is independently prescribed by three vendors.** Runway: "Adding one new element at a time will help you identify which additions improve your video" (runway-luma.md). Higgsfield on Gemini Omni: "Change one variable at a time so you can identify what worked" (google-video.md). The Seedream community workflow is draft, baseline, iterate one layer at a time (seedream.md). The canon retry gate needs no translation anywhere.

**One reference, one job, with an exclusion clause.** ByteDance's own working counts for Seedance ("1-8 subjects generally produce better results" against a 50 slot ceiling) vindicate the canon's small matched reference discipline, and every other family either endorses or enforces it: the MiniMax H3 community scoping pattern, "Video 1 defines the hand trajectory and movement timing only. Do not copy its actor, wardrobe, setting, lighting, or camera movement" (minimax.md), is the canon's exclusion clause word for word in another dialect; Kling's Element caps of 3 or 7 enforce the discipline structurally (kling.md); Nano Banana pre types the budget into object, character, and style slots (nano-banana.md). What changes is only the addressing syntax: @ roles on canon, ordinals ("Image 1", "character1") on Wan and MiniMax, "image 1" on FLUX, prose binding on Nano Banana.

**Physical performance and one camera move per shot.** The canon writes emotion as eyelids, shoulders, and glow, and camera as one physical event per segment; the field agrees. Sora 2's own strong example is beat counted physicality, "Actor takes four steps to the window, pauses, and pulls the curtain in final second" (openai.md). Kling prescribes "One main camera move per shot" tied to the subject's action (kling.md); Seedance 2.0's guide says the same from inside the family ("Try to specify only 1 type of camera movement in a single shot"); FLUX caps it at one framing term plus one movement term per sentence (flux.md); Luma community converges on one action verb and one camera move per clip (runway-luma.md).

**Draft cheap, finalize high.** The canon's 480p draft tier maps directly onto Runway's Turbo then Gen-4 ladder, Kling's turbo id and 720p draft rule, Omni Flash's 360p draft floor, FLUX's draft cache (approve a fast draft, reproduce it exactly at full quality), and the Nano Banana 2 explore then Pro finalize tiering (runway-luma.md, kling.md, google-video.md, flux.md, nano-banana.md).

**Exact counts transfer in intent but weaken in force.** The canon's positive count locks ("exactly one mascot", "at least twelve fronds") remain the right shape everywhere, but Kling's vendor concedes that current models "are not sensitive to numbers, making it difficult to maintain consistency in counts" (kling.md). Off canon, carry the count in the conditioning imagery, not only in prose.

### Parts that are Seedance specific

**Integer second timestamped beats are a 2.5 feature, not an industry norm.** Even inside the ByteDance family, "Seedance 2.0 does not respond to timestamps and only responds to shot numbers" (seedance.md); a timecoded canon prompt aimed at 2.0 must become Shot 1, Shot 2, Shot 3. Coarse ports exist: Veo 3.1 accepts bracketed windows like "[00:00-00:02]", FLUX 3 documents timestep prompting with 2 to 3 beats per 5 seconds, Wan's multi shot formula uses "Shot 1 [0–3 s]" lines, and Runway supports approximate bracketed windows (google-video.md, flux.md, wan.md, runway-luma.md). No port exists at all on Sora 2, whose doctrine is "Treat your prompt as a creative wish list, not a contract," nor on Luma, legacy Hailuo, Pika, or Midjourney (openai.md, runway-luma.md, minimax.md, pika-midjourney-grok.md).

**The 350 word chronological block is a Seedance appetite.** Most rivals call that an overstuffed prompt. Runway: "The Gen-4 model thrives on prompt simplicity," with over description of the input image actively reducing motion; Sora 2: "Longer, more detailed prompts restrict the model's creativity"; Kling: "simple words and sentence structures"; FLUX warns overstuffed prompts reduce motion coherence; Grok community warns that redescribing the frame wastes the prompt (runway-luma.md, openai.md, kling.md, flux.md, pika-midjourney-grok.md). The porting rule from the guides: carry the content (identity sheet, world constants, physical limits), compress the form to what each surface wants, one motion sentence on Runway, one paragraph on Luma and Pika, per shot slots on Kling, labeled fields or timesteps on FLUX.

**The compact negative block barely leaves home.** Seedance tolerates one targeted negative block; almost nobody else does. Runway is bluntest: "Negative phrasing is not supported and may produce unpredictable or even opposite results" (runway-luma.md). FLUX: "No negative prompts. FLUX doesn't support them; describe what you want instead" (flux.md). Google prescribes positive phrasing on Veo and semantic negative prompts on Nano Banana ("an empty, deserted street" rather than "no cars") (google-video.md, nano-banana.md). Z Image has no channel for negation at all at zero guidance (utility-pipeline.md). Before any port, convert every "no X" into a positive lock ("Locked camera. The camera remains still."). The two exceptions the guides sanction: the Veo subtitle case ("(no subtitles)", community proven against baked in caption training data), and Pika, which has a genuine negative_prompt field where exclusions move out of the main prompt entirely (google-video.md, pika-midjourney-grok.md).

**Boundary frames plus identity references in one call is a canon luxury.** Seedance 2.5 conditions on start_image, end_image, and role scoped references simultaneously, and the whole scene chaining method leans on that. MiniMax H3 forbids it outright, "Image-to-video and reference-to-video are mutually exclusive," a split that is architectural in the open weights release (minimax.md); Wan 3.0 carries the same rule ("first_frame/last_frame and reference_image/reference_video/reference_audio/file/link types are mutually exclusive") (wan.md); Veo forces 8 second duration under references and caps them at three images of a single subject (google-video.md). The minimax guide names this the single most dangerous porting assumption. Off canon, identity must live inside the boundary frames themselves or the chain must give up its keyframes.

**Thirty second single takes, prompt rewriters, and live syntax hazards.** Only wan3_0 matches the canon's 30 second single pass; Veo's unit is 8 seconds, Grok caps at 15, Kling and H3 at 15, FLUX at 20, so a long canon scene decomposes everywhere else (wan.md, google-video.md, pika-midjourney-grok.md, kling.md, minimax.md, flux.md). Seedance on Higgsfield documents no prompt rewriter, but legacy Hailuo rewrites unless prompt_optimizer is false, H3 Max unless prompt_expansion_mode is disabled, and Wan on Model Studio unless prompt_extend is off, so an exact canon prompt is not safe on those surfaces until the rewriter is confirmed off (minimax.md, wan.md). Two syntax hazards for the silent, text free canon: quotation marks are live syntax on FLUX, driving both spoken dialogue and rendered typography, so ported prompts must carry no quoted strings (flux.md); and audio defaults on almost everywhere, with Veo 3.1 offering no off switch at all (silence must be prompted as ambience) and MiniMax H3 always shipping stereo audio to strip in post (google-video.md, minimax.md). Legacy Hailuo's bracket camera commands ([Push in], [Static shot]) run in the opposite direction: they are that family's dialect and must never appear in a Seedance prompt (minimax.md).
