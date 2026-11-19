import React from "react";
import { C, W, H, FONT } from "../theme";
import type { LayerSpec } from "../data/types";
import { clamp, ease, easeOut, ip, rnd } from "../util";
import { Icon, ICONS } from "./Icons";
import { SharkSide, SharkFront, SharkCut, GillArch } from "./Sharks";

export interface LP { L: LayerSpec; f: number; dur: number }

/** Centres its content on the layer position. */
export const Ctr: React.FC<{ w: number; h: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, children, style }) => (
  <div style={{ position: "absolute", left: -w / 2, top: -h / 2, width: w, height: h, ...style }}>{children}</div>
);
/** Full-world SVG (layer coordinates are world pixels). */
export const WorldSvg: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>
);
export const mvp = (L: LayerSpec, f: number, dur: number) => ip(f, L.mv ?? [0, dur], [0, 1], ease);

const sz = (name: string, w?: number) => { const d = ICONS[name]; return { w: w ?? d.w, h: d ? (w ?? d.w) * (d.h / d.w) : 0 }; };

export const IconLayer: React.FC<LP> = ({ L, f }) => {
  const d = sz(L.name, L.w);
  return <Ctr w={d.w} h={d.h}><Icon name={L.name} color={L.color ?? C.white} color2={L.color2} f={f} w={L.w} /></Ctr>;
};

export const SharkLayer: React.FC<LP> = ({ L, f }) => {
  const w = L.w ?? 1000;
  return <Ctr w={w} h={w * 0.34}><SharkSide mouth={L.mouth ?? 0.5} mono={L.mono} f={f} spots={L.spots} hi={L.hi} width={w} /></Ctr>;
};
export const SharkFrontLayer: React.FC<LP> = ({ L }) => {
  const w = L.w ?? 700;
  return <Ctr w={w} h={w * 0.8}><SharkFront mouth={L.mouth ?? 1} mono={L.mono} width={w} /></Ctr>;
};
export const SharkCutLayer: React.FC<LP> = ({ L, f }) => {
  const w = L.w ?? 900;
  return <Ctr w={w} h={w * 0.58}><SharkCut hi={L.hi} f={f} width={w} flow={L.flow} /></Ctr>;
};
export const GillArchLayer: React.FC<LP> = ({ L, f, dur }) => {
  const w = L.w ?? 300;
  return <Ctr w={w} h={w * 1.33}><GillArch width={w} hi={L.hi} trapped={Math.round(ip(f, L.mv ?? [0, dur], [0, L.trapped ?? 0]))} /></Ctr>;
};

/** School of small fish passing; optional dotted ring around one fish. */
export const School: React.FC<LP> = ({ L, f }) => {
  const n = L.n ?? 14, spread = L.spread ?? [520, 300], size = L.size ?? 48, dir = L.dir ?? 1, sp = L.speed ?? 2.2;
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      {Array.from({ length: n }).map((_, i) => {
        const bx = (rnd("sx" + i + (L.seed ?? 0)) - 0.5) * spread[0], by = (rnd("sy" + i + (L.seed ?? 0)) - 0.5) * spread[1];
        const x = bx + dir * f * sp + Math.sin(f / 14 + i) * 8, y = by + Math.sin(f / 18 + i * 2) * 10;
        return <div key={i} style={{ position: "absolute", left: x - size / 2, top: y - size / 2, transform: `scaleX(${dir > 0 ? 1 : -1}) rotate(${Math.sin(f / 10 + i) * 4}deg)` }}><Icon name="fish" color={L.color ?? "#9FC9C2"} w={size} /></div>;
      })}
    </div>
  );
};

/** Drifting plankton cloud. */
export const Cloud: React.FC<LP> = ({ L, f }) => {
  const n = L.n ?? 60, spread = L.spread ?? [900, 500], size = L.size ?? 26, vx = L.vx ?? 0.5;
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      {Array.from({ length: n }).map((_, i) => {
        const x = (rnd("cx" + i) - 0.5) * spread[0] + Math.sin(f / 40 + i) * 14 + f * vx * (0.4 + rnd("cv" + i));
        const y = (rnd("cy" + i) - 0.5) * spread[1] + Math.cos(f / 33 + i) * 12;
        const s = size * (0.5 + rnd("cs" + i));
        const wrapX = ((x + spread[0] / 2) % spread[0] + spread[0]) % spread[0] - spread[0] / 2;
        return <div key={i} style={{ position: "absolute", left: wrapX - s / 2, top: y - s / 2, opacity: 0.55 + 0.4 * rnd("co" + i) }}>{L.kind === "krill" ? <Icon name="krill" color={L.color ?? "#F2A98E"} w={s * 2} /> : L.kind === "copepod" ? <Icon name="copepod" color={L.color ?? C.plankton} w={s * 2.2} /> : <Icon name="plankton" color={L.color ?? C.plankton} w={s} />}</div>;
      })}
    </div>
  );
};

export const Glow: React.FC<LP> = ({ L, f }) => {
  const n = L.n ?? 40, spread = L.spread ?? [900, 500];
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      {Array.from({ length: n }).map((_, i) => {
        const x = (rnd("gx" + i) - 0.5) * spread[0], y = (rnd("gy" + i) - 0.5) * spread[1] + Math.sin(f / 30 + i) * 8;
        const pulse = 0.5 + 0.5 * Math.sin(f / 12 + i * 1.7);
        const r = 5 + 5 * rnd("gr" + i);
        return <div key={i} style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", background: L.color ?? "#9BFFD0", opacity: 0.35 + 0.6 * pulse, boxShadow: `0 0 ${18 + 14 * pulse}px ${6 + 4 * pulse}px ${L.color ?? "#9BFFD0"}88` }} />;
      })}
    </div>
  );
};

/** particles streaming along a line (with arrow heads) */
export const Stream: React.FC<LP> = ({ L, f }) => {
  const [x0, y0] = L.from, [x1, y1] = L.to, n = L.n ?? 26;
  const ang = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
  return (
    <WorldSvg>
      {Array.from({ length: n }).map((_, i) => {
        const t = ((f / (L.period ?? 50)) + i / n) % 1;
        const off = (rnd("st" + i) - 0.5) * (L.width ?? 160);
        const nx = -(y1 - y0), ny = x1 - x0, len = Math.hypot(nx, ny);
        const x = x0 + (x1 - x0) * t + (nx / len) * off * (1 - t * 0.6), y = y0 + (y1 - y0) * t + (ny / len) * off * (1 - t * 0.6);
        return <circle key={i} cx={x} cy={y} r={4 + 4 * rnd("sr" + i)} fill={L.color ?? C.plankton} opacity={Math.sin(t * Math.PI) * 0.9} />;
      })}
      {L.arrows !== false && [0.2, 0.5, 0.8].map((t, i) => {
        const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
        return <path key={i} d="M-16 -14L10 0L-16 14" transform={`translate(${x} ${y}) rotate(${ang})`} stroke={C.yellow} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />;
      })}
    </WorldSvg>
  );
};

export const SpeedLines: React.FC<LP> = ({ L, f }) => {
  const n = L.n ?? 12, w = L.w ?? 900, h = L.h ?? 400;
  return (
    <Ctr w={w} h={h}>
      {Array.from({ length: n }).map((_, i) => {
        const t = (f / 14 + rnd("sl" + i)) % 1, y = rnd("sy" + i) * h, len = 120 + 200 * rnd("sn" + i);
        return <div key={i} style={{ position: "absolute", top: y, left: (L.dir ?? 1) > 0 ? t * w - len : w - t * w, width: len, height: 5, borderRadius: 3, background: L.color ?? "rgba(255,255,255,0.6)", opacity: Math.sin(t * Math.PI) }} />;
      })}
    </Ctr>
  );
};

export const Pulse: React.FC<LP> = ({ L, f }) => (
  <WorldSvg>
    {[0, 1, 2].map((i) => {
      const t = ((f - (L.at ?? 0)) / 40 + i / 3) % 1;
      return f < (L.at ?? 0) ? null : <circle key={i} cx={0} cy={0} r={40 + t * (L.r0 ?? 360)} fill="none" stroke={L.color ?? "rgba(255,255,255,0.8)"} strokeWidth={5 * (1 - t) + 1} opacity={1 - t} />;
    })}
  </WorldSvg>
);

export const Splash: React.FC<LP> = ({ L, f }) => {
  const t = f - (L.at ?? 0);
  if (t < 0) return null;
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      {Array.from({ length: 34 }).map((_, i) => {
        const a = -Math.PI / 2 + (rnd("sa" + i) - 0.5) * 2.2, v = 14 + 22 * rnd("sv" + i), r = 5 + 8 * rnd("sz" + i);
        const x = Math.cos(a) * v * t * 0.5, y = Math.sin(a) * v * t * 0.5 + 0.35 * t * t * 0.5;
        return <div key={i} style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", background: "rgba(235,245,248,0.9)", opacity: clamp(1 - t / 46) }} />;
      })}
    </div>
  );
};

export const Waves: React.FC<LP> = ({ L, f }) => {
  const y0 = L.y ?? 700, amp = L.amp ?? 14, n = L.n ?? 3;
  return (
    <WorldSvg>
      {Array.from({ length: n }).map((_, k) => {
        const yy = y0 + k * (L.gap ?? 30), pts: string[] = [];
        for (let x = -200; x <= W + 200; x += 40) pts.push(`${x},${yy + Math.sin(x / 120 + f / (18 + k * 5) + k) * amp}`);
        const col = (L.colors ?? ["#2B6F66", "#1E5A58", "#154646"])[k % 3];
        return <polygon key={k} points={`${pts.join(" ")} ${W + 200},${H + 700} -200,${H + 700}`} fill={col} opacity={L.op ?? 1} />;
      })}
    </WorldSvg>
  );
};

export const Rain: React.FC<LP> = ({ f }) => (
  <WorldSvg>
    {Array.from({ length: 110 }).map((_, i) => {
      const x = rnd("rx" + i) * (W + 400) - 200, t = (f / 12 + rnd("rt" + i)) % 1, y = t * (H + 200) - 100;
      return <line key={i} x1={x - t * 0} y1={y} x2={x - 22} y2={y + 60} stroke="rgba(220,235,245,0.55)" strokeWidth="2.5" />;
    })}
  </WorldSvg>
);

export const Lightning: React.FC<LP> = ({ L, f }) => {
  const fl = (L.flashes ?? [10]).find((s: number) => f >= s && f < s + 9);
  if (fl === undefined) return null;
  const k = 1 - (f - fl) / 9;
  return (
    <WorldSvg>
      <rect x={-800} y={-500} width={W + 1600} height={H + 1000} fill="#fff" opacity={0.55 * k} />
      <path d={`M${L.bx ?? 1200} -50L${(L.bx ?? 1200) - 80} 200L${(L.bx ?? 1200) - 10} 220L${(L.bx ?? 1200) - 120} 480L${(L.bx ?? 1200) - 30} 490L${(L.bx ?? 1200) - 160} 720`} stroke="#FFF7C2" strokeWidth="10" fill="none" opacity={k} strokeLinejoin="round" />
    </WorldSvg>
  );
};

export const Fog: React.FC<LP> = ({ L, f }) => (
  <div style={{ position: "absolute", left: -1200, top: (L.y ?? 700) - 260, width: 4400, height: 520, background: "linear-gradient(180deg, rgba(200,210,215,0) 0%, rgba(200,210,215,0.55) 50%, rgba(200,210,215,0) 100%)", transform: `translateX(${Math.sin(f / 60) * 40}px)`, filter: "blur(14px)", opacity: L.op ?? 1 }} />
);

export const Fin: React.FC<LP> = ({ L, f }) => {
  const w = L.w ?? 260;
  return (
    <Ctr w={w} h={w * 0.7}>
      <svg width={w} height={w * 0.7} viewBox="0 0 260 180" style={{ overflow: "visible" }}>
        <path d="M30 150C70 110 100 40 130 8C150 50 190 110 230 150Z" fill="#43545C" />
        <path d={`M-20 152Q40 ${140 + Math.sin(f / 8) * 4} 130 152Q220 ${164 + Math.sin(f / 8) * 4} 290 152`} stroke="rgba(255,255,255,0.75)" strokeWidth="5" fill="none" />
      </svg>
    </Ctr>
  );
};

export const Zzz: React.FC<LP> = ({ L, f }) => (
  <div style={{ position: "absolute", left: 0, top: 0, fontFamily: FONT, fontWeight: 800, color: C.white }}>
    {[0, 1, 2].map((i) => {
      const t = ((f / 40) + i / 3) % 1;
      return <div key={i} style={{ position: "absolute", left: i * 30 + t * 40, top: -t * 160, fontSize: 40 + i * 18, opacity: Math.sin(t * Math.PI) }}>Z</div>;
    })}
  </div>
);

export const QMarks: React.FC<LP> = ({ L, f }) => {
  const n = L.n ?? 7, r = L.r ?? 420;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, fontFamily: FONT, fontWeight: 800 }}>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2 + f / 120, rr = r * (0.8 + 0.3 * rnd("q" + i));
        const k = clamp((f - (L.at ?? 0) - i * 3) / 8);
        return <div key={i} style={{ position: "absolute", left: Math.cos(a) * rr * 1.25 - 30, top: Math.sin(a) * rr * 0.62 - 50, fontSize: 90 + 40 * rnd("qs" + i), color: L.color ?? C.yellow, opacity: k, transform: `rotate(${Math.sin(f / 15 + i) * 12}deg) scale(${0.6 + 0.4 * k})` }}>?</div>;
      })}
    </div>
  );
};

export const Markers: React.FC<LP> = ({ L, f }) => (
  <div style={{ position: "absolute", left: 0, top: 0 }}>
    {L.pts.map((p: [number, number], i: number) => {
      const k = clamp((f - (L.at ?? 0) - i * (L.gap ?? 9)) / 8);
      return <div key={i} style={{ position: "absolute", left: p[0] - 24, top: p[1] - 24, width: 48, height: 48, borderRadius: "50%", background: C.yellow, color: C.ink, fontFamily: FONT, fontWeight: 800, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.4 + 0.6 * easeOut(k)})`, opacity: k, border: `4px solid ${C.ink}` }}>{i + 1}</div>;
    })}
  </div>
);

export const Trail: React.FC<LP> = ({ L, f, dur }) => {
  const pts: [number, number][] = L.pts;
  const p = ip(f, L.mv ?? [0, dur], [0, 1], ease);
  const segs: number[] = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); tot += d; }
  let rem = tot * p; const out: [number, number][] = [pts[0]];
  for (let i = 1; i < pts.length && rem > 0; i++) { const d = segs[i - 1]; const k = Math.min(1, rem / d); out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]); rem -= d; }
  const head = out[out.length - 1];
  return (
    <WorldSvg>
      <polyline points={out.map((q) => q.join(",")).join(" ")} stroke={L.color ?? C.yellow} strokeWidth={L.sw ?? 8} strokeDasharray={L.solid ? undefined : "4 16"} strokeLinecap="round" fill="none" />
      {L.head !== false && <circle cx={head[0]} cy={head[1]} r={L.hr ?? 13} fill={L.color ?? C.yellow} />}
    </WorldSvg>
  );
};

export const Patches: React.FC<LP> = ({ L, f }) => (
  <WorldSvg>
    {L.pts.map((p: number[], i: number) => {
      const dx = (L.drift?.[0] ?? 0) * (f / 30), dy = (L.drift?.[1] ?? 0) * (f / 30);
      return <ellipse key={i} cx={p[0] + dx} cy={p[1] + dy} rx={p[2]} ry={p[2] * 0.62} fill={L.color ?? "#58B86A"} opacity={0.65 + 0.2 * Math.sin(f / 20 + i)} />;
    })}
  </WorldSvg>
);

export const Net: React.FC<LP> = ({ L, f, dur }) => {
  const w = L.w ?? 560, h = L.h ?? 420, cell = 34;
  const lines: React.ReactNode[] = [];
  for (let x = -h; x < w + h; x += cell) { lines.push(<line key={"a" + x} x1={x} y1={0} x2={x + h} y2={h} stroke="#EDE6C8" strokeWidth="3" opacity="0.85" />); lines.push(<line key={"b" + x} x1={x + h} y1={0} x2={x} y2={h} stroke="#EDE6C8" strokeWidth="3" opacity="0.85" />); }
  const p = ip(f, [0, dur], [0, 1]);
  return (
    <Ctr w={w} h={h}>
      <svg width={w} height={h} style={{ overflow: "hidden" }} viewBox={`0 0 ${w} ${h}`}><clipPath id="netc"><rect width={w} height={h} /></clipPath><g clipPath="url(#netc)">{lines}</g>
        {Array.from({ length: 22 }).map((_, i) => { const t = ((f / 55) + i / 22) % 1; const y = 30 + rnd("ny" + i) * (h - 60); const stuck = t > 0.5 && rnd("nk" + i) > 0.35; const x = stuck ? w * 0.52 + rnd("nx" + i) * 14 : t * w * 0.6; return <circle key={i} cx={x} cy={y} r={stuck ? 8 : 6} fill={C.plankton} opacity={stuck ? p : 0.8} />; })}
        <rect x={w * 0.52 - 4} y={0} width="8" height={h} fill="#EDE6C8" opacity="0.9" />
      </svg>
    </Ctr>
  );
};

/** dotted ring / ellipse outline */
export const Ring: React.FC<LP> = ({ L, f }) => {
  const rx = L.rx ?? 160, ry = L.ry ?? rx, k = clamp((f - (L.at ?? 0)) / 12);
  return (
    <svg width={rx * 2 + 40} height={ry * 2 + 40} viewBox={`${-rx - 20} ${-ry - 20} ${rx * 2 + 40} ${ry * 2 + 40}`} style={{ position: "absolute", left: -rx - 20, top: -ry - 20, overflow: "visible" }}>
      <ellipse cx="0" cy="0" rx={rx * k} ry={ry * k} fill="none" stroke={L.color ?? C.yellow} strokeWidth={L.sw ?? 7} strokeDasharray="14 12" strokeLinecap="round" transform={`rotate(${f * (L.spin ?? 0.6)})`} />
    </svg>
  );
};

/** a row of repeated icons (vertebrae, pups, products ...) that appear one after another */
export const Row: React.FC<LP> = ({ L, f }) => {
  const n = L.n ?? 8, dx = L.dx ?? 80, dy = L.dy ?? 0, arc = L.arc ?? 0;
  return (
    <div style={{ position: "absolute", left: 0, top: 0 }}>
      {Array.from({ length: n }).map((_, i) => {
        const k = easeOut(clamp((f - (L.at ?? 0) - i * (L.gap ?? 5)) / 10));
        const m = i - (n - 1) / 2;
        const names: string[] = L.names ?? [L.name];
        const nm = names[i % names.length];
        const w = L.w ?? 60, h = w * ICONS[nm].h / ICONS[nm].w;
        return <div key={i} style={{ position: "absolute", left: m * dx - w / 2, top: m * dy + arc * m * m - h / 2, opacity: k, transform: `scale(${0.5 + 0.5 * k})` }}><Icon name={nm} color={L.color ?? C.white} w={w} /></div>;
      })}
    </div>
  );
};
