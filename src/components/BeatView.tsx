import React from "react";
import { staticFile } from "remotion";
import { W, H } from "../theme";
import type { Beat, Cam, LayerSpec } from "../data/types";
import { clamp, enter, ease, ip, lerp, rnd } from "../util";
import { Background } from "./Scenes";
import { LP } from "./Layers1";
import * as A from "./Layers1";
import * as B from "./Layers2";

export const REGISTRY: Record<string, React.FC<LP>> = {
  icon: A.IconLayer, shark: A.SharkLayer, sharkFront: A.SharkFrontLayer, sharkCut: A.SharkCutLayer, gillArch: A.GillArchLayer,
  school: A.School, cloud: A.Cloud, glow: A.Glow, stream: A.Stream, speed: A.SpeedLines, pulse: A.Pulse, splash: A.Splash,
  waves: A.Waves, rain: A.Rain, lightning: A.Lightning, fog: A.Fog, fin: A.Fin, zzz: A.Zzz, qmarks: A.QMarks, markers: A.Markers,
  trail: A.Trail, patches: A.Patches, net: A.Net, ring: A.Ring, row: A.Row,
  text: B.Text, cap: B.Cap, credit: B.Credit, label: B.Label, stamp: B.Stamp, paper: B.Paper, bracket: B.Bracket, counter: B.Counter,
  battery: B.Battery, gauge: B.Gauge, calendar: B.Calendar, rank: B.Rank, pool: B.Pool, curve: B.Curve, tbar: B.TBar, chips: B.Chips,
  card: B.Card, typing: B.Typing, depth: B.Depth, balance: B.Balance, arrow: B.Arrow,
};

// layers that animate themselves or run continuously: no automatic fade-in
const NO_ENTER = new Set(["stamp", "cap", "waves", "rain", "lightning", "fog", "trail", "stream", "patches", "cloud", "glow", "school", "pulse", "splash", "arrow", "markers", "chips", "qmarks", "zzz", "speed", "net", "ring", "row", "label", "bracket", "rank", "typing", "counter"]);
// layers that handle their own `at` delay
const SELF_AT = new Set(["stamp", "cap", "pulse", "splash", "arrow", "markers", "chips", "qmarks", "ring", "row", "label", "bracket", "rank", "lightning", "net"]);

const Mover: React.FC<{ L: LayerSpec; f: number; dur: number }> = ({ L, f, dur }) => {
  const Comp = REGISTRY[L.t];
  if (!Comp) throw new Error(`Unknown layer type "${L.t}"`);
  const p = ip(f, L.mv ?? [0, dur], [0, 1], ease);
  const to = L.go ?? {};
  const x = lerp(L.x ?? 0, to.x ?? L.x ?? 0, p), y = lerp(L.y ?? 0, to.y ?? L.y ?? 0, p);
  const s = lerp(L.s ?? 1, to.s ?? L.s ?? 1, p), r = lerp(L.r ?? 0, to.r ?? L.r ?? 0, p);
  const anim = L.in ?? (NO_ENTER.has(L.t) ? "none" : "fade");
  const e = enter(anim, f, L.at ?? 0, L.inLen ?? 10);
  const gate = L.at !== undefined && !SELF_AT.has(L.t) && f < L.at ? 0 : 1;
  const out = L.out !== undefined ? 1 - clamp((f - L.out) / 8) : 1;
  const bob = L.bob ? Math.sin(f / 22) * L.bob : 0;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, opacity: (L.op ?? 1) * e.op * gate * out, transform: `translate(${x + e.dx}px, ${y + e.dy + bob}px) rotate(${r}deg) scale(${s * e.sc})`, transformOrigin: "0 0", filter: L.blur ? `blur(${L.blur}px)` : undefined, zIndex: L.z ?? 0 }}>
      <div style={{ position: "absolute", left: 0, top: 0, transform: L.flip ? "scaleX(-1)" : undefined, transformOrigin: "0 0" }}><Comp L={L} f={f} dur={dur} /></div>
    </div>
  );
};

const DEFAULT_CAM: Cam = { s0: 1, s1: 1.08, f0: [W / 2, H / 2], f1: [W / 2, H / 2] };

export const BeatView: React.FC<{ beat: Beat; frame: number }> = ({ beat, frame }) => {
  const P = beat.props, off = P.offset ?? 0, of = frame + off, od = P.origDuration ?? beat.durationFrames, d = beat.durationFrames;
  const cam = P.cam ?? DEFAULT_CAM, t = ease(clamp(frame / Math.max(1, d - 1)));
  const sc = lerp(cam.s0, cam.s1, t), fx = lerp(cam.f0[0], cam.f1[0], t), fy = lerp(cam.f0[1], cam.f1[1], t);
  const sh = P.shake ? { x: (rnd("shx" + frame) - 0.5) * P.shake * 2, y: (rnd("shy" + frame) - 0.5) * P.shake * 2 } : { x: 0, y: 0 };
  const bg = P.bg ?? { kind: "water" };
  const world = P.layers.map((L, i) => (L.hud ? null : <Mover key={i} L={L} f={of} dur={od} />));
  const hud = [...P.layers.filter((L) => L.hud), ...(P.hud ?? [])].map((L, i) => <Mover key={"h" + i} L={{ ...L, hud: true }} f={of} dur={od} />);
  let op = 1;
  if (P.fade === "in" || P.fade === "inout") op = Math.min(op, clamp(frame / 24));
  if (P.fade === "out" || P.fade === "inout") op = Math.min(op, clamp((d - frame) / 20));
  if (P.dissolve) op = Math.min(op, clamp(frame / P.dissolve));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: op, background: "#000" }}>
      <div style={{ position: "absolute", inset: 0, filter: P.grade, transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `translate(${W / 2}px, ${H / 2}px) scale(${sc}) translate(${-fx}px, ${-fy}px)`, transformOrigin: "0 0" }}>
          <Background b={bg} f={of} dur={od} />
          {world}
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) ${bg.vigIn ?? 52}%, rgba(0,0,0,${bg.vig ?? 0.5}) 100%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${staticFile("assets/grain.png")})`, backgroundSize: "512px", backgroundPosition: `${Math.floor(rnd("gx" + frame) * 512)}px ${Math.floor(rnd("gy" + frame) * 512)}px`, mixBlendMode: "overlay", opacity: 0.06 * 2.2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0 }}>{hud}</div>
    </div>
  );
};
