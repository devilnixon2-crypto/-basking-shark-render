// Shorthand helpers for scene-plan files. Coordinates are in a 1920x1080 world.
export const INK = "#2B2118", YEL = "#F2C94C", RED = "#E5584B", WHT = "#F5F5F0", GRN = "#8EE07A";
export const cap = (text, o = {}) => ({ t: "cap", text, hud: true, x: 960, y: 925, ...o });
export const T = (text, x, y, size = 64, o = {}) => ({ t: "text", text, x, y, size, ...o });
export const I = (name, x, y, w, o = {}) => ({ t: "icon", name, x, y, w, ...o });
export const SH = (x, y, w = 1000, o = {}) => ({ t: "shark", x, y, w, ...o });
export const FR = (x, y, w = 1000, o = {}) => ({ t: "sharkFront", x, y, w, ...o });
export const CUT = (x, y, w = 1200, o = {}) => ({ t: "sharkCut", x, y, w, ...o });
export const BR = (x, y, w, label, o = {}) => ({ t: "bracket", x, y, w, label, ...o });
export const ST = (text, x, y, o = {}) => ({ t: "stamp", text, x, y, ...o });
export const water = (tone = "green", o = {}) => ({ kind: "water", tone, ...o });
export const surface = (o = {}) => ({ kind: "surface", ...o });
export const parch = (o = {}) => ({ kind: "parch", ...o });
export const dark = (o = {}) => ({ kind: "flat", color: "#04101F", ...o });
export const flat = (grad, o = {}) => ({ kind: "flat", grad, ...o });
export const map = (center, scale, style = "chart", o = {}) => ({ kind: "map", center, scale, style, ...o });
export const globe = (rot0, rot1, o = {}) => ({ kind: "globe", rot0, rot1, ...o });
export const credit = (text = "Map data: Natural Earth (public domain)") => ({ t: "credit", text, hud: true, x: 96, y: 1018 });
export const CAMZ = (s0, s1, f0, f1 = f0) => ({ s0, s1, f0, f1 });
// densify waypoints [[lon,lat],...] so globe tracks can be drawn progressively
export const dens = (pts, k = 8) => {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) for (let j = 0; j < k; j++) out.push([pts[i][0] + ((pts[i + 1][0] - pts[i][0]) * j) / k, pts[i][1] + ((pts[i + 1][1] - pts[i][1]) * j) / k]);
  out.push(pts[pts.length - 1]);
  return out;
};
