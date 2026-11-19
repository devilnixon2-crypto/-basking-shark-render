import React from "react";
import { C } from "../theme";

export interface IconDef { w: number; h: number; el: (c: string, f: number, c2: string) => React.ReactNode }

const P = (d: string, fill?: string, extra: React.SVGProps<SVGPathElement> = {}) => <path d={d} fill={fill} {...extra} />;

export const ICONS: Record<string, IconDef> = {
  fish: { w: 100, h: 100, el: (c) => <g>{P("M8 50Q35 18 66 40L92 22L85 50L92 78L66 60Q35 82 8 50Z", c)}<circle cx="28" cy="46" r="3.5" fill="#0A1A20" /></g> },
  copepod: { w: 140, h: 80, el: (c) => <g stroke={c} strokeWidth="3" fill="none" strokeLinecap="round"><ellipse cx="70" cy="40" rx="34" ry="14" fill={c} /><path d="M36 40Q10 14 2 6M36 36Q14 30 2 24M104 40L136 34M104 44L136 52M56 54L48 74M70 54L66 76M84 54L86 74M56 26L50 6M70 26L72 4" /><circle cx="52" cy="36" r="3" fill="#0A1A20" stroke="none" /></g> },
  plankton: { w: 60, h: 60, el: (c) => <g stroke={c} strokeWidth="3" strokeLinecap="round"><circle cx="30" cy="30" r="9" fill={c} />{[0, 60, 120, 180, 240, 300].map((a) => <line key={a} x1={30 + 12 * Math.cos((a * Math.PI) / 180)} y1={30 + 12 * Math.sin((a * Math.PI) / 180)} x2={30 + 24 * Math.cos((a * Math.PI) / 180)} y2={30 + 24 * Math.sin((a * Math.PI) / 180)} />)}</g> },
  rice: { w: 120, h: 60, el: () => <g><ellipse cx="60" cy="30" rx="50" ry="17" fill="#F3EEDC" transform="rotate(-12 60 30)" /><ellipse cx="60" cy="30" rx="50" ry="17" fill="none" stroke="#C9C1A5" strokeWidth="3" transform="rotate(-12 60 30)" /></g> },
  coin: { w: 100, h: 100, el: () => <g><circle cx="50" cy="50" r="46" fill="#D9B648" /><circle cx="50" cy="50" r="36" fill="none" stroke="#A8862A" strokeWidth="5" /></g> },
  tooth: { w: 80, h: 100, el: (c) => P("M14 92C16 54 30 20 62 6C54 30 52 56 66 92Z", c) },
  bus: { w: 400, h: 190, el: (c) => <g><rect x="8" y="14" width="384" height="140" rx="22" fill={c} />{[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={26 + i * 52} y="30" width="38" height="34" rx="5" fill="#0E2630" opacity="0.8" />)}{[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={26 + i * 52} y="84" width="38" height="34" rx="5" fill="#0E2630" opacity="0.8" />)}<rect x="330" y="84" width="48" height="60" rx="5" fill="#0E2630" opacity="0.8" /><circle cx="90" cy="156" r="24" fill="#10181B" /><circle cx="310" cy="156" r="24" fill="#10181B" /></g> },
  car: { w: 160, h: 70, el: (c) => <g><path d="M8 48L8 36Q10 28 30 26L48 8Q56 4 70 4L100 4Q112 6 120 24L146 30Q154 34 154 48Z" fill={c} /><circle cx="42" cy="52" r="14" fill="#10181B" /><circle cx="118" cy="52" r="14" fill="#10181B" /></g> },
  human: { w: 60, h: 160, el: (c) => <g fill={c}><circle cx="30" cy="16" r="14" /><path d="M10 40Q30 30 50 40L54 100L42 100L40 156L32 156L30 112L28 156L20 156L18 100L6 100Z" /></g> },
  walker: { w: 70, h: 160, el: (c) => <g fill={c} stroke={c}><circle cx="36" cy="16" r="13" /><path d="M24 38Q40 30 52 40L50 94L38 96L26 94Z" stroke="none" /><path d="M32 94L18 152M44 94L58 150M26 44L10 84M48 44L60 80" strokeWidth="9" strokeLinecap="round" fill="none" /></g> },
  boat: { w: 260, h: 130, el: (c) => <g><path d="M8 80L252 80L224 118L40 118Z" fill={c} /><rect x="120" y="40" width="54" height="40" fill={c} /><rect x="132" y="18" width="30" height="22" fill={c} /><line x1="60" y1="80" x2="60" y2="14" stroke={c} strokeWidth="6" /><path d="M64 18L100 34L64 50Z" fill={c} opacity="0.7" /></g> },
  trawler: { w: 420, h: 190, el: (c) => <g><path d="M10 110L410 110L372 170L46 170Z" fill={c} /><rect x="260" y="56" width="90" height="54" fill={c} /><rect x="278" y="26" width="52" height="30" fill={c} /><rect x="60" y="76" width="130" height="34" fill={c} /><path d="M70 76L40 20L56 20L96 76Z" fill={c} /><path d="M366 110L404 40" stroke={c} strokeWidth="7" /></g> },
  sun: { w: 140, h: 140, el: (c) => <g fill={c} stroke={c} strokeWidth="6" strokeLinecap="round"><circle cx="70" cy="70" r="30" stroke="none" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1={70 + 42 * Math.cos((a * Math.PI) / 180)} y1={70 + 42 * Math.sin((a * Math.PI) / 180)} x2={70 + 62 * Math.cos((a * Math.PI) / 180)} y2={70 + 62 * Math.sin((a * Math.PI) / 180)} />)}</g> },
  lamp: { w: 100, h: 110, el: (c) => <g fill={c}><path d="M30 40L70 40L82 98L18 98Z" /><rect x="40" y="16" width="20" height="26" /><path d="M50 4Q62 18 50 22Q38 18 50 4Z" fill={C.yellow} /></g> },
  bottle: { w: 80, h: 120, el: (c) => <g fill={c}><rect x="30" y="4" width="20" height="22" rx="3" /><path d="M22 28L58 28L66 108L14 108Z" /></g> },
  can: { w: 90, h: 110, el: (c) => <g fill={c}><rect x="14" y="30" width="62" height="74" rx="8" /><path d="M76 40L94 24L82 14L64 30Z" /><rect x="28" y="10" width="34" height="22" rx="4" /></g> },
  flask: { w: 90, h: 120, el: (c) => <g><path d="M34 6L56 6L56 44L84 108Q86 114 78 114L12 114Q4 114 6 108L34 44Z" fill="none" stroke={c} strokeWidth="6" strokeLinejoin="round" /><path d="M18 90L72 90L82 108L8 108Z" fill={C.plankton} opacity="0.85" /></g> },
  tag: { w: 60, h: 160, el: (c) => <g><rect x="14" y="60" width="32" height="96" rx="14" fill={c} /><line x1="30" y1="60" x2="30" y2="4" stroke={c} strokeWidth="5" /><circle cx="30" cy="30" r="6" fill={C.red} /></g> },
  satellite: { w: 200, h: 120, el: (c) => <g fill={c}><rect x="78" y="34" width="44" height="52" rx="6" /><rect x="6" y="44" width="62" height="32" /><rect x="132" y="44" width="62" height="32" /><line x1="100" y1="34" x2="100" y2="8" stroke={c} strokeWidth="4" /><circle cx="100" cy="8" r="6" /></g> },
  hourglass: { w: 90, h: 140, el: (c) => <g><path d="M14 8L76 8L76 20Q76 52 46 70Q76 88 76 120L76 132L14 132L14 120Q14 88 44 70Q14 52 14 20Z" fill="none" stroke={c} strokeWidth="7" strokeLinejoin="round" /><path d="M28 112L62 112L45 94Z" fill={C.yellow} /></g> },
  notebook: { w: 90, h: 110, el: (c) => <g><rect x="8" y="6" width="74" height="98" rx="6" fill={c} />{[24, 40, 56, 72].map((y) => <line key={y} x1="22" x2="68" y1={y} y2={y} stroke="#2B2118" strokeWidth="3" opacity="0.6" />)}</g> },
  scientist: { w: 180, h: 260, el: (c) => <g fill={c}><circle cx="90" cy="46" r="34" /><path d="M54 30Q90 -14 126 30Z" /><path d="M10 250Q10 120 90 104Q170 120 170 250Z" /><rect x="102" y="150" width="62" height="80" rx="5" fill="#E9DDBF" transform="rotate(-10 130 190)" /></g> },
  surgeon: { w: 190, h: 280, el: (c) => <g fill={c}><circle cx="90" cy="50" r="30" /><rect x="64" y="8" width="52" height="22" rx="4" /><rect x="48" y="26" width="84" height="8" rx="3" /><path d="M14 270Q14 120 90 98Q166 120 166 270Z" /></g> },
  liver: { w: 360, h: 180, el: (c) => <path d="M20 80Q40 14 140 20Q250 24 332 70Q356 90 334 118Q290 168 190 160Q80 156 40 128Q16 112 20 80Z" fill={c} /> },
  vertebra: { w: 50, h: 70, el: (c) => <g fill={c}><rect x="4" y="18" width="42" height="40" rx="10" /><path d="M25 18L25 2" stroke={c} strokeWidth="6" /></g> },
  skull: { w: 90, h: 70, el: (c) => <g fill={c}><path d="M8 40Q8 6 46 6Q84 8 82 40L70 44L70 62L48 62L46 52L34 52L30 62L14 62L14 44Z" /><circle cx="34" cy="30" r="7" fill="#0E1A1F" /></g> },
  pup: { w: 120, h: 50, el: (c) => <path d="M4 25Q20 6 56 12L96 20Q116 22 116 28Q104 40 60 38Q30 38 22 44L10 46Q16 32 4 25Z" fill={c} /> },
  krill: { w: 40, h: 20, el: (c) => <path d="M2 10Q14 2 28 6L38 10L28 14Q14 18 2 10Z" fill={c} /> },
  question: { w: 80, h: 120, el: (c) => <text x="40" y="100" fontSize="120" fontWeight="800" textAnchor="middle" fill={c} fontFamily="Raleway, sans-serif">?</text> },
  scale: { w: 360, h: 220, el: (c) => <g stroke={c} strokeWidth="8" fill="none" strokeLinecap="round"><line x1="180" y1="30" x2="180" y2="200" /><line x1="110" y1="204" x2="250" y2="204" /><circle cx="180" cy="26" r="9" fill={c} /></g> },
  clock: { w: 140, h: 140, el: (c, f) => <g><circle cx="70" cy="70" r="60" fill="none" stroke={c} strokeWidth="8" /><line x1="70" y1="70" x2="70" y2="26" stroke={c} strokeWidth="7" strokeLinecap="round" transform={`rotate(${f * 6} 70 70)`} /><line x1="70" y1="70" x2="98" y2="70" stroke={c} strokeWidth="7" strokeLinecap="round" transform={`rotate(${f / 2} 70 70)`} /></g> },
  document: { w: 220, h: 290, el: (c) => <g><rect x="6" y="6" width="208" height="278" rx="6" fill={c} stroke="#7A6A48" strokeWidth="4" />{[50, 80, 110, 140, 170, 200].map((y, i) => <line key={y} x1="30" x2={i % 3 === 2 ? 120 : 190} y1={y} y2={y} stroke="#2B2118" strokeWidth="4" opacity="0.55" />)}</g> },
  monster: { w: 520, h: 520, el: (c) => <g fill={c}><path d="M60 480Q70 360 170 330Q260 330 270 420L330 440L380 480Z" /><path d="M210 360Q200 240 250 150Q262 100 290 64Q300 36 330 40Q352 46 346 66Q330 76 316 100Q300 150 294 260Q296 340 290 400Z" /><path d="M330 40Q372 30 392 52Q372 62 346 66Z" /><path d="M100 470Q60 500 20 500L80 440Z" /><path d="M360 470Q420 486 470 470L400 440Z" /></g> },
  plesio: { w: 560, h: 300, el: (c) => <g fill="none" stroke={c} strokeWidth="6" strokeDasharray="14 9" strokeLinejoin="round"><path d="M110 210Q160 150 290 160Q360 165 400 190L470 150Q500 100 520 70Q528 52 548 56Q556 66 540 76Q524 110 512 160Q490 214 440 232Q330 270 190 240L100 262Q80 252 110 210Z" /><path d="M250 232L200 292L260 260Z M370 236L350 296L406 262Z" /></g> },
  carcass: { w: 700, h: 260, el: (c) => <g fill={c}><path d="M10 230Q30 170 120 160Q230 140 340 170Q420 150 500 130Q560 100 590 60Q600 38 622 44Q640 50 632 68Q612 78 604 100Q590 150 530 180Q460 220 380 232Q200 258 60 252Z" /><path d="M590 44Q630 26 658 44Q640 60 612 56Z" /><path d="M150 168L112 206M210 156L190 214M280 160L276 222M360 170L372 226M110 240L40 254L30 226" stroke={c} strokeWidth="14" strokeLinecap="round" fill="none" /></g> },
  whale: { w: 800, h: 260, el: (c) => <g fill={c}><path d="M780 130Q720 40 520 40Q300 44 140 100Q60 128 10 100L20 160L10 224Q70 204 140 170Q300 234 520 222Q720 214 780 130Z" /><path d="M470 200Q430 250 360 262Q392 230 400 204Z" /></g> },
  rocks: { w: 1200, h: 220, el: (c) => <g fill={c}><path d="M0 220L0 140Q60 80 120 120Q170 40 260 90Q330 60 390 120Q470 70 540 130Q620 100 700 150Q790 90 870 140Q950 80 1040 130Q1120 100 1200 150L1200 220Z" /></g> },
  cross: { w: 100, h: 100, el: (c) => <g stroke={c} strokeWidth="14" strokeLinecap="round"><line x1="14" y1="14" x2="86" y2="86" /><line x1="86" y1="14" x2="14" y2="86" /></g> },
  check: { w: 100, h: 100, el: (c) => <path d="M12 54L38 80L90 20" fill="none" stroke={c} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" /> },
  pin: { w: 60, h: 90, el: (c) => <g><path d="M30 86Q4 52 4 32Q4 4 30 4Q56 4 56 32Q56 52 30 86Z" fill={c} /><circle cx="30" cy="32" r="11" fill="#2B2118" /></g> },
  spark: { w: 40, h: 40, el: (c) => <circle cx="20" cy="20" r="8" fill={c} /> },
  diver: { w: 200, h: 110, el: (c) => <g fill={c}><ellipse cx="90" cy="55" rx="55" ry="17" /><circle cx="150" cy="50" r="17" /><rect x="146" y="38" width="24" height="12" rx="4" fill="#9FD8E6" /><rect x="62" y="34" width="46" height="14" rx="6" fill="#C9A227" /><path d="M38 52L2 30L8 62Z" /><path d="M38 60L4 86L14 94Z" /><path d="M92 68L74 98L92 100Z" /></g> },
  finIcon: { w: 100, h: 100, el: (c) => <path d="M10 92C30 80 46 40 56 6C66 40 80 78 92 92Z" fill={c} /> },
  steak: { w: 110, h: 90, el: (c) => <g><path d="M14 40Q10 12 52 10Q100 8 98 44Q96 80 52 80Q16 80 14 40Z" fill={c} /><circle cx="60" cy="42" r="12" fill="#F3E7D0" /></g> },
  crate: { w: 120, h: 100, el: (c) => <g fill="none" stroke={c} strokeWidth="7"><rect x="8" y="20" width="104" height="72" /><line x1="8" y1="46" x2="112" y2="46" /><line x1="8" y1="70" x2="112" y2="70" /></g> },
  bone: { w: 120, h: 40, el: (c) => <path d="M16 8Q4 8 4 18Q4 26 12 28Q6 36 16 36Q24 36 26 28L94 28Q96 36 104 36Q116 34 112 26Q120 22 116 12Q110 4 100 10Q94 12 94 12L26 12Q24 6 16 8Z" fill={c} /> },
};

export const Icon: React.FC<{ name: string; color?: string; color2?: string; f?: number; w?: number }> = ({ name, color = C.white, color2 = "#000", f = 0, w }) => {
  const d = ICONS[name];
  if (!d) return null;
  const k = w ? w / d.w : 1;
  return <svg width={d.w * k} height={d.h * k} viewBox={`0 0 ${d.w} ${d.h}`} style={{ overflow: "visible" }}>{d.el(color, f, color2)}</svg>;
};
