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
