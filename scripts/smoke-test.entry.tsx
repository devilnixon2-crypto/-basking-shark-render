import React from "react";
import { renderToString } from "react-dom/server";
import { BeatView } from "../src/components/BeatView";
import shots from "../src/data/shots.json";

let bad = 0, n = 0;
for (const b of (shots as any).beats) {
  for (const fr of [0, Math.floor(b.durationFrames / 2), b.durationFrames - 1]) {
    n++;
    try {
      const html = renderToString(<BeatView beat={b} frame={fr} />);
      if (/NaN|undefined%|Infinity/.test(html)) { console.error(`${b.id}@${fr}: NaN/undefined in output`); bad++; }
    } catch (e: any) { console.error(`${b.id}@${fr}: ${e.message}`); bad++; }
  }
}
console.log(bad ? `FAILED ${bad} of ${n} renders` : `smoke test OK: ${n} renders of ${(shots as any).beats.length} beats`);
process.exit(bad ? 1 : 0);
