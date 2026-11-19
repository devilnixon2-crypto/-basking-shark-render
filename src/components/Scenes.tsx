import React from "react";
import { geoMercator, geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import topo50 from "../data/countries-50m.json";
import topo110 from "../data/countries-110m.json";
import { C, W, H } from "../theme";
import { ip, lerp, rnd, ease } from "../util";

type Bg = Record<string, any>;
interface BP { b: Bg; f: number; dur: number }
const BIG = { x: -W, y: -H, w: W * 3, h: H * 3 };

const WATER: Record<string, [string, string, string]> = {
  green: ["#2F6B4F", "#1B4A3A", "#0F2A22"], murky: ["#25513F", "#12332B", "#08161A"], deep: ["#0A2540", "#071A30", "#04101F"],
  bright: ["#4FA58A", "#2A7A68", "#14503F"], teal: ["#2B8C96", "#14606F", "#0A3345"], blueGreen: ["#1F6F77", "#0F4455", "#082A38"],
};

export const WaterBg: React.FC<BP> = ({ b, f }) => {
  const [a, m, z] = WATER[b.tone ?? "green"];
  const rays = b.rays ?? 6, parts = b.particles ?? 36;
  return (
    <svg width={BIG.w} height={BIG.h} viewBox={`${BIG.x} ${BIG.y} ${BIG.w} ${BIG.h}`} style={{ position: "absolute", left: BIG.x, top: BIG.y }}>
      <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0.28" stopColor={a} /><stop offset="0.55" stopColor={m} /><stop offset="0.85" stopColor={z} /></linearGradient><filter id="rb"><feGaussianBlur stdDeviation="22" /></filter></defs>
      <rect x={BIG.x} y={BIG.y} width={BIG.w} height={BIG.h} fill="url(#wg)" />
      <g filter="url(#rb)" opacity={b.rayOp ?? 0.22}>
        {Array.from({ length: rays }).map((_, i) => { const x = -300 + i * ((W + 600) / rays) + Math.sin(f / 70 + i) * 40; return <polygon key={i} points={`${x},${-200} ${x + 150},${-200} ${x + 420},${H + 300} ${x + 120},${H + 300}`} fill="#DFF7E6" opacity={0.4 + 0.5 * Math.abs(Math.sin(f / 90 + i * 1.3))} />; })}
      </g>
      {Array.from({ length: parts }).map((_, i) => {
        const t = (f / (230 + 60 * rnd("pp" + i)) + rnd("pt" + i)) % 1;
        const x = rnd("px" + i) * W + Math.sin(f / 40 + i) * 18, y = H + 40 - t * (H + 120), r = 2 + 4 * rnd("pr" + i);
        return <circle key={i} cx={x} cy={y} r={r} fill="#DFF7E6" opacity={0.18 + 0.3 * rnd("po" + i)} />;
      })}
      {b.bubbles && Array.from({ length: 10 }).map((_, i) => { const t = (f / 120 + rnd("bb" + i)) % 1; return <circle key={i} cx={W * 0.35 + rnd("bx" + i) * 400 + Math.sin(f / 15 + i) * 10} cy={H - t * (H + 100)} r={6 + 10 * rnd("br" + i)} fill="none" stroke="#DFF7E6" strokeWidth="3" opacity={0.6} />; })}
    </svg>
  );
};

export const SurfaceBg: React.FC<BP> = ({ b, f }) => {
  const hy = b.horizon ?? 470, sky: Record<string, [string, string]> = { haze: ["#F2EEE4", "#CFD8D6"], storm: ["#2A3036", "#586068"], dawn: ["#F2B880", "#8DB4C6"], dusk: ["#7A5C73", "#E7A672"], day: ["#BFE0EE", "#EAF3F1"] };
  const [s0, s1] = sky[b.sky ?? "haze"];
  const sea = b.sky === "storm" ? ["#2B3F45", "#13222A"] : ["#3A8E86", "#145048"];
  return (
    <svg width={BIG.w} height={BIG.h} viewBox={`${BIG.x} ${BIG.y} ${BIG.w} ${BIG.h}`} style={{ position: "absolute", left: BIG.x, top: BIG.y }}>
      <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={s0} /><stop offset="1" stopColor={s1} /></linearGradient><linearGradient id="se" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={sea[0]} /><stop offset="1" stopColor={sea[1]} /></linearGradient></defs>
      <rect x={BIG.x} y={BIG.y} width={BIG.w} height={hy - BIG.y} fill="url(#sk)" />
      {b.sun && <circle cx={b.sunX ?? 1500} cy={b.sunY ?? 190} r="70" fill="#FFF3B0" opacity="0.95" />}
      {b.clouds && [[300, 150], [900, 90], [1500, 210]].map(([x, y], i) => <ellipse key={i} cx={x + Math.sin(f / 90 + i) * 30} cy={y} rx="190" ry="44" fill={b.sky === "storm" ? "#1B2026" : "#fff"} opacity={b.sky === "storm" ? 0.85 : 0.7} />)}
      <rect x={BIG.x} y={hy} width={BIG.w} height={BIG.h} fill="url(#se)" />
      <line x1={BIG.x} x2={BIG.x + BIG.w} y1={hy} y2={hy} stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      {Array.from({ length: 9 }).map((_, i) => { const y = hy + 20 + i * i * 6 + i * 14; return <path key={i} d={`M-200 ${y}${Array.from({ length: 20 }).map((_, k) => ` Q${-200 + k * 120 + 60} ${y + Math.sin(f / 16 + i + k) * 8 - 10} ${-200 + (k + 1) * 120} ${y}`).join("")}`} stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />; })}
    </svg>
  );
};

export const FlatBg: React.FC<BP> = ({ b }) => {
  if (b.kind === "parch") return (
    <div style={{ position: "absolute", left: BIG.x, top: BIG.y, width: BIG.w, height: BIG.h, background: `radial-gradient(ellipse at 50% 50%, ${b.c1 ?? "#EFE5C8"} 0%, ${b.c2 ?? "#D7C69A"} 100%)` }} />
  );
  if (b.kind === "split") return (
    <div style={{ position: "absolute", left: BIG.x, top: BIG.y, width: BIG.w, height: BIG.h, background: `linear-gradient(90deg, ${b.left ?? "#4A2A2A"} 0 50%, ${b.right ?? "#143F45"} 50% 100%)` }} />
  );
  if (b.kind === "chart") return (
    <svg width={BIG.w} height={BIG.h} viewBox={`${BIG.x} ${BIG.y} ${BIG.w} ${BIG.h}`} style={{ position: "absolute", left: BIG.x, top: BIG.y }}>
      <rect x={BIG.x} y={BIG.y} width={BIG.w} height={BIG.h} fill="#2E7388" />
      {Array.from({ length: 40 }).map((_, i) => <line key={"v" + i} x1={-960 + i * 120} x2={-960 + i * 120} y1={BIG.y} y2={BIG.y + BIG.h} stroke="rgba(255,255,255,0.14)" strokeWidth="2" />)}
      {Array.from({ length: 24 }).map((_, i) => <line key={"h" + i} y1={-540 + i * 120} y2={-540 + i * 120} x1={BIG.x} x2={BIG.x + BIG.w} stroke="rgba(255,255,255,0.14)" strokeWidth="2" />)}
    </svg>
  );
  return <div style={{ position: "absolute", left: BIG.x, top: BIG.y, width: BIG.w, height: BIG.h, background: b.color ?? (b.grad ? `linear-gradient(180deg, ${b.grad[0]}, ${b.grad[1]})` : C.nearBlack) }} />;
};

/* ---------- maps (Natural Earth 1:50m via world-atlas, public domain) ---------- */
const cache = new Map<string, { name: string; d: string }[]>();
const MAPSTYLE: Record<string, { sea: string; land: string; stroke: string; hi: string }> = {
  chart: { sea: "#6FA9B8", land: "#E9DDBF", stroke: "#8A7447", hi: "#F2C94C" },
  night: { sea: "#0A2540", land: "#244B5E", stroke: "#4C7C90", hi: "#F2C94C" },
  dark: { sea: "#0B1D2E", land: "#1E3A4A", stroke: "#3F6B80", hi: "#E5584B" },
};
export const mapProj = (center: [number, number], scale: number) => geoMercator().center(center).scale(scale).translate([W / 2, H / 2]);

export const MapBg: React.FC<BP> = ({ b }) => {
  const key = JSON.stringify([b.center, b.scale]);
  if (!cache.has(key)) {
    const proj = mapProj(b.center, b.scale).clipExtent([[-1400, -900], [W + 1400, H + 900]]);
    const gp = geoPath(proj);
    const fc: any = feature(topo50 as any, (topo50 as any).objects.countries);
    cache.set(key, fc.features.map((ft: any) => ({ name: ft.properties.name as string, d: gp(ft) ?? "" })).filter((x: any) => x.d));
  }
  const st = MAPSTYLE[b.style ?? "chart"], paths = cache.get(key)!;
  return (
    <svg width={BIG.w} height={BIG.h} viewBox={`${BIG.x} ${BIG.y} ${BIG.w} ${BIG.h}`} style={{ position: "absolute", left: BIG.x, top: BIG.y }}>
      <rect x={BIG.x} y={BIG.y} width={BIG.w} height={BIG.h} fill={st.sea} />
      {paths.map((p, i) => <path key={i} d={p.d} fill={(b.hi ?? []).includes(p.name) ? st.hi : st.land} fillOpacity={(b.hi ?? []).includes(p.name) ? 0.85 : 1} stroke={st.stroke} strokeWidth={b.sw ?? 1.6} />)}
    </svg>
  );
};

/* ---------- globe (d3 orthographic, SVG: deterministic, no WebGL needed) ---------- */
export const GlobeBg: React.FC<BP> = ({ b, f, dur }) => {
  const land: any = feature(topo110 as any, (topo110 as any).objects.land);
  const t = ip(f, [0, dur], [0, 1], ease);
  const rot: [number, number] = [lerp(b.rot0[0], b.rot1[0], t), lerp(b.rot0[1], b.rot1[1], t)];
  const R = b.r ?? 430;
  const proj = geoOrthographic().scale(R).translate([W / 2, H / 2]).rotate([-rot[0], -rot[1]]).clipAngle(90);
  const gp = geoPath(proj);
  const grat = gp(geoGraticule10());
  const tracks = (b.tracks ?? []).map((tr: any, i: number) => {
    const p = ip(f, tr.p ?? [0, dur], [0, 1]);
    const n = Math.max(2, Math.floor(tr.pts.length * p) + 1);
    const pts = tr.pts.slice(0, n);
    if (n < tr.pts.length && n > 1) { const a = tr.pts[n - 1], c = tr.pts[n]; const k = tr.pts.length * p - (n - 1); pts[n - 1] = [a[0] + (c[0] - a[0]) * k, a[1] + (c[1] - a[1]) * k]; }
    return { d: gp({ type: "LineString", coordinates: pts } as any), color: tr.color ?? C.yellow, w: tr.w ?? 5, op: tr.op ?? 1, head: pts[pts.length - 1], dash: tr.dash };
  });
  return (
    <svg width={BIG.w} height={BIG.h} viewBox={`${BIG.x} ${BIG.y} ${BIG.w} ${BIG.h}`} style={{ position: "absolute", left: BIG.x, top: BIG.y }}>
      <defs><radialGradient id="og" cx="40%" cy="35%"><stop offset="0" stopColor="#2A7FA6" /><stop offset="1" stopColor="#0B3556" /></radialGradient></defs>
      <rect x={BIG.x} y={BIG.y} width={BIG.w} height={BIG.h} fill="#04101F" />
      {Array.from({ length: 90 }).map((_, i) => <circle key={i} cx={rnd("sx" + i) * W} cy={rnd("sy" + i) * H} r={1 + 2 * rnd("sr" + i)} fill="#fff" opacity={0.3 + 0.5 * rnd("so" + i)} />)}
      <circle cx={W / 2} cy={H / 2} r={R + 14} fill="rgba(120,200,255,0.12)" />
      <circle cx={W / 2} cy={H / 2} r={R} fill="url(#og)" />
      {grat && <path d={grat} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />}
      <path d={gp(land) ?? ""} fill="#3E8E6A" stroke="#1D5A42" strokeWidth="1.5" />
      {tracks.map((tr: any, i: number) => tr.d && <path key={i} d={tr.d} fill="none" stroke={tr.color} strokeWidth={tr.w} strokeLinecap="round" opacity={tr.op} strokeDasharray={tr.dash} />)}
      {tracks.map((tr: any, i: number) => { const q = proj(tr.head); return q && b.heads !== false ? <circle key={"h" + i} cx={q[0]} cy={q[1]} r={tr.w * 1.6} fill={tr.color} opacity={tr.op} /> : null; })}
    </svg>
  );
};

export const Background: React.FC<BP> = (p) => {
  switch (p.b.kind) {
    case "water": return <WaterBg {...p} />;
    case "surface": return <SurfaceBg {...p} />;
    case "map": return <MapBg {...p} />;
    case "globe": return <GlobeBg {...p} />;
    default: return <FlatBg {...p} />;
  }
};
