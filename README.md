# Why Doesn't the Basking Shark Hunt Fish? — Remotion project

1920x1080, 30 fps, 10:29 (length of your narration audio). 253 beats, each 1.6–3.6 s.
Narration subtitles are NOT burned in. Ask for `caption.srt` separately (word timings are stored in `src/data/words.json`).

## Render on your machine
```bash
npm install
npm run preview          # Remotion Studio (scrub the timeline)
npm run render:preview   # out/basking-shark-preview.mp4 (half scale) - runs the beat lint first
npm run render           # out/basking-shark.mp4 (1080p)
npm run contact          # optional: one still per beat -> out/contact/index.html
```
Needs Node 18+ and enough disk/RAM for Chrome (Remotion downloads it on first run). Typical machines take roughly 30–90 min for the full render; use `--concurrency=<n>` to tune.

## Checks (no browser needed)
```bash
npm run check      # beat lint: every beat 1.5–4.0 s (fails the build otherwise)
npm run smoke      # server-renders every beat at 3 frames to catch runtime errors / NaN
npm run typecheck
```

## If you replace the narration audio
1. Put the new file at `public/narration.mp3` (and update `narration.txt`; one paragraph = one scene).
2. `pip install pocketsphinx` then `npm run align` – re-aligns scenes (word level, offline) and rebuilds `src/data/shots.json`.
   Beats are anchored to narration sentences in `scripts/plan-*.mjs` (`a: 3.5` = halfway through sentence 3 of that scene).

## Editing
- Scene plan: `scripts/plan-a.mjs`, `plan-b.mjs`, `plan-c.mjs` (shorthand helpers in `plan-helpers.mjs`). Rebuild with `npm run shots`.
- Layer types: `src/components/BeatView.tsx` (registry). Art: `Sharks.tsx`, `Icons.tsx`. Maps/globe: `Scenes.tsx`.
- `src/theme.ts`: palette, `KEYWORD_CAPTIONS` (false hides the yellow/red keyword labels), `MUSIC` (put `public/music.mp3`, plays at 9%).
