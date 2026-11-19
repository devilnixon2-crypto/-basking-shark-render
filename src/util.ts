import { Easing, interpolate, random } from "remotion";
import type { Anim } from "./data/types";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = Easing.inOut(Easing.cubic);
export const easeOut = Easing.out(Easing.cubic);
export const ip = (f: number, a: [number, number], b: [number, number], e: (t: number) => number = ease) =>
  interpolate(f, a, b, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const rnd = (seed: string | number) => random(String(seed));

/** entrance animation -> style fragments */
export function enter(anim: Anim | undefined, f: number, at = 0, len = 10) {
  if (!anim || anim === "none") return { op: 1, dx: 0, dy: 0, sc: 1 };
  const t = clamp((f - at) / len);
  const e = easeOut(t);
  const back = Easing.out(Easing.back(1.6))(t);
  switch (anim) {
    case "fade": return { op: e, dx: 0, dy: 0, sc: 1 };
    case "pop": return { op: clamp(t * 2), dx: 0, dy: 0, sc: 0.85 + 0.15 * back };
    case "slideL": return { op: e, dx: -260 * (1 - e), dy: 0, sc: 1 };
    case "slideR": return { op: e, dx: 260 * (1 - e), dy: 0, sc: 1 };
    case "slideU": return { op: e, dx: 0, dy: -200 * (1 - e), sc: 1 };
    case "slideD": return { op: e, dx: 0, dy: 200 * (1 - e), sc: 1 };
    case "drop": return { op: clamp(t * 3), dx: 0, dy: -260 * (1 - back), sc: 1 };
  }
  return { op: 1, dx: 0, dy: 0, sc: 1 };
}
