import React from "react";
import { C, W, H, FONT, KEYWORD_CAPTIONS } from "../theme";
import { clamp, ease, easeOut, ip } from "../util";
import { Ctr, LP, WorldSvg, mvp } from "./Layers1";
import { Icon } from "./Icons";

const base: React.CSSProperties = { fontFamily: FONT, fontWeight: 800, whiteSpace: "pre", textAlign: "center", letterSpacing: "0.08em", lineHeight: 1.12 };
const shadow = "0 4px 14px rgba(0,0,0,0.45)";
const centered = (children: React.ReactNode, extra: React.CSSProperties = {}) => (
  <div style={{ position: "absolute", left: 0, top: 0, transform: "translate(-50%,-50%)", ...extra }}>{children}</div>
);

export const Text: React.FC<LP> = ({ L }) => centered(
  <div style={{ ...base, fontSize: L.size ?? 64, color: L.color ?? C.white, textShadow: L.noshadow ? "none" : shadow, background: L.bg, padding: L.bg ? L.pad ?? "10px 26px" : 0, borderRadius: 10, letterSpacing: L.ls ?? "0.08em", fontWeight: L.weight ?? 800, textAlign: (L.align ?? "center") as any, border: L.border }}>{L.text}</div>
);

/** Keyword caption (HUD). tone: yellow (key fact), red (warning), white (neutral), dark (on paper) */
export const Cap: React.FC<LP> = ({ L, f }) => {
  if (!KEYWORD_CAPTIONS) return null;
  const tone = L.tone ?? "yellow";
  const st: Record<string, React.CSSProperties> = {
    yellow: { background: C.yellow, color: "#1B1710" },
    red: { background: "transparent", color: C.red, textShadow: "0 3px 0 rgba(0,0,0,0.55), 0 0 24px rgba(0,0,0,0.6)" },
    white: { background: "rgba(4,16,31,0.55)", color: C.white },
    dark: { background: "transparent", color: C.ink },
  };
  const t = clamp((f - (L.at ?? 0)) / 6);
  const sh = L.shake ? { x: Math.sin(f * 1.9) * 5, y: Math.cos(f * 2.3) * 4 } : { x: 0, y: 0 };
  return centered(
    <div style={{ ...base, fontSize: L.size ?? 62, padding: "10px 30px", borderRadius: 12, ...st[tone], textShadow: st[tone].textShadow ?? shadow, transform: `scale(${0.9 + 0.1 * easeOut(t)}) translate(${sh.x}px,${sh.y}px)`, opacity: t, maxWidth: 1700 }}>{L.text}</div>
  );
};

export const Credit: React.FC<LP> = ({ L }) => (
  <div style={{ position: "absolute", left: 0, top: 0, ...base, letterSpacing: "0.04em", fontSize: 20, fontWeight: 600, color: C.white, opacity: 0.6, textAlign: "left", textShadow: shadow }}>{L.text}</div>
);

export const Label: React.FC<LP> = ({ L, f }) => {
  const [dx, dy] = L.ptr ?? [0, 0];
  const t = clamp((f - (L.at ?? 0)) / 10);
  return (
    <>
      {(dx || dy) && <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}><line x1={0} y1={0} x2={dx * t} y2={dy * t} stroke={L.lc ?? C.yellow} strokeWidth="4" /><circle cx={dx * t} cy={dy * t} r="9" fill={L.lc ?? C.yellow} /></svg>}
      {centered(<div style={{ ...base, fontSize: L.size ?? 36, color: L.fg ?? "#1B1710", background: L.bg ?? C.yellow, padding: "6px 16px", borderRadius: 8, textShadow: "none", letterSpacing: "0.06em" }}>{L.text}</div>)}
    </>
  );
};

export const Stamp: React.FC<LP> = ({ L, f }) => {
  const t = clamp((f - (L.at ?? 4)) / 7), k = easeOut(t);
  const col = L.color ?? C.red;
  return centered(
    <div style={{ ...base, fontSize: L.size ?? 84, color: col, border: `10px double ${col}`, padding: "10px 30px", borderRadius: 10, opacity: 0.92 * clamp(t * 2.5), transform: `rotate(${L.rot ?? -8}deg) scale(${2.2 - 1.2 * k})`, mixBlendMode: L.blend ?? "normal", background: L.fill }}>{L.text}</div>
  );
};

export const Paper: React.FC<LP> = ({ L }) => {
  const w = L.w ?? 760, h = L.h ?? 520, kind = L.kind ?? "parch";
  const bg = kind === "news" ? "#EDE8DA" : kind === "folder" ? "#D8B26E" : kind === "white" ? "#F4EFE0" : C.parchment;
  return (
    <Ctr w={w} h={h}>
      {kind === "folder" && <div style={{ position: "absolute", left: 30, top: -44, width: 260, height: 60, background: bg, borderRadius: "14px 14px 0 0" }} />}
      <div style={{ position: "absolute", inset: 0, background: bg, borderRadius: kind === "folder" ? "0 14px 14px 14px" : 8, boxShadow: "0 18px 50px rgba(0,0,0,0.45), inset 0 0 70px rgba(120,90,40,0.28)", border: `3px solid ${kind === "folder" ? "#A98543" : "#8A7447"}` }} />
      {kind === "news" && [0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 40 + i * ((w - 80) / 3), top: 150, width: (w - 80) / 3 - 20, height: h - 200, background: "repeating-linear-gradient(180deg, rgba(43,33,24,0.55) 0 4px, transparent 4px 17px)" }} />)}
    </Ctr>
  );
};

export const Bracket: React.FC<LP> = ({ L, f }) => {
  const dir = L.dir ?? "h", len = L.w ?? 600, col = L.color ?? C.yellow;
  const g = easeOut(clamp((f - (L.at ?? 0)) / 16)), cur = len * g;
  const ticks = L.ticks ? Array.from({ length: Math.floor(len / 40) + 1 }) : [];
  return (
    <div style={{ position: "absolute", left: 0, top: 0, transform: dir === "v" ? "rotate(90deg)" : undefined }}>
      <svg width={len + 40} height={60} style={{ position: "absolute", left: -(len + 40) / 2, top: -30, overflow: "visible" }} viewBox={`${-(len + 40) / 2} -30 ${len + 40} 60`}>
        <line x1={-cur / 2} y1="0" x2={cur / 2} y2="0" stroke={col} strokeWidth="7" strokeDasharray={L.dotted ? "4 14" : undefined} strokeLinecap="round" />
        <line x1={-cur / 2} y1="-18" x2={-cur / 2} y2="18" stroke={col} strokeWidth="7" strokeLinecap="round" /><line x1={cur / 2} y1="-18" x2={cur / 2} y2="18" stroke={col} strokeWidth="7" strokeLinecap="round" />
        {ticks.map((_, i) => <line key={i} x1={-cur / 2 + i * 40} y1="-9" x2={-cur / 2 + i * 40} y2="9" stroke={col} strokeWidth="3" opacity={i * 40 < cur ? 1 : 0} />)}
      </svg>
      {L.label && <div style={{ position: "absolute", left: 0, top: L.below ? 38 : -70, transform: `translate(-50%,0) ${dir === "v" ? "rotate(-90deg)" : ""}`, ...base, fontSize: L.size ?? 40, color: "#1B1710", background: col, padding: "4px 18px", borderRadius: 8, opacity: g, letterSpacing: "0.06em" }}>{L.label}</div>}
    </div>
  );
};

export const Counter: React.FC<LP> = ({ L, f, dur }) => {
  const v = ip(f, L.mv ?? [0, Math.round(dur * 0.8)], [L.from ?? 0, L.to]);
  const txt = (L.decimals ? v.toFixed(L.decimals) : Math.round(v).toLocaleString("en-US"));
  return centered(<div style={{ ...base, fontSize: L.size ?? 120, color: L.color ?? "#1B1710", background: L.box === false ? "transparent" : C.yellow, padding: "10px 36px", borderRadius: 14, boxShadow: L.box === false ? "none" : "0 10px 30px rgba(0,0,0,0.4)", letterSpacing: "0.03em" }}>{(L.prefix ?? "") + txt + (L.plus ? "+" : "")}<span style={{ fontSize: (L.size ?? 120) * 0.36, marginLeft: 16, letterSpacing: "0.08em" }}>{L.unit}</span></div>);
};

export const Battery: React.FC<LP> = ({ L, f, dur }) => {
  const w = L.w ?? 620, v = ip(f, L.mv ?? [0, dur], [L.from ?? 100, L.to ?? 100], L.linear ? (x: number) => x : ease);
  const col = v > 55 ? "#58B86A" : v > 28 ? C.yellow : C.red;
  const flash = L.flash && v <= 28 ? 0.55 + 0.45 * Math.abs(Math.sin(f / 5)) : 1;
  return (
    <Ctr w={w + 30} h={150}>
      {L.label && <div style={{ ...base, position: "absolute", top: -4, width: "100%", fontSize: 34, color: C.white, textShadow: shadow }}>{L.label}</div>}
      <div style={{ position: "absolute", left: 0, top: 52, width: w, height: 90, border: `8px solid ${C.white}`, borderRadius: 18, background: "rgba(0,0,0,0.35)", opacity: flash }}>
        <div style={{ position: "absolute", left: 6, top: 6, bottom: 6, width: (w - 28) * (v / 100), background: col, borderRadius: 8 }} />
        <div style={{ ...base, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>{Math.round(v)}%</div>
      </div>
      <div style={{ position: "absolute", left: w + 2, top: 80, width: 18, height: 34, background: C.white, borderRadius: "0 8px 8px 0" }} />
    </Ctr>
  );
};

export const Gauge: React.FC<LP> = ({ L, f, dur }) => {
  const w = L.w ?? 460, a = -90 + 180 * ip(f, L.mv ?? [0, dur * 0.7], [0, L.value ?? 0.2], easeOut);
  const r = w / 2 - 20;
  return (
    <Ctr w={w} h={w * 0.72}>
      <svg width={w} height={w * 0.72} viewBox={`0 0 ${w} ${w * 0.72}`}>
        <path d={`M20 ${w / 2} A ${r} ${r} 0 0 1 ${w - 20} ${w / 2}`} stroke="rgba(255,255,255,0.35)" strokeWidth="26" fill="none" />
        <path d={`M20 ${w / 2} A ${r} ${r} 0 0 1 ${w * 0.3} ${w / 2 - r * 0.9}`} stroke="#58B86A" strokeWidth="26" fill="none" />
        <g transform={`translate(${w / 2} ${w / 2}) rotate(${a})`}><line x1="0" y1="0" x2="0" y2={-r + 6} stroke={C.yellow} strokeWidth="10" strokeLinecap="round" /><circle r="16" fill={C.yellow} /></g>
      </svg>
      {L.label && <div style={{ ...base, position: "absolute", left: 0, width: "100%", top: w / 2 + 34, fontSize: 38, color: C.white, textShadow: shadow }}>{L.label}</div>}
    </Ctr>
  );
};

export const Calendar: React.FC<LP> = ({ L, f }) => {
  const months: string[] = L.months, each = L.each ?? 22, idx = Math.min(months.length - 1, Math.floor(f / each));
  const loc = f - idx * each, flip = idx > 0 && loc < 8 ? Math.abs(Math.cos((loc / 8) * Math.PI / 2)) : 1;
  const w = L.w ?? 440, col = (L.colors ?? [])[idx] ?? C.red;
  return (
    <Ctr w={w} h={w * 0.86}>
      <div style={{ position: "absolute", inset: 0, background: "#F4EFE0", borderRadius: 18, boxShadow: "0 16px 40px rgba(0,0,0,0.45)", overflow: "hidden", transform: `scaleY(${0.25 + 0.75 * flip})`, transformOrigin: "50% 0" }}>
        <div style={{ height: w * 0.22, background: col, display: "flex", alignItems: "center", justifyContent: "center", ...base, fontSize: w * 0.09, color: "#fff" }}>{L.year ?? ""}</div>
        <div style={{ ...base, fontSize: w * 0.16, color: C.ink, display: "flex", alignItems: "center", justifyContent: "center", height: w * 0.58, letterSpacing: "0.04em" }}>{months[idx]}</div>
      </div>
      {[0.25, 0.75].map((x) => <div key={x} style={{ position: "absolute", left: w * x - 8, top: -14, width: 16, height: 40, borderRadius: 8, background: "#444" }} />)}
    </Ctr>
  );
};

export const Rank: React.FC<LP> = ({ L, f }) => (
  <Ctr w={900} h={80 + L.items.length * 120}>
    {L.items.map((it: any, i: number) => {
      const t = easeOut(clamp((f - (L.at ?? 0) - i * 10) / 14));
      return (
        <div key={i} style={{ position: "absolute", left: 0, top: i * 120, width: 900, height: 100, opacity: t, transform: `translateX(${(1 - t) * -120}px)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 100, height: 100, borderRadius: "50%", background: it.hi ? C.yellow : "rgba(255,255,255,0.25)", color: it.hi ? "#1B1710" : C.white, ...base, fontSize: 58, display: "flex", alignItems: "center", justifyContent: "center" }}>{it.rank}</div>
          <div style={{ position: "absolute", left: 124, top: 6, width: 776 * it.len * t, height: 88, borderRadius: 14, background: it.hi ? "#3E7C8C" : "rgba(255,255,255,0.18)", border: it.hi ? `5px solid ${C.yellow}` : "none" }} />
          <div style={{ ...base, position: "absolute", left: 156, top: 24, fontSize: 40, color: C.white, textAlign: "left", textShadow: shadow }}>{it.name}</div>
        </div>
      );
    })}
  </Ctr>
);

export const Pool: React.FC<LP> = ({ L, f, dur }) => {
  const w = L.w ?? 760, h = L.h ?? 300, v = ip(f, L.mv ?? [0, dur * 0.8], L.fill ?? [0, 0.5], easeOut);
  return (
    <Ctr w={w} h={h + 70}>
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, border: `8px solid ${C.white}`, borderRadius: 10, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${v * 100}%`, background: "linear-gradient(180deg,#4CC3D9,#2A93AE)" }} />
        {[1, 2, 3, 4, 5].map((i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: (h / 6) * i, height: 3, background: "rgba(255,255,255,0.45)" }} />)}
      </div>
      {L.label && <div style={{ ...base, position: "absolute", top: h + 14, width: "100%", fontSize: 38, color: C.white, textShadow: shadow }}>{L.label}</div>}
    </Ctr>
  );
};

export const Curve: React.FC<LP> = ({ L, f, dur }) => {
  const w = L.w ?? 760, h = L.h ?? 440, pts: string[] = [];
  for (let i = 0; i <= 60; i++) { const t = i / 60; const y = L.kind === "drop" ? 0.08 + 0.84 * (1 - Math.exp(-3.2 * t)) / (1 - Math.exp(-3.2)) : L.kind === "slow" ? 0.88 - 0.3 * t : 0.92 - 0.12 * t - 0.62 * (t * t * t); pts.push(`${60 + t * (w - 100)},${40 + y * (h - 90)}`); }
  const p = ip(f, L.mv ?? [6, dur], [0, 1]);
  return (
    <Ctr w={w} h={h + 40}>
      <svg width={w} height={h + 40} viewBox={`0 0 ${w} ${h + 40}`}>
        <rect x="0" y="0" width={w} height={h} rx="14" fill="rgba(4,16,31,0.55)" />
        <path d={`M60 30L60 ${h - 50}L${w - 30} ${h - 50}`} stroke={C.white} strokeWidth="4" fill="none" opacity="0.8" />
        <polyline points={pts.join(" ")} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} stroke={L.color ?? C.red} strokeWidth="9" fill="none" strokeLinecap="round" />
        {L.axis && <text x={60} y={h - 14} fill={C.white} opacity="0.75" fontFamily={FONT} fontSize="24" fontWeight="700">{L.axis}</text>}
      </svg>
      {L.label && <div style={{ ...base, position: "absolute", left: 0, top: h + 6, width: "100%", fontSize: 30, color: C.yellow }}>{L.label}</div>}
    </Ctr>
  );
};

export const TBar: React.FC<LP> = ({ L, f, dur }) => {
  const w = L.w ?? 900, v = ip(f, L.mv ?? [4, dur * 0.85], [0, L.frac ?? 1], easeOut);
  return (
    <Ctr w={w} h={150}>
      {L.label && <div style={{ ...base, position: "absolute", top: 0, width: "100%", fontSize: 40, color: C.white, textShadow: shadow }}>{L.label}</div>}
      <div style={{ position: "absolute", left: 0, top: 70, width: w, height: 58, borderRadius: 29, border: `6px solid ${C.white}`, background: "rgba(0,0,0,0.3)", overflow: "hidden" }}>
        <div style={{ width: `${v * 100}%`, height: "100%", background: L.color ?? C.yellow }} />
        {Array.from({ length: (L.ticks ?? 0) }).map((_, i) => <div key={i} style={{ position: "absolute", left: `${((i + 1) / (L.ticks + 1)) * 100}%`, top: 0, bottom: 0, width: 3, background: "rgba(0,0,0,0.5)" }} />)}
      </div>
    </Ctr>
  );
};

export const Chips: React.FC<LP> = ({ L, f }) => (
  <div style={{ position: "absolute", left: 0, top: 0, transform: "translate(-50%,-50%)", display: "flex", gap: 24 }}>
    {L.labels.map((t: string, i: number) => {
      const k = easeOut(clamp((f - (L.at ?? 0) - i * 8) / 12));
      return <div key={i} style={{ ...base, fontSize: 36, color: "#1B1710", background: i === (L.active ?? -1) ? C.yellow : "#F4EFE0", padding: "14px 30px", borderRadius: 40, opacity: k, transform: `translateY(${(1 - k) * 60}px)`, boxShadow: "0 8px 20px rgba(0,0,0,0.4)", whiteSpace: "pre" }}>{`${i + 1}  ${t}`}</div>;
    })}
  </div>
);

export const Card: React.FC<LP> = ({ L }) => {
  const w = L.w ?? 1000, h = L.h ?? 300;
  return (
    <Ctr w={w} h={h}>
      <div style={{ position: "absolute", inset: 0, background: "#F4EFE0", borderRadius: 14, border: "4px solid #8A7447", boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }} />
      <div style={{ position: "absolute", left: 34, top: -36, width: 120, height: 56, background: C.red, color: "#fff", borderRadius: "10px 10px 0 0", ...base, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>{L.num ? `№ ${L.num}` : "FILE"}</div>
      <div style={{ ...base, position: "absolute", left: L.padL ?? 40, right: 40, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: L.size ?? 56, color: C.ink, letterSpacing: "0.05em" }}>{L.text}</div>
    </Ctr>
  );
};

export const Typing: React.FC<LP> = ({ L, f, dur }) => {
  const w = L.w ?? 1100, n = Math.floor(ip(f, L.mv ?? [20, dur - 20], [0, L.text.length], (x) => x));
  const shown = L.text.slice(0, n);
  return (
    <Ctr w={w} h={260}>
      <div style={{ position: "absolute", inset: 0, background: "#212121", borderRadius: 18, boxShadow: "0 20px 50px rgba(0,0,0,0.55)" }} />
      <div style={{ position: "absolute", left: 36, top: 38, width: 70, height: 70, borderRadius: "50%", background: C.sea }} />
      <div style={{ position: "absolute", left: 128, top: 38, fontFamily: FONT, fontWeight: 700, fontSize: 28, color: "#AAA" }}>{L.name ?? "Add a comment..."}</div>
      <div style={{ position: "absolute", left: 128, top: 90, right: 40, fontFamily: FONT, fontWeight: 600, fontSize: 40, color: "#F1F1F1", lineHeight: 1.25 }}>{shown}<span style={{ opacity: Math.floor(f / 12) % 2 ? 0 : 1 }}>|</span></div>
    </Ctr>
  );
};

export const Depth: React.FC<LP> = ({ L, f, dur }) => {
  const h = L.h ?? 720, max = L.max ?? 800, v = ip(f, L.mv ?? [4, dur * 0.85], [0, L.to ?? 750], easeOut);
  return (
    <Ctr w={380} h={h + 40}>
      <div style={{ position: "absolute", left: 40, top: 20, width: 26, height: h, borderRadius: 13, background: "rgba(255,255,255,0.25)" }} />
      {[0, 200, 400, 600, 800].map((m) => <div key={m} style={{ ...base, position: "absolute", left: 80, top: 20 + (m / max) * h - 16, fontSize: 28, color: C.white, opacity: 0.85 }}>{m} M</div>)}
      <div style={{ position: "absolute", left: 28, top: 20 + (v / max) * h - 14, width: 50, height: 28, borderRadius: 14, background: C.yellow }} />
      <div style={{ ...base, position: "absolute", left: 160, top: 20 + (v / max) * h - 36, fontSize: 62, color: "#1B1710", background: C.yellow, padding: "2px 18px", borderRadius: 10 }}>{Math.round(v)}{v >= (L.to ?? 750) - 1 ? "+" : ""} M</div>
    </Ctr>
  );
};

export const Balance: React.FC<LP> = ({ L, f, dur }) => {
  const a = ip(f, L.mv ?? [4, dur * 0.7], L.tilt ?? [0, 12]);
  const w = 760, arm = 300;
  const rad = (a * Math.PI) / 180, lx = -Math.cos(rad) * arm, ly = -Math.sin(rad) * arm, rx = Math.cos(rad) * arm, ry = Math.sin(rad) * arm;
  return (
    <Ctr w={w} h={420}>
      <svg width={w} height={420} viewBox={`${-w / 2} -150 ${w} 420`} style={{ overflow: "visible" }}>
        <path d="M-60 250L60 250L0 -20Z" fill="#8A7447" /><line x1={lx} y1={ly - 10} x2={rx} y2={ry - 10} stroke={C.white} strokeWidth="14" strokeLinecap="round" />
        {[[lx, ly, "#E5584B"], [rx, ry, "#58B86A"]].map(([x, y, c], i) => <g key={i}><line x1={x as number} y1={(y as number) - 10} x2={(x as number) - 70} y2={(y as number) + 130} stroke={C.white} strokeWidth="4" /><line x1={x as number} y1={(y as number) - 10} x2={(x as number) + 70} y2={(y as number) + 130} stroke={C.white} strokeWidth="4" /><path d={`M${(x as number) - 90} ${(y as number) + 130}L${(x as number) + 90} ${(y as number) + 130}Q${x} ${(y as number) + 200} ${(x as number) - 90} ${(y as number) + 130}Z`} fill={c as string} /></g>)}
      </svg>
    </Ctr>
  );
};

export const Arrow: React.FC<LP> = ({ L, f }) => {
  const [x0, y0] = L.from, [x1, y1] = L.to, t = easeOut(clamp((f - (L.at ?? 0)) / 14));
  const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t, ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <WorldSvg>
      <line x1={x0} y1={y0} x2={x} y2={y} stroke={L.color ?? C.yellow} strokeWidth={L.sw ?? 10} strokeLinecap="round" />
      <path d="M-26 -22L8 0L-26 22" transform={`translate(${x} ${y}) rotate(${ang})`} stroke={L.color ?? C.yellow} strokeWidth={L.sw ?? 10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </WorldSvg>
  );
};

export const IconTag: React.FC<LP> = ({ L }) => (
  <Ctr w={L.w ?? 120} h={L.w ?? 120}><Icon name={L.name} w={L.w ?? 120} color={L.color} /></Ctr>
);
