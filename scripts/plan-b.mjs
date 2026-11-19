import { INK, YEL, RED, WHT, GRN, cap, T, I, SH, FR, CUT, BR, ST, water, surface, parch, dark, flat, map, globe, credit, CAMZ } from "./plan-helpers.mjs";

const HUNTER = "#6A4A4A";

export const scenesB = [
  // ---------------- S08 THE TEETH ----------------
  { n: 8, beats: [
    { a: 0, bg: water("deep"), f: [960, 640], layers: [FR(960, 560, 1250, { mouth: 1 }), { t: "pulse", x: 960, y: 700, r0: 300, color: "rgba(242,201,76,0.8)", at: 14 }], hud: [cap("HUNDREDS OF TEETH")] },
    { a: 2, bg: water("deep"), f: [960, 540], more: [[cap("HOOKED, NOT BITING", { tone: "white" })]], layers: [I("tooth", 800, 520, 330, { color: "#EDE7D3", r: 12, in: "pop" }), I("coin", 1200, 600, 240, { at: 8, in: "pop" }), { t: "label", text: "COIN FOR SCALE", x: 1200, y: 800, ptr: [0, -90], at: 18 }], hud: [cap("TINY, HOOKED")] },
    { a: 3, bg: water("deep"), f: [960, 520], layers: [T("FEEDING", 960, 500, 220, { color: WHT }), I("cross", 960, 500, 400, { color: RED, at: 12, in: "pop" })] },
    { a: 4, bg: water("deep"), f: [960, 540], more: [[cap("FUNCTION STILL UNCERTAIN", { tone: "white" })]], layers: [SH(560, 560, 640, { mono: "#BFD4DA", op: 0.8 }), SH(1360, 560, 640, { mono: "#BFD4DA", op: 0.8, flip: true, at: 10 }), { t: "qmarks", x: 960, y: 520, n: 5, r: 260, at: 18 }], hud: [cap("MATING?")] },
    { a: 5, bg: water("deep"), f: [960, 540], layers: [I("tooth", 960, 460, 260, { color: "#EDE7D3" }), ST("NOT WEAPONS", 960, 620, { size: 100 })] },
  ] },

  // ---------------- S09 THE LEAP ----------------
  { n: 9, beats: [
    { a: 0, bg: surface({ sky: "haze", horizon: 560, vig: 0.4 }), f: [960, 560], layers: [{ t: "fin", x: 700, y: 580, w: 260, go: { x: 1000 } }, { t: "waves", y: 590, amp: 10, n: 2, gap: 40, op: 0.55 }, { t: "splash", x: 1000, y: 580, at: 70 }] },
    { a: 1, bg: surface({ sky: "haze", horizon: 700, vig: 0.4 }), f: [960, 440], cam: CAMZ(1.1, 1.05, [960, 500]), more: [[cap("SLOW MOTION", { tone: "white" })]],
      layers: [SH(960, 800, 900, { r: 0, go: { y: 380, r: -38 }, mv: [0, 90] }), { t: "waves", y: 700, amp: 12, n: 2, gap: 40, op: 0.7 }, { t: "splash", x: 940, y: 700, at: 4 }], hud: [cap("BREACH", { size: 100 })] },
    { a: 1.55, bg: surface({ sky: "haze", horizon: 760, vig: 0.4 }), f: [960, 480],
      layers: [SH(330, 600, 380, { mono: "#33454D", r: -50 }), SH(760, 520, 380, { mono: "#33454D", r: -38, at: 8 }), SH(1170, 470, 380, { mono: "#33454D", r: -30, at: 16 }), SH(1580, 560, 380, { mono: "#33454D", r: -44, at: 24 }), { t: "waves", y: 760, amp: 10, n: 2, gap: 40, op: 0.7 }], hud: [cap("SEVERAL IN A ROW")] },
    { a: 2, bg: parch({ vig: 0.5 }), f: [960, 540], layers: [{ t: "paper", kind: "parch", w: 900, h: 460, x: 960, y: 540, in: "slideD" }, T("1937", 960, 540, 230, { color: INK, at: 10 })] },
    { a: 2.4, bg: surface({ sky: "dusk", horizon: 640, vig: 0.55 }), f: [1000, 640], more: [[cap("A BOAT CAPSIZED", { tone: "white" })]],
      layers: [I("boat", 760, 670, 400, { color: "#14191B", r: 0, go: { r: 34, y: 700 }, mv: [30, 100] }), SH(1300, 900, 620, { mono: "#14191B", r: -30, go: { x: 1100, y: 560, r: -60 }, mv: [0, 70] }), { t: "waves", y: 700, amp: 12, n: 2, gap: 40, op: 0.8 }] },
    { a: 3, bg: map([-3, 54.5], 2600, "chart"), f: [960, 540], more: [[cap("RECORDED: ONLY ONE", { tone: "white" })]],
      layers: [{ t: "icon", name: "pin", geo: [-2.5, 54.0], w: 70, color: RED, in: "drop", at: 10 }, credit()], hud: [cap("ONLY RECORDED FATAL SHARK ENCOUNTER IN THE UK", { size: 44 })] },
    { a: 4, bg: water("green"), f: [960, 540], more: [[cap("STILL NOT FULLY UNDERSTOOD", { tone: "white" })]], layers: [SH(960, 600, 1000, { mono: "#6FA0A8", op: 0.7 }), { t: "qmarks", x: 960, y: 520, n: 7, r: 330 }], hud: [cap("WHY LEAP?", { size: 90 })] },
  ] },

  // ---------------- S10 ENERGY ----------------
  { n: 10, beats: [
    { a: 0, bg: water("blueGreen"), f: [960, 540], more: [[cap("ONE ANSWER: ENERGY", { tone: "white" })]], layers: [SH(960, 700, 900, { op: 0.5, mono: "#2C3C42" }), T("WHY NOT\nHUNT FISH?", 960, 420, 150, { color: WHT, in: "pop" })] },
    { a: 1, bg: water("blueGreen"), f: [960, 540], layers: [{ t: "battery", x: 960, y: 500, w: 700, from: 100, to: 100, label: "ENERGY" }], hud: [cap("ENERGY IS THE ANSWER", { tone: "white" })] },
    { a: 2, bg: water("blueGreen"), f: [960, 540], more: [[cap("SPEED. ACCELERATION. TURNS.", { tone: "white" })]],
      layers: [SH(500, 700, 700, { mono: HUNTER, mouth: 0.2, go: { x: 1000 }, mv: [0, 90] }), I("fish", 1150, 700, 120, { color: "#BFE3DB", go: { x: 1700 }, mv: [0, 90] }), { t: "speed", x: 960, y: 640, w: 1500, h: 300, n: 14 }, { t: "battery", x: 960, y: 240, w: 600, from: 100, to: 55, mv: [0, 110], label: "HUNTER’S ENERGY" }] },
    { a: 3, bg: water("blueGreen"), f: [960, 540], layers: [SH(600, 640, 700, { mono: HUNTER, mouth: 0.4 }), I("fish", 1100, 600, 130, { color: "#BFE3DB", r: 0, go: { x: 1400, y: 380, r: -30 }, mv: [0, 40] }), { t: "speed", x: 1000, y: 600, w: 1000, h: 300, n: 10, dir: -1 }], hud: [cap("FISH ARE FAST")] },
    { a: 4, bg: dark(), f: [960, 540], layers: [{ t: "gauge", x: 560, y: 520, w: 560, value: 0.14, label: "BASKING SHARK" }, { t: "gauge", x: 1360, y: 520, w: 560, value: 0.88, label: "FAST FISH", at: 10 }], hud: [cap("BURSTS OF SPEED")] },
    { a: 5, bg: water("blueGreen"), f: [1200, 560], more: [[cap("EVERY FAILED HUNT COSTS ENERGY", { tone: "white" })]], layers: [SH(800, 560, 800, { mono: HUNTER, mouth: 1, go: { x: 1100 }, mv: [0, 40] }), I("fish", 1400, 440, 110, { color: "#BFE3DB", go: { x: 1700, y: 260 }, mv: [20, 60] })], hud: [cap("MISSED", { tone: "red", size: 100 })] },
    { a: 5.55, bg: water("blueGreen"), f: [960, 540], layers: [{ t: "battery", x: 960, y: 480, w: 780, from: 55, to: 20, mv: [0, 40], flash: true, label: "ENERGY" }], hud: [cap("ENERGY WASTED", { tone: "red", size: 80 })] },
    { a: 6, bg: water("blueGreen"), f: [960, 540], more: [[cap("COSTLY WHEN YOU MUST EAT CONSTANTLY", { tone: "white" })]], layers: [{ t: "battery", x: 960, y: 480, w: 780, from: 20, to: 12, flash: true, label: "ENERGY" }], hud: [cap("A COSTLY STRATEGY", { tone: "red" })] },
  ] },

  // ---------------- S11 PLANKTON DOES NOT RUN ----------------
  { n: 11, beats: [
    { a: 0, bg: water("bright"), f: [960, 540], layers: [{ t: "cloud", x: 960, y: 540, n: 90, spread: [1500, 800], size: 30, vx: 0.8 }], hud: [cap("PLANKTON DRIFTS", { tone: "white" })] },
    { a: 1, bg: { kind: "chart" }, f: [960, 540], more: [[cap("MILLIONS PER PATCH", { tone: "white" })]], layers: [{ t: "patches", pts: [[520, 400, 190], [1200, 600, 260], [1560, 300, 140], [800, 800, 150]], drift: [8, 2] }, { t: "text", text: "PATCHES", x: 1200, y: 600, size: 50, color: WHT, at: 20 }], hud: [cap("OVERHEAD SEA CHART", { tone: "white", size: 40, y: 120 })] },
    { a: 2, bg: water("bright"), f: [960, 540], layers: [{ t: "cloud", x: 960, y: 540, n: 20, spread: [1200, 400], size: 60, vx: 0.4 }, I("cross", 960, 540, 260, { color: RED, op: 0.8, at: 14, in: "pop" })], hud: [cap("CAN’T RUN", { tone: "red", size: 90 })] },
    { a: 3, bg: water("blueGreen"), f: [960, 540], more: [[cap("NO CHASE, STEADY CRUISING")], [cap("BULK, NOT BITES", { tone: "white" })]],
      layers: [SH(760, 540, 1100, { mouth: 0.9 }), { t: "cloud", x: 1550, y: 560, n: 50, spread: [600, 420], size: 20, vx: -1.2 }, { t: "stream", from: [1700, 520], to: [1230, 570], n: 28 }, { t: "battery", x: 960, y: 150, w: 520, from: 100, to: 88, mv: [0, 220], linear: true, label: "ENERGY" }] },
    { a: 4, bg: water("blueGreen"), f: [960, 540], layers: [{ t: "battery", x: 960, y: 480, w: 780, from: 88, to: 80, linear: true, label: "SWIMMING + FILTERING" }], hud: [cap("STILL COSTS ENERGY")] },
    { a: 5, bg: water("bright"), f: [960, 540], more: [[cap("LOWER COST THAN CHASING")], [cap("ENORMOUS NUMBERS, ONE SESSION", { tone: "white" })]], layers: [{ t: "pool", x: 620, y: 500, w: 560, h: 300, fill: [0.1, 0.85], label: "HUGE VOLUME OF WATER" }, { t: "battery", x: 1330, y: 500, w: 560, from: 88, to: 82, linear: true, label: "ENERGY" }], hud: [cap("LOWER COST THAN CHASING")] },
  ] },

  // ---------------- S12 THE TRADE ----------------
  { n: 12, beats: [
    { a: 0, bg: { kind: "split", left: "#4A2A2A", right: "#14504F" }, f: [960, 540], layers: [T("HUNTER", 480, 300, 100, { color: WHT, in: "slideL" }), T("FILTER\nFEEDER", 1440, 300, 100, { color: WHT, in: "slideR" }), SH(480, 650, 700, { mono: HUNTER, mouth: 0.3 }), SH(1440, 650, 700, { mouth: 0.9 })] },
    { a: 1, bg: { kind: "split", left: "#4A2A2A", right: "#14504F" }, f: [960, 540], more: [[cap("HIGH BURSTS VS STEADY", { tone: "white" })]], layers: [I("steak", 480, 440, 200, { color: "#C9524B", in: "pop" }), T("ENERGY COST:\nHIGH BURSTS", 480, 700, 52, { at: 14 }), { t: "cloud", x: 1440, y: 440, n: 36, spread: [400, 260], size: 16, vx: 0.3 }, T("ENERGY COST:\nSTEADY CRUISING", 1440, 700, 52, { at: 20 })] },
    { a: 2, bg: dark(), f: [960, 540], layers: [{ t: "balance", x: 960, y: 560, tilt: [0, 12] }, T("HUNTER", 640, 800, 40, { color: RED }), T("FILTER FEEDER", 1290, 800, 40, { color: GRN })], hud: [cap("DIFFERENT TRADE-OFFS", { tone: "white" })] },
    { a: 3, bg: water("blueGreen"), f: [960, 540], layers: [SH(760, 560, 1000, { mouth: 0.9 }), { t: "cloud", x: 1520, y: 560, n: 60, spread: [700, 450], size: 20, vx: -1 }], hud: [cap("COLLECTS TINY PREY IN BULK")] },
    { a: 4, bg: water("blueGreen"), f: [960, 540], layers: [SH(960, 540, 1250, { mouth: 0.9 })], hud: [cap("WORKS ON A MASSIVE SCALE")] },
    { a: 5, bg: water("deep"), f: [960, 540], layers: [SH(400, 420, 520, { mono: "#6FA0A8", at: 0 }), SH(960, 620, 520, { mono: "#8AA9B3", spots: false, at: 8 }), I("whale", 1500, 500, 560, { color: "#4A6F86", at: 16 }), T("BASKING SHARK", 400, 560, 30), T("WHALE SHARK", 960, 760, 30), T("BLUE WHALE", 1500, 680, 30)], hud: [cap("SAME TRICK")] },
    { a: 6, bg: water("deep"), f: [960, 540], more: [[cap("FILTERING PAYS OFF")]], layers: [I("whale", 780, 540, 1000, { color: "#4A6F86", go: { x: 1000 }, mv: [0, 150] }), { t: "cloud", x: 1480, y: 560, kind: "krill", n: 70, spread: [700, 500], size: 22, vx: -0.8, color: "#F2A98E" }, { t: "label", text: "BLUE WHALE", x: 780, y: 250, ptr: [0, 150], at: 10 }], hud: [cap("THE LARGEST ANIMAL ON EARTH", { tone: "white" })] },
  ] },

  // ---------------- S13 THE VANISHING ----------------
  { n: 13, beats: [
    { a: 0, bg: water("bright", { vig: 0.4 }), f: [960, 540], layers: [{ t: "calendar", x: 960, y: 520, months: ["MAR", "APR", "MAY", "JUN", "JUL", "AUG"], each: 16, colors: ["#58B86A", "#58B86A", "#58B86A", "#E8B93C", "#E8B93C", "#E8B93C"], w: 480 }, { t: "cloud", x: 960, y: 540, n: 60, spread: [1600, 800], size: 28 }], hud: [cap("SPRING TO SUMMER", { tone: "white" })] },
    { a: 1.3, bg: map([-5.5, 55.4], 5200, "chart"), f: [960, 540], layers: [{ t: "shark", geo: [-6.3, 56.5], w: 140, mono: "#2C3C42", at: 6 }, { t: "shark", geo: [-5.8, 55.3], w: 140, mono: "#2C3C42", at: 14 }, { t: "shark", geo: [-5.0, 54.7], w: 140, mono: "#2C3C42", at: 22 }, { t: "shark", geo: [-6.7, 55.0], w: 140, mono: "#2C3C42", at: 30 }, { t: "text", text: "ISLE OF MAN", geo: [-4.55, 54.2], dy: 50, size: 28, color: INK }, { t: "text", text: "WEST SCOTLAND", geo: [-5.9, 56.9], size: 28, color: INK }, credit()], hud: [cap("SPRING & SUMMER GATHERINGS")] },
    { a: 2, bg: surface({ sky: "day", sun: true, horizon: 560, vig: 0.35 }), f: [960, 560], more: [[cap("PLANKTON BLOOMS", { tone: "white" })]], layers: [{ t: "waves", y: 590, amp: 10, n: 2, gap: 40, op: 0.5 }, { t: "fin", x: 500, y: 590, w: 220 }, { t: "fin", x: 960, y: 600, w: 260 }, { t: "fin", x: 1400, y: 590, w: 210 }], hud: [cap("NEAR THE SURFACE")] },
    { a: 3, bg: surface({ sky: "day", sun: true, horizon: 560, vig: 0.35 }), f: [960, 540], more: [[cap("NAME ORIGIN", { tone: "white" })]], layers: [I("sun", 960, 380, 220, { color: YEL, bob: 5 }), SH(960, 700, 900, { op: 0.9 }), { t: "waves", y: 720, amp: 10, n: 2, gap: 40, op: 0.5 }], hud: [cap("BASKING = APPEARING TO BASK")] },
    { a: 4, bg: water("deep", { particles: 12 }), f: [960, 540], layers: [{ t: "calendar", x: 960, y: 520, months: ["SEP", "OCT", "NOV"], each: 20, colors: ["#C9822B", "#8A6A4A", "#4A7FA8"], w: 480 }], hud: [cap("AUTUMN ARRIVES", { tone: "white" })] },
    { a: 4.7, bg: map([-5.5, 55.4], 5200, "night"), f: [960, 540], layers: [{ t: "shark", geo: [-6.3, 56.5], w: 140, mono: "#BFD4DA", out: 10 }, { t: "shark", geo: [-5.8, 55.3], w: 140, mono: "#BFD4DA", out: 26 }, { t: "shark", geo: [-5.0, 54.7], w: 140, mono: "#BFD4DA", out: 42 }, { t: "shark", geo: [-6.7, 55.0], w: 140, mono: "#BFD4DA", out: 56 }, credit()], hud: [cap("THEY BEGIN TO DISAPPEAR")] },
    { a: 5, bg: water("deep", { particles: 6, vig: 0.7 }), f: [960, 540], layers: [{ t: "counter", x: 960, y: 480, from: 0, to: 0, size: 160, unit: "SURFACE SIGHTINGS" }, { t: "calendar", x: 330, y: 780, w: 300, months: ["NOV", "DEC", "JAN", "FEB"], each: 24, colors: ["#4A7FA8", "#4A7FA8", "#4A7FA8", "#4A7FA8"] }], hud: [cap("WHERE DID THEY GO?", { tone: "white" })] },
  ] },

  // ---------------- S14 HIBERNATION THEORY ----------------
  { n: 14, beats: [
    { a: 0, bg: parch({ c1: "#CDB98C", c2: "#8E7B52", vig: 0.6 }), grade: "sepia(0.7)", f: [960, 560], more: [[cap("1950s", { tone: "dark" })]], layers: [I("scientist", 700, 600, 520, { color: "#2B2118", in: "slideL" }), I("notebook", 1250, 520, 260, { color: "#3C2F20", at: 12, in: "pop" })], hud: [cap("AN UNUSUAL EXPLANATION", { tone: "dark" })] },
    { a: 1, bg: water("deep"), f: [960, 540], layers: [{ t: "gillArch", x: 960, y: 540, w: 640 }, { t: "row", name: "bone", n: 6, w: 40, dx: 30, dy: 0, color: "#EDE7D3", x: 700, y: 360, at: 20, gap: 8 }], hud: [cap("THEORY: THEY SHED THEIR GILL RAKERS", { size: 50 })] },
    { a: 1.55, bg: water("deep", { tone: "deep" }), f: [960, 640], more: [[cap("SINKING TO THE SEABED", { tone: "white" })]], layers: [SH(900, 400, 900, { go: { y: 760, r: 14 }, mv: [0, 80] }), { t: "zzz", x: 1400, y: 720, at: 60 }, { t: "waves", y: 960, amp: 4, n: 1, colors: ["#2B2418"] }] },
    { a: 2, bg: dark(), f: [960, 540], layers: [SH(960, 560, 800, { mono: "#33454D", op: 0.6 }), ST("HIBERNATION", 960, 520, { size: 120, color: YEL })], hud: [cap("IT SOUNDED PLAUSIBLE", { tone: "white" })] },
    { a: 3, bg: water("deep", { particles: 8 }), f: [960, 540], more: [[cap("NO PLANKTON = NO FEEDING?", { tone: "white" })]], layers: [{ t: "cloud", x: 600, y: 540, n: 40, spread: [700, 500], size: 24, vx: 0.3, out: 60 }, SH(1300, 560, 700, { mono: "#33454D", op: 0.7 })], hud: [cap("PLANKTON GONE?", { tone: "white" })] },
    { a: 4, bg: dark(), f: [960, 540], layers: [ST("HIBERNATION", 960, 480, { size: 110, color: YEL, rot: -4 }), I("cross", 960, 480, 700, { color: RED, at: 14, in: "pop" }), ST("WRONG", 960, 760, { size: 120, at: 26 })] },
    { a: 5, bg: water("blueGreen"), f: [960, 540], more: [[cap("SOMETHING MORE INTERESTING", { tone: "white" })]], layers: [SH(300, 560, 1000, { go: { x: 1000 }, mv: [0, 150] })], hud: [cap("NOT SLEEPING")] },
  ] },
];
