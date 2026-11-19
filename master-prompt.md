# Master Prompt: Basking Shark Documentary (Claude Code)

Paste this whole file into Claude Code. Before anything else, read `.claude/skills/documentary-explainer-video/SKILL.md` and follow it. It holds the style bible, the beat lint and the component list.

## 1. Goal

Build an 8-10 minute animated YouTube documentary in Remotion, 1920x1080, 30 fps, titled working title **"Why Doesn't the Basking Shark Hunt Fish?"**

Story approach: a case file. Open with a huge shark and a question, promise three mysteries, tease a "sea monster" corpse, then solve the mysteries one by one. The monster comes back at the end as the payoff.

## 2. Inputs

- `narration.txt` in the project root. One paragraph = one scene (21 scenes). Blank line between scenes.
- `public/narration.mp3`. The user will supply it (generated from `narration.txt`). If it is missing, build everything using estimated timing (150 words per minute) and tell the user to drop the mp3 in and re-run the alignment.

## 3. Hard rules

1. **A visual change every 3-4 seconds is compulsory.** No beat longer than 4.0 s or shorter than 1.5 s. The lint script must fail the build otherwise (see the skill).
2. Visual style matches the reference video the user uploaded: flat illustrated look, green-to-deep-blue water with light rays, parchment and paper cutaways, bold yellow and red keyword captions, scale comparisons, labelled diagrams, small credits at bottom-left. The story structure and shots below are different from the reference. Do not copy its scenes.
3. Captions add information (label, number, contrast). They do not repeat the narration word for word.
4. No gore. Hunting and decay use silhouettes and icons.
5. Do not invent facts. Use only the facts in section 5. Ask if something is missing.
6. Energy wording: swimming and filtering still cost energy. Never say or caption that food is "free", "effortless" or "costs nothing". Say the shark avoids spending energy on chasing individual fish and filters large volumes of water for tiny prey.

## 4. Project setup

- `npx create-video@latest` (TypeScript, blank), add `@remotion/google-fonts`, `@remotion/media-utils`. Add `three` and `@react-three/fiber` only for the globe.
- Folders: `src/components`, `src/scenes`, `src/data` (`scene-timing.json`, `shots.json`), `public/assets`, `scripts`.
- Align `narration.mp3` to scenes with word timestamps (see skill), write `scene-timing.json`.
- For each scene, create beats below. Number of beats per scene is a minimum. If a scene is longer than beats x 3.5 s, add extra beats using: a camera push to a new framing, a new caption, a new icon entering, or a cutaway detail.
- Generate `shots.json`, run `node scripts/check-beats.mjs`, then render a half-scale preview and a contact sheet.

## 5. Facts allowed on screen (verify before final render)

- Basking shark: second biggest fish alive, after the whale shark. Up to about 10 m (33 ft) long.
- Mouth about 1 m (3 ft) wide, open while feeding. Passive filter feeder. Five gill slits each side, with gill rakers.
- Filters well over a million litres of water per hour (sources vary, about 1.3 to 2 million). Cruising speed about 3 km/h (2 mph).
- Eats zooplankton (e.g. copepods). Teeth are tiny and hooked and are not used for feeding. Scientists think they may matter for mating.
- Biggest shark known to breach. A breaching basking shark capsized a boat in 1937, the UK's only recorded fatal shark encounter.
- Name comes from the old belief that they were basking in the sun.
- Hibernation theory (1950s) was disproved by satellite tagging. Two SEPARATE findings, never shown as one shark: (a) Sims et al., 2003: tagged sharks tracked for months, horizontal movements up to about 3,400 km and dives deeper than 750 m; (b) Skomal et al., 2009: a shark tagged off Cape Cod, Massachusetts, was tracked to the Caribbean.
- Hunted for liver oil in the 20th century. Slow growing, few young, gestation thought to be up to 3.5 years. One pregnant female studied, Norway, 1943. IUCN: Endangered.
- Stronsay Beast: washed ashore on Stronsay, Orkney, 25 September 1808. Reported length 55 ft (16.8 m): always label it REPORTED, never as an established measurement. Edinburgh's Wernerian Society called it a possible sea serpent. Sir Everard Home judged it a decayed basking shark. Do not show or mention any revised length for Home's estimate until its original source is checked. Largest reliably recorded basking shark about 40 ft (12.2 m), so a few people still dispute it.
- Zuiyo Maru: Japanese trawler, 1977, off New Zealand. Amino acid analysis of the muscle pointed toward a basking shark. Present it as evidence pointing toward a basking shark, not an absolutely proven identification.
- To double-check before release: the 1950s gill-raker shedding claim, the exact Skomal route, the 1937 incident wording, and the original source for Home's size estimate (currently left out).

## 6. Scene-by-scene plan

Each scene lists approximate length and minimum beats. Beats are in order. Timing comes from the audio.

### S01 Hook (about 32 s, 9 beats) starts "Imagine you are floating"
1. Black fades to murky green water, particles, bubbles rising.
2. Small diver in frame, slow push-in. Caption: OFF THE COAST OF SCOTLAND.
3. Diver turns head. Vignette closes in. Caption: YOU CAN ONLY SEE A FEW METRES.
4. A blurred shadow enters from the right edge.
5. Shadow grows, diver freezes, a soft ring pulse spreads.
6. Scale bracket beside the shadow. Caption: AS LONG AS A BUS.
7. Cut to the open mouth filling the frame. Diver tiny beside it, dotted width line labelled YOUR SHOULDERS.
8. Mouth held, red caption with a small shake: YOU SHOULD BE TERRIFIED.
9. Cut to a plankton speck next to a rice grain. Yellow caption: SMALLER THAN A GRAIN OF RICE.

### S02 The question (about 27 s, 8 beats) starts "This is the basking shark"
1. Full side view of the shark glides in. Label: BASKING SHARK (Cetorhinus maximus, small).
2. Ranking graphic, whale shark first, basking shark highlighted: 2ND BIGGEST FISH.
3. Human silhouette against a length bar: UP TO 10 M.
4. A school of small fish passes the open mouth, shark ignores them.
5. Push in on one fish near the mouth with a dotted outline. Caption: EASY MEAL?
6. Huge WHY? text over the shark, slow zoom.
7. Dark stormy sea, map of Scotland with a pin on Orkney. Caption: 200+ YEARS AGO.
8. Silhouette of a long neck rising from fog. Caption: A MONSTER.

### S03 Three mysteries (about 25 s, 7 beats) starts "In this video, we will solve"
1. Case-file folder wipe with stamp: 3 MYSTERIES.
2. Card 1 slides in: WHY EAT SOMETHING THIS TINY? Plankton icon.
3. Cut to shark and plankton scale comparison.
4. Card 2: WHERE DOES IT GO IN WINTER?
5. Empty sea, calendar flips to winter, shark outline fades.
6. Card 3: THE MONSTER THAT NEVER EXISTED. Blurred sea-serpent silhouette stamped UNSOLVED.
7. Chapter chips 1-2-3 line up, monster silhouette flickers back. Caption: STAY TO THE END.

### S04 Stronsay, 1808 (about 29 s, 8 beats) starts "September, eighteen oh eight"
1. Parchment card with ink date: SEPTEMBER 1808.
2. Illustrated storm sea, lightning, camera shake.
3. Map zooms to Orkney, pin on Stronsay.
4. Dawn rocks, fisherman silhouette and small boat.
5. Reveal carcass silhouette on rocks. Labels: LONG NECK, TINY HEAD.
6. Six numbered markers on the "limbs".
7. Measuring tape across the carcass: 55 FT (REPORTED, about 17 M).
8. Old document with a stamp: SEA SERPENT? Fade with caption: HOLD THAT THOUGHT.

### S05 Scale (about 23 s, 7 beats) starts "But first, how big is big?"
1. Flat double-decker bus silhouette.
2. Shark slides in beneath it, same length, bracket labelled 9 M.
3. Weight icons: SEVERAL TONNES, car icons stacked.
4. Dorsal fin next to a man silhouette: FIN = HUMAN HEIGHT.
5. Pull from the mouth out to the full body.
6. Tiny crustacean icons appear around the shark.
7. Equation graphic: BIGGEST BODY then SMALLEST FOOD.

### S06 The mouth (about 23 s, 7 beats) starts "Now let us meet the real animal"
1. Title card: THE REAL ANIMAL. Shark swims across a bright surface.
2. Surface view: dorsal fin cuts the water, light rays.
3. Speed gauge with a walking-human icon: GENTLE WALK.
4. Front view, mouth wide, dotted line: ABOUT 1 M.
5. Particles stream into the mouth with arrows.
6. Head cutaway, five gill slits labelled.
7. Zoom into a gill arch showing bristles: GILL RAKERS.

### S07 The sieve (about 25 s, 7 beats) starts "Think of the gill rakers as a net"
1. Net-over-gill overlay, water flows through, plankton caught.
2. Flow diagram: IN (mouth) to OUT (gills).
3. Magnified copepod, label: COPEPOD.
4. Plankton piles on bristles then a swallow arrow.
5. Counter: 1,000,000+ LITRES PER HOUR.
6. Olympic pool outline filled halfway: HALF A POOL.
7. Clock ticks an hour, pool refills. Caption: JUST BY SWIMMING FORWARD.

### S08 The teeth (about 16 s, 5 beats) starts "What about the teeth?"
1. Open mouth, teeth highlighted with a flash.
2. Macro of a tiny hooked tooth beside a coin: TINY, HOOKED.
3. Red cross over the word FEEDING.
4. Two shark outlines and a question mark: MATING?
5. Stamp: NOT WEAPONS.

### S09 The leap (about 23 s, 7 beats) starts "Harmless does not mean quiet"
1. Calm surface, a fin, then a sudden splash.
2. Slow-motion breach, freeze frame. Label: BREACH.
3. Four breach silhouettes in a row: SEVERAL IN A ROW.
4. Ink-style date card: 1937.
5. Small boat, shark leaps, boat tips (flat animation, no people shown).
6. UK map, pin: ONLY FATAL SHARK ENCOUNTER IN THE UK.
7. Question marks around the shark: WHY LEAP?

### S10 The energy problem (about 23 s, 7 beats) starts "So back to our question"
1. Underwater. Big text: WHY NOT HUNT FISH?
2. Battery bar at 100%.
3. A generic predator chases a fish, speed lines, battery drains.
4. Fish dodges. Caption: BURSTS OF SPEED.
5. Two speed meters: BASKING SHARK slow, FAST FISH fast.
6. Lunge, jaws close on empty water. Caption: MISSED.
7. Battery flashes red at 20%: ENERGY WASTED.

### S11 Plankton does not run (about 21 s, 6 beats) starts "Plankton cannot run"
1. Thick green plankton cloud drifting.
2. Plankton icons: CAN'T RUN.
3. Overhead sea chart with green patches.
4. Shark glides, mouth open, plankton streams in, battery drains slowly and steadily.
5. Caption: NO CHASE, STEADY CRUISING.
6. Water-volume icon with a lower energy tag: LOWER COST THAN CHASING.

### S12 The trade (about 22 s, 6 beats) starts "That is the trade"
1. Split screen: HUNTER and FILTER FEEDER.
2. Left: rich food icon, ENERGY COST: HIGH BURSTS. Right: tiny dots, ENERGY COST: STEADY CRUISING.
3. Balance scale tips toward the filter feeder.
4. Silhouette lineup: basking shark, whale shark, blue whale. SAME TRICK.
5. Blue whale swims through a krill cloud.
6. Caption: FILTERING PAYS OFF.

### S13 The vanishing (about 24 s, 7 beats) starts "But plankton comes with a catch"
1. Calendar flips spring to summer, sea blooms green.
2. Map of west Scotland and the Isle of Man, shark icons gather.
3. Surface view, sharks near the top, sun icon.
4. Card: BASKING, with a sun. Name origin.
5. Calendar flips to autumn, water darkens.
6. Shark icons fade off the map one by one.
7. Empty sea, counter: 0 SIGHTINGS, months ticking.

### S14 The hibernation theory (about 17 s, 5 beats) starts "For decades, scientists had an explanation"
1. Sepia scientist silhouette with a notebook.
2. Gill close-up, rakers falling off. Caption: THEORY: THEY SHED THEIR GILL RAKERS.
3. Shark sinks to the seabed and curls up: ZZZ.
4. Stamp: HIBERNATION.
5. Red X and stamp: WRONG.

### S15 The tags (about 23 s, 7 beats) starts "Then came satellite tags"
1. Satellite tag clips onto a fin.
2. Satellite in orbit, signal arcs down to Earth.
3. Three.js globe, several faint tracks drawn over months (generic, not one shark). Label: STUDY 1.
4. Counter: UP TO 3,400 KM.
5. Depth gauge: dives to 750 M+, darkness closes in. Label: STUDY 1.
6. Glowing plankton hidden at depth.
7. Cut to a new globe view, one separate route line from Massachusetts to the Caribbean. Label: A SEPARATE STUDY.

### S16 Always moving (about 20 s, 6 beats) starts "Think about that"
1. Shark lazing at the surface, camera pulls back.
2. Map shows moving plankton blobs and the shark's path following them.
3. Dotted trail races across the ocean.
4. A plankton patch moves, the shark follows.
5. Caption: ALWAYS SEARCHING.
6. Hourglass: YOU NEVER GET TO STAY STILL.

### S17 The hunt (about 19 s, 6 beats) starts "Being huge, slow, and harmless"
1. Black-and-white style, small boat on the sea (no harpoon shown).
2. Illustrated liver cutaway filling the body cavity.
3. Product icons: LAMPS, COSMETICS, LUBRICANTS.
4. Fins and meat as market icons.
5. Boat pulls alongside a shark that keeps feeding.
6. Caption: IT WOULD NOT FLEE.

### S18 Slow to recover (about 25 s, 7 beats) starts "The damage lasts"
1. Schematic population line dropping. Label: SCHEMATIC.
2. Slow-growth timeline bar.
3. Pregnancy bar: UP TO 3.5 YEARS.
4. Few pup icons: VERY FEW.
5. Norway map: 1943, ONE PREGNANT FEMALE STUDIED.
6. Recovery curve rising very slowly.
7. Stamp: ENDANGERED.

### S19 The monster solved (about 33 s, 9 beats) starts "Now, back to the monster on the rocks"
1. Return to the Stronsay carcass shot.
2. 1808 surgeon silhouette with bones, London label.
3. Vertebrae side by side: CARCASS and SHARK.
4. Check stamp: MATCH.
5. Decay frame 1: intact shark.
6. Decay frame 2: the jaw drops away.
7. Decay frame 3: gills and lower body fade.
8. Decay frame 4: skull, spine and fins remain, matching the Stronsay silhouette.
9. Side-by-side silhouettes with stamp: HOME'S CONCLUSION: A SHARK.

### S20 It happened again (about 26 s, 7 beats) starts "It happened again in nineteen seventy seven"
1. Calendar: 1977.
2. Japanese trawler hauling a net at sea.
3. Carcass on deck with a plesiosaur outline overlay.
4. Newspaper card: PLESIOSAUR?
5. Lab flask graphic: MUSCLE TESTS.
6. Stamp: EVIDENCE POINTS TO A BASKING SHARK.
7. Split caption: 55 FT REPORTED vs 12 M LARGEST RECORDED, then MOST EXPERTS: SHARK.

### S21 Answer and close (about 34 s, 10 beats) starts "So the sea monster was the gentlest giant"
1. The monster silhouette dissolves into the calm shark.
2. Shark front view, calm eyes.
3. Text: MOST LIKELY THE GENTLEST GIANT.
4. Card: WHY NOT HUNT FISH? then the answer IT DOESN'T NEED TO.
5. Shark side view, relaxed drift.
6. Text: AN EFFICIENT WAY TO BE ENORMOUS.
7. Slow drift into deep blue.
8. Tiny plankton glow.
9. Comment box with typing animation: the closing question.
10. End card, fade out.

## 7. Retention markers (do not move)

- The question and the monster teaser must both be on screen before 0:55.
- The three-mystery promise (S03) must land at about 1:00.
- A new idea or reveal every 90-120 seconds: monster (0:55), the mouth reveal (about 2:20), the leap (about 3:50), the energy answer (about 4:30), the vanishing (about 5:30), the tags (about 6:30), the monster solved (about 7:30).

## 8. Deliverables

- `out/basking-shark-preview.mp4` (half scale) first, then `out/basking-shark.mp4`.
- `CREDITS.md`, `TODO-assets.md`, and a short report: total length, number of beats, beat-lint result, any scene where timing is estimated.
