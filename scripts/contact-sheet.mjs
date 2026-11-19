// One still per beat (mid-frame) + out/contact/index.html to eyeball the whole film. Run locally: npm run contact
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
const shots = JSON.parse(fs.readFileSync("src/data/shots.json", "utf8"));
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comp = await selectComposition({ serveUrl, id: "BaskingShark" });
fs.mkdirSync("out/contact", { recursive: true });
let html = "<body style='background:#111;color:#ddd;font:12px sans-serif;display:flex;flex-wrap:wrap;gap:6px'>";
for (const b of shots.beats) {
  const frame = b.startFrame + Math.floor(b.durationFrames / 2);
  const file = `out/contact/${b.id}.jpg`;
  await renderStill({ composition: comp, serveUrl, output: file, frame, scale: 0.25, imageFormat: "jpeg" });
  html += `<figure style='margin:0'><img src='${b.id}.jpg' width=320><figcaption>${b.id} · ${(b.startFrame / 30).toFixed(1)}s · ${(b.durationFrames / 30).toFixed(1)}s</figcaption></figure>`;
  process.stdout.write(`\r${b.id}`);
}
fs.writeFileSync("out/contact/index.html", html + "</body>");
console.log("\nOpen out/contact/index.html");
