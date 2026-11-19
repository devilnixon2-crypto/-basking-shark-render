---
name: documentary-explainer-video
description: Build a long-form (8-10 min) animated documentary or explainer video in Remotion (React, optional Three.js) from a narration script, narration audio and a scene plan, in a flat illustrated teal/green underwater and archive-paper style, with a compulsory visual change every 3-4 seconds. Use when the user asks to create, animate, edit or render an explainer or documentary YouTube video from narration, a scene list, or a master prompt.
---

# Documentary Explainer Video (Remotion)

Turns `narration.txt` + `narration.mp3` + a scene plan into a finished 1080p video.

## Install

Place this file at `.claude/skills/documentary-explainer-video/SKILL.md` in the project.

## Workflow

1. **Read inputs.** `narration.txt` (one paragraph = one scene, blank line between), `public/narration.mp3`, and the scene plan (master prompt). If any is missing, say so and stop.
2. **Scaffold** a Remotion project (TypeScript, 1920x1080, 30 fps). Fonts via `@remotion/google-fonts/Raleway`. Add `three` and `@react-three/fiber` only if a scene needs 3D (e.g. a globe).
3. **Align audio to scenes.** Get word timestamps (faster-whisper or openai-whisper, `pip install faster-whisper`). Match the first and last words of each narration paragraph to find each scene's start and end. Write `src/data/scene-timing.json`. Fallback if transcription fails: split the audio duration proportionally by character count per paragraph, and tell the user the timing is approximate.
4. **Build `src/data/shots.json`.** Split every scene into beats (see rule below). Every beat has an id, start frame, duration, component, and props.
5. **Build reusable components** before scenes (list below). Do not hand-draw each shot from scratch.
6. **Run the beat lint** (`node scripts/check-beats.mjs`). The build must fail if any beat is longer than 4.0 seconds.
7. **Render a low-res preview** (`npx remotion render --scale=0.5`) and check a contact sheet of one frame per beat.
8. **Final render** at 1080p with `narration.mp3` mixed in at full volume and optional music at 8-10% volume.

## The beat rule (compulsory)

A visual change must happen at least every 4.0 seconds (120 frames at 30 fps). Target 3-3.5 seconds. Minimum 1.5 seconds so it does not feel jittery.

A change counts only if it is one of:
- a new shot or cut to a different composition,
- a camera move that ends in a clearly different framing (at least 20% scale or position change),
- a new key element entering (icon, label, chart, character, document),
- a new caption or highlighted keyword swapping in.

A slow background drift or a looping particle effect does not count.

Never leave the same composition on screen for more than 4.0 seconds, even when the narration is a single long sentence.

## Beat lint script

Create `scripts/check-beats.mjs`:

```js
import fs from "node:fs";
const shots = JSON.parse(fs.readFileSync("src/data/shots.json", "utf8"));
const FPS = 30, MAX = 4.0, MIN = 1.5;
let bad = 0;
for (const b of shots.beats) {
  const s = b.durationFrames / FPS;
  if (s > MAX || s < MIN) {
    console.error(`Beat ${b.id} is ${s.toFixed(2)}s (allowed ${MIN}-${MAX}s)`);
    bad++;
  }
}
if (bad) { console.error(`${bad} beat(s) out of range`); process.exit(1); }
console.log(`OK: ${shots.beats.length} beats, all within ${MIN}-${MAX}s`);
```

Add `"prebuild": "node scripts/check-beats.mjs"` and `"prerender"` hooks in `package.json`.

## `shots.json` shape

```json
{
  "fps": 30,
  "beats": [
    { "id": "S01-B1", "scene": 1, "startFrame": 0, "durationFrames": 100,
      "component": "WaterScene", "props": { "caption": "OFF THE COAST OF SCOTLAND" } }
  ]
}
```

## Visual style bible

**Look:** flat 2D vector illustration, slightly textured, like a documentary motion-graphics channel. Soft light rays, floating particles, film grain, vignette. Small characters on large backgrounds so labels and scale comparisons are readable.

**Palette (tokens in `src/theme.ts`):**
- Surface haze: `#E8E4DA`
- Shallow green water: `#2F6B4F` to deep green `#0F2A22`
- Deep blue water: `#0A2540` to near-black `#04101F`
- Caption yellow: `#F2C94C`
- Alert red: `#E5584B`
- Text white: `#F5F5F0`
- Parchment: `#E9DDBF`, ink: `#2B2118`

**Typography:** Raleway, weight 800, all caps for captions, letter-spacing 0.08em, soft drop shadow. Source credits bottom-left, small, 60% opacity.

**Captions:**
- Short (2-6 words), centered lower third or placed beside the subject.
- Pop-in: scale 0.9 to 1 and fade over 6 frames.
- Key numbers or facts get a yellow highlight box with dark text. Warnings use red text.
- Never repeat the narration sentence word for word. Captions add a label, number or contrast.

**Overlays (apply to every scene):** film grain at about 6% opacity, vignette, slow floating particles (underwater scenes), subtle camera shake only on storm and impact beats.

**Motion:** ease in and out on every move. Camera pushes, pans and zoom-outs between beats. Cuts on the beat; use quick wipes or cross-dissolves of 6-10 frames, never long fades except at scene starts that the plan calls out.

## Reusable components

- `WaterScene` (gradient, light rays, particles, depth marker)
- `SurfaceScene` (sky haze, horizon, waves, optional fin)
- `SharkSide`, `SharkFront`, `SharkCutaway` (SVG, layered so mouth, gills and fins can animate)
- `Diver` (small SVG character)
- `ScaleCompare` (silhouette plus measuring bracket and label)
- `Counter` (number counting up with unit)
- `BatteryBar` (energy meter)
- `MapScene` (flat map with pin, label, animated route line)
- `Globe` (Three.js, rotating, route line growing)
- `Calendar` (month flip)
- `Paper` (parchment or newspaper card with stamp)
- `Stamp` (rotated rubber stamp with word)
- `SplitScreen`, `Caption`, `KeywordBox`, `CommentBox` (typing animation)
- `GrainOverlay`, `Vignette`

## Assets and credits

- Use genuine licensed footage and photos where available (sharks swimming, feeding, breaching, ocean scenes). Use original SVG illustration for diagrams, anatomy, maps, reconstructions and comparisons. Never present a reconstruction as real footage and never invent photographs. Use only public-domain or Creative Commons material that you have checked, and add the credit line on screen plus an entry in `CREDITS.md`.
- Never hotlink at render time. Download assets into `public/assets/` first.
- If a needed asset is unavailable, draw a clean placeholder and list it in `TODO-assets.md` for the user.

## Quality checklist before saying done

- Beat lint passes.
- Audio and visuals line up: each scene starts within 0.3 seconds of its first narrated word.
- No caption overflows the safe area (5% margin).
- Every number on screen matches the narration and the fact-check list in the master prompt.
- Contact sheet reviewed: no two consecutive beats look the same.
- Total length is within 8-10 minutes.
- Output saved as `out/basking-shark.mp4`, with preview and final renders listed in the reply.

## Do not

- Do not put speaker notes, scene labels or stage directions into the narration audio text.
- Do not invent facts. If a fact is not in the master prompt's list, ask.
- Do not show gore. Hunting and decay scenes use silhouettes and icons only.
- Do not skip the beat lint to save time.
