// Builds src/data/shots.json from scene-timing.json + the scene plan.
// Run: node scripts/build-shots.mjs   (then node scripts/check-beats.mjs)
import fs from "node:fs";
import { geoMercator } from "d3-geo";
import { scenesA } from "./plan-a.mjs";
import { scenesB } from "./plan-b.mjs";
import { scenesC } from "./plan-c.mjs";

const FPS = 30, MIN = 48, SPLIT_OVER = 108, TARGET = 100;
const timing = JSON.parse(fs.readFileSync("src/data/scene-timing.json", "utf8"));
const plan = [...scenesA, ...scenesB, ...scenesC];
if (plan.length !== timing.scenes.length) throw new Error(`plan has ${plan.length} scenes, timing has ${timing.scenes.length}`);
const totalFrames = Math.round(timing.audioSeconds * FPS);
const COMP = { water: "WaterScene", surface: "SurfaceScene", map: "MapScene", globe: "GlobeScene", parch: "ParchmentScene", split: "SplitScene", chart: "ChartScene", flat: "DarkScene" };
const DIAGRAM = new Set(["text", "card", "paper", "rank", "bracket", "counter", "calendar", "battery", "gauge", "pool", "curve", "tbar", "chips", "depth", "balance", "typing", "label", "stamp"]);

const geoProj = (bg) => bg?.kind === "map" ? geoMercator().center(bg.center).scale(bg.scale).translate([960, 540]) : null;
function resolveGeo(layer, proj) {
  const l = { ...layer };
  if (l.geo) { if (!proj) throw new Error("geo layer on non-map background"); const [x, y] = proj(l.geo); l.x = x + (l.dx ?? 0); l.y = y + (l.dy ?? 0); delete l.geo; }
  return l;
}
function resolveCam(cam, proj) {
  if (!cam) return cam;
  const fix = (f) => (f && f.geo ? proj(f.geo) : f);
  return { ...cam, f0: fix(cam.f0), f1: fix(cam.f1) };
}

const beats = [];
const sceneStarts = timing.scenes.map((s, i) => (i === 0 ? 0 : Math.round(s.start * FPS)));
const report = [];
plan.forEach((sc, si) => {
  const T = timing.scenes[si];
  const sf = sceneStarts[si], ef = si === plan.length - 1 ? totalFrames : sceneStarts[si + 1];
  // 1. anchor frames
  let cuts = sc.beats.map((b, k) => {
    if (k === 0) return sf;
    const s = Math.min(Math.floor(b.a), T.sentences.length - 1), fr = b.a - Math.floor(b.a);
    const se = T.sentences[s];
    return Math.round((se.start + fr * (se.end - se.start)) * FPS);
  });
  // enforce min length (forward, then backward) and order
  for (let k = 1; k < cuts.length; k++) cuts[k] = Math.max(cuts[k], cuts[k - 1] + MIN);
  for (let k = cuts.length - 1; k >= 1; k--) cuts[k] = Math.min(cuts[k], (k === cuts.length - 1 ? ef : cuts[k + 1]) - MIN);
  cuts.push(ef);
  sc.beats.forEach((b, k) => {
    const start = cuts[k], dur = cuts[k + 1] - start;
    const proj = geoProj(b.bg);
    const layers = (b.layers || []).map((l) => resolveGeo(l, proj));
    const hud = (b.hud || []).map((l) => resolveGeo({ ...l, hud: true }, proj));
    const baseCam = resolveCam(b.cam, proj) ?? { s0: 1, s1: 1.08, f0: [960, 540], f1: [960, 540] };
    const focus = b.f ?? [960, 540];
    const parts = dur > SPLIT_OVER ? Math.min(Math.ceil(dur / TARGET), Math.floor(dur / MIN)) : 1;
    const zm = layers.some((l) => DIAGRAM.has(l.t)) ? 0.5 : 1;
    const z = (s) => 1 + (s - 1) * zm;
    const presets = [
      { s0: z(1.4), s1: z(1.55), f0: [focus[0] - 160 * zm, focus[1]], f1: [focus[0] - 160 * zm, focus[1]] },
      { s0: 1, s1: z(1.12), f0: [960, 540], f1: [960, 540] },
      { s0: z(1.65), s1: z(1.8), f0: [focus[0] + 180 * zm, focus[1] - 40 * zm], f1: [focus[0] + 180 * zm, focus[1] - 40 * zm] },
    ];
    let o = start;
    for (let j = 0; j < parts; j++) {
      const pd = j === parts - 1 ? start + dur - o : Math.round(dur / parts);
      const more = j > 0 ? (b.more?.[j - 1] ?? []).map((l) => resolveGeo({ ...l, hud: true }, proj)) : [];
      const baseHud = j > 0 && more.some((l) => l.t === "cap") ? hud.filter((l) => l.t !== "cap") : hud;
      const layersNoHud = layers.filter((l) => !l.hud);
      const props = {
        bg: b.bg, cam: j === 0 ? baseCam : presets[(j - 1) % 3], focus,
        layers: [...layersNoHud, ...layers.filter((l) => l.hud)], hud: [...baseHud, ...more],
        offset: o - start, origDuration: dur,
      };
      if (b.shake) props.shake = b.shake;
      if (b.grade) props.grade = b.grade;
      if (b.fade === "in" && j === 0) props.fade = "in";
      if (b.fade === "out" && j === parts - 1) props.fade = "out";
      if (j === 0 && !(si === 0 && k === 0) && !b.cut) props.dissolve = 6;
      beats.push({ id: `S${String(sc.n).padStart(2, "0")}-B${k + 1}${j ? String.fromCharCode(97 + j) : ""}`, scene: sc.n, startFrame: o, durationFrames: pd, component: COMP[b.bg.kind] ?? "DarkScene", props });
      o += pd;
    }
  });
  report.push(`S${String(sc.n).padStart(2, "0")} start ${(sf / FPS).toFixed(1)}s  ${sc.beats.length} planned beats -> ${beats.filter((x) => x.scene === sc.n).length} beats`);
});
// continuity check
let t = 0;
for (const b of beats) { if (b.startFrame !== t) throw new Error(`gap/overlap at ${b.id}: ${b.startFrame} vs ${t}`); t += b.durationFrames; }
if (t !== totalFrames) throw new Error(`timeline ${t} != audio ${totalFrames}`);
fs.writeFileSync("src/data/shots.json", JSON.stringify({ fps: FPS, totalFrames, beats }, null, 1));
console.log(report.join("\n"));
console.log(`\n${beats.length} beats, ${totalFrames} frames (${(totalFrames / FPS / 60).toFixed(2)} min)`);
