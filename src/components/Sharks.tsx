import React from "react";
import { C } from "../theme";

/** All art is original flat SVG. Sharks face RIGHT; use `flip` on the layer to mirror. */

interface SideProps { mouth?: number; mono?: string; f?: number; spots?: boolean; hi?: "teeth" | "mouth" | "none"; width?: number }

export const SharkSide: React.FC<SideProps> = ({ mouth = 0.5, mono, f = 0, spots, hi, width = 1000 }) => {
  const top = mono ?? "#52646C", belly = mono ?? "#93A5A8", fin = mono ?? "#43545C", dark = mono ?? "#26343A";
  const wag = Math.sin(f / 9) * 4;
  const m = Math.max(0, Math.min(1, mouth));
  return (
    <svg width={width} height={width * 0.34} viewBox="0 0 1000 340" style={{ overflow: "visible" }}>
      <defs>
        <clipPath id="bodyclip"><path d="M972 188C945 140 860 108 700 100C560 96 400 108 262 140L168 152L168 196C300 222 440 246 600 252C760 258 900 240 972 188Z" /></clipPath>
        <clipPath id={`mc${Math.round(m * 100)}`}><ellipse cx="944" cy="206" rx={8 + 22 * m} ry={6 + 52 * m} transform="rotate(-14 944 206)" /></clipPath>
      </defs>
      <g transform={`rotate(${wag} 172 174)`}><path d="M175 150C140 120 90 70 40 40C62 90 70 120 78 168C66 214 60 250 38 292C90 262 140 215 175 196Z" fill={fin} /></g>
      <path d="M520 104C560 60 600 25 628 10C640 40 660 80 690 102Z" fill={fin} />
      <path d="M360 232C340 262 320 276 300 282C320 258 326 246 330 232Z" fill={fin} />
      <path d="M972 188C945 140 860 108 700 100C560 96 400 108 262 140L168 152L168 196C300 222 440 246 600 252C760 258 900 240 972 188Z" fill={top} />
      <g clipPath="url(#bodyclip)"><path d="M150 205C330 190 560 205 700 200C820 196 930 190 990 185L990 280L150 280Z" fill={belly} /></g>
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${772 + i * 23} 118Q${752 + i * 23} 178 ${772 + i * 23} 238`} stroke={dark} strokeWidth="4.5" fill="none" strokeLinecap="round" opacity={mono ? 0 : 0.85} />
      ))}
      <path d="M760 236C720 290 660 318 604 330C650 290 664 262 668 244Z" fill={fin} />
      {spots && [[420, 150], [500, 175], [600, 140], [680, 175], [330, 185], [740, 150], [560, 215], [450, 215]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill="#E9E4D0" opacity="0.8" />)}
      <circle cx="896" cy="160" r="5.5" fill={mono ? "#000" : "#10181B"} />
      {m > 0.05 && (
        <g>
          <ellipse cx="944" cy="206" rx={8 + 22 * m} ry={6 + 52 * m} transform="rotate(-14 944 206)" fill={mono ?? "#2A0F15"} />
          {!mono && (
            <g clipPath={`url(#mc${Math.round(m * 100)})`} stroke="#E9E4D0" strokeWidth="2" opacity="0.8">
              {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={934 + i * 1.2} y1={156 + i * 11} x2={954} y2={158 + i * 11} />)}
            </g>
          )}
        </g>
      )}
      {hi === "mouth" && <ellipse cx="944" cy="206" rx="52" ry="78" fill="none" stroke={C.yellow} strokeWidth="5" strokeDasharray="12 8" />}
    </svg>
  );
};

export const SharkFront: React.FC<{ mouth?: number; mono?: string; width?: number }> = ({ mouth = 1, mono, width = 700 }) => {
  const m = Math.max(0.1, mouth);
  return (
    <svg width={width} height={width * 0.8} viewBox="0 0 700 560" style={{ overflow: "visible" }}>
      <path d="M330 120L350 14L372 120Z" fill={mono ?? "#43545C"} />
      <path d="M130 340C40 372 14 430 40 462C100 440 160 410 176 380Z" fill={mono ?? "#43545C"} />
      <path d="M570 340C660 372 686 430 660 462C600 440 540 410 524 380Z" fill={mono ?? "#43545C"} />
      <ellipse cx="350" cy="310" rx="262" ry="220" fill={mono ?? "#52646C"} />
      <path d="M100 360C200 470 500 470 600 360C560 500 140 500 100 360Z" fill={mono ?? "#93A5A8"} />
      <circle cx="132" cy="236" r="8" fill="#10181B" /><circle cx="568" cy="236" r="8" fill="#10181B" />
      <ellipse cx="350" cy="326" rx={196 * m} ry={158 * m} fill={mono ?? "#2A0F15"} />
      {!mono && <ellipse cx="350" cy="336" rx={150 * m} ry={116 * m} fill="#4A1822" />}
      {!mono && Array.from({ length: 28 }).map((_, i) => {
        const a = (i / 28) * Math.PI * 2, rx = 196 * m, ry = 158 * m;
        const x1 = 350 + Math.cos(a) * rx, y1 = 326 + Math.sin(a) * ry;
        return <line key={i} x1={x1} y1={y1} x2={350 + Math.cos(a) * rx * 0.82} y2={326 + Math.sin(a) * ry * 0.82} stroke="#E9E4D0" strokeWidth="3" opacity="0.75" />;
      })}
    </svg>
  );
};

/** Gill arch with bristles (gill rakers). Bristles point left. */
export const GillArch: React.FC<{ width?: number; n?: number; hi?: boolean; trapped?: number }> = ({ width = 300, n = 22, hi, trapped = 0 }) => {
  const pts = Array.from({ length: n }).map((_, i) => {
    const t = i / (n - 1);
    const x = 150 - 90 * Math.sin(t * Math.PI), y = 20 + t * 360;
    return { x, y, t };
  });
  return (
    <svg width={width} height={width * 1.33} viewBox="0 0 300 400" style={{ overflow: "visible" }}>
      <path d={pts.map((p, i) => `${i ? "L" : "M"}${p.x + 12} ${p.y}`).join(" ")} stroke={C.parchment} strokeWidth="14" fill="none" strokeLinecap="round" />
      {pts.map((p, i) => <line key={i} x1={p.x + 8} y1={p.y} x2={p.x - 78} y2={p.y + 6} stroke={hi ? C.yellow : "#E9E4D0"} strokeWidth="5" strokeLinecap="round" />)}
      {Array.from({ length: trapped }).map((_, i) => <circle key={i} cx={30 + ((i * 37) % 80)} cy={30 + ((i * 53) % 340)} r="6" fill={C.plankton} />)}
    </svg>
  );
};

/** Head cutaway: mouth on the LEFT, five gill slits on the right. */
export const SharkCut: React.FC<{ hi?: "slits" | "rakers" | "none"; f?: number; width?: number; flow?: boolean }> = ({ hi = "none", f = 0, width = 900, flow }) => {
  const arches = [0, 1, 2, 3, 4].map((i) => 540 + i * 62);
  const bez = (x: number, t: number) => {
    const y = (1 - t) * (1 - t) * 150 + 2 * (1 - t) * t * 270 + t * t * 392;
    const xx = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * (x - 40) + t * t * x;
    return [xx, y];
  };
  return (
    <svg width={width} height={width * 0.58} viewBox="0 0 900 520" style={{ overflow: "visible" }}>
      <path d="M30 270C60 190 200 110 420 96C620 90 800 120 870 170L870 400C800 430 620 440 420 436C220 430 90 360 30 270Z" fill="#52646C" />
      <path d="M40 268C140 215 300 205 440 200L720 186L720 358L440 346C300 346 140 330 40 268Z" fill="#2A0F15" />
      <path d="M40 268C140 300 300 346 440 346L720 358L720 380L440 392C250 392 100 340 40 268Z" fill="#93A5A8" />
      {arches.map((x, i) => (
        <g key={i}>
          <path d={`M${x} 150Q${x - 40} 270 ${x} 392`} stroke={hi === "slits" ? C.yellow : C.parchment} strokeWidth="9" fill="none" />
          {Array.from({ length: 16 }).map((_, k) => {
            const [px, py] = bez(x, (k + 0.5) / 16);
            return <line key={k} x1={px - 2} y1={py} x2={px - 30} y2={py + 4} stroke={hi === "rakers" ? C.yellow : "#E9E4D0"} strokeWidth="3" />;
          })}
          <path d={`M${x + 22} 128L${x + 22} 160M${x + 22} 372L${x + 22} 404`} stroke="#26343A" strokeWidth="6" />
        </g>
      ))}
      <path d="M870 170L870 400" stroke="#26343A" strokeWidth="4" />
      {flow && Array.from({ length: 6 }).map((_, i) => {
        const p = ((f / 40 + i / 6) % 1);
        return <circle key={i} cx={40 + p * 700} cy={265 + Math.sin(i * 2 + p * 6) * 40} r="5" fill={C.plankton} opacity={0.4 + 0.5 * Math.sin(p * Math.PI)} />;
      })}
    </svg>
  );
};
