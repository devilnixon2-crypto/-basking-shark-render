import { INK, YEL, RED, WHT, GRN, cap, T, I, SH, FR, CUT, BR, ST, water, surface, parch, dark, flat, map, globe, credit, CAMZ, dens } from "./plan-helpers.mjs";

// STUDY 1 (schematic, NOT one shark): tracks fan out from the NE Atlantic. STUDY 2 (separate): Cape Cod -> Caribbean.
const S1 = [
  dens([[-6, 55], [-10, 50], [-14, 45], [-17, 40]]), dens([[-6, 55], [-4, 50], [-8, 44], [-9, 38]]),
  dens([[-6, 55], [-12, 58], [-18, 62], [-22, 64]]), dens([[-6, 55], [-1, 50], [2, 46], [0, 42]]), dens([[-6, 55], [-9, 52], [-15, 50], [-24, 47]]),
].map((pts, i) => ({ pts, p: [i * 10, 150 + i * 10], color: "#F2C94C", w: 4, op: 0.75 }));
const S2 = [{ pts: dens([[-70, 41.7], [-69, 36], [-67, 30], [-66, 24], [-66, 18]]), p: [10, 110], color: "#E5584B", w: 7 }];

export const scenesC = [
  // ---------------- S15 THE TAGS ----------------
  { n: 15, beats: [
    { a: 0, bg: water("blueGreen"), f: [960, 540], layers: [{ t: "fin", x: 960, y: 640, w: 560 }, I("tag", 760, 360, 130, { color: "#E9B949", go: { x: 930, y: 520 }, mv: [8, 40] })], hud: [cap("ELECTRONIC TAG", { tone: "white" })] },
    { a: 0.5, bg: dark({ vig: 0.6 }), f: [960, 540], layers: [I("satellite", 1300, 260, 330, { color: "#C9D3D8", bob: 8 }), { t: "pulse", x: 1300, y: 340, r0: 520, color: "rgba(242,201,76,0.7)", at: 6 }, SH(700, 820, 420, { mono: "#6FA0A8" })], hud: [cap("SIGNALS TO SATELLITE", { tone: "white" })] },
    { a: 1, bg: globe([-30, 48], [-18, 50], { tracks: S1, heads: false, vig: 0.4 }), f: [960, 540], more: [[cap("MONTHS OF TRACKING", { tone: "white" })]], layers: [T("STUDY 1", 300, 160, 70, { color: YEL, bg: "rgba(4,16,31,0.7)" }), T("SCHEMATIC TRACKS", 300, 240, 28, { color: WHT })], hud: [cap("SEVERAL SHARKS TAGGED", { tone: "white" })] },
    { a: 2, bg: globe([-18, 50], [-14, 46], { tracks: S1, heads: false, vig: 0.4 }), f: [960, 540], more: [[cap("THOUSANDS OF KILOMETRES", { tone: "white" })], [cap("NOT HIBERNATING", { tone: "white" })]], layers: [{ t: "counter", x: 1400, y: 880, to: 3400, plus: false, prefix: "UP TO ", unit: "KM", size: 100, mv: [6, 90] }, T("STUDY 1", 300, 160, 70, { color: YEL, bg: "rgba(4,16,31,0.7)" })] },
    { a: 3, bg: water("deep"), f: [960, 540], more: [[cap("DARKNESS CLOSES IN", { tone: "white" })]], layers: [{ t: "depth", x: 560, y: 540, to: 750, mv: [4, 120] }, T("STUDY 1", 1400, 200, 70, { color: YEL, bg: "rgba(4,16,31,0.7)" }), SH(1250, 540, 560, { mono: "#33454D", go: { y: 800 }, mv: [0, 120] })], hud: [cap("DIVES DEEPER THAN 750 M")], vig: 0 },
    { a: 3.6, bg: water("deep", { vig: 0.85, vigIn: 25 }), f: [960, 540], layers: [{ t: "glow", x: 960, y: 540, n: 46, spread: [1300, 700] }, SH(960, 600, 520, { mono: "#1A2A31", op: 0.9 })], hud: [cap("FOOD HIDDEN AT DEPTH", { tone: "white" })] },
    { a: 4, bg: globe([-75, 30], [-68, 28], { tracks: S2, vig: 0.4 }), f: [960, 540], more: [[cap("MASSACHUSETTS TO THE CARIBBEAN", { tone: "white" })]], layers: [T("A SEPARATE STUDY", 330, 160, 56, { color: RED, bg: "rgba(4,16,31,0.75)" }), T("ROUTE SCHEMATIC", 330, 236, 28, { color: WHT })], hud: [cap("TAGGED OFF MASSACHUSETTS")] },
    { a: 5, bg: globe([-40, 40], [-20, 45], { tracks: [...S1, ...S2], heads: false, vig: 0.4 }), f: [960, 540], layers: [], hud: [cap("NOT DISAPPEARING. TRAVELLING.")] },
    { a: 6, bg: water("deep", { vig: 0.7 }), f: [960, 540], more: [[cap("FOLLOWING FOOD", { tone: "white" })]], layers: [SH(700, 520, 700, { mono: "#33454D", go: { x: 1200 }, mv: [0, 140] }), { t: "glow", x: 1300, y: 600, n: 40, spread: [900, 500] }], hud: [cap("INTO DEEP WATER", { tone: "white" })] },
  ] },

  // ---------------- S16 ALWAYS MOVING ----------------
  { n: 16, beats: [
    { a: 0, bg: surface({ sky: "day", horizon: 540, vig: 0.4 }), f: [960, 600], cam: CAMZ(1.9, 1, [1300, 600], [960, 540]), layers: [SH(960, 650, 900, { mouth: 0.8, in: "none", op: 0.9 }), { t: "waves", y: 600, amp: 10, n: 2, gap: 40, op: 0.55 }], hud: [cap("A BUFFET THAT MOVES", { tone: "white" })] },
    { a: 1, bg: { kind: "chart" }, f: [960, 540], layers: [{ t: "patches", pts: [[500, 700, 170], [980, 400, 190], [1450, 720, 150]], drift: [14, -6] }, SH(500, 700, 200, { mono: "#0B1D2E", mouth: 0, go: { x: 980, y: 400 }, mv: [0, 80] })], hud: [cap("PLANKTON MOVES. SO DOES THE SHARK.", { tone: "white", size: 48 })] },
    { a: 2, bg: { kind: "chart" }, f: [960, 540], more: [[cap("SEASONS. CURRENTS. CONDITIONS.", { tone: "white" })]], layers: [{ t: "patches", pts: [[400, 800, 150], [900, 500, 190], [1400, 300, 160]], drift: [20, -10] }, { t: "trail", pts: [[200, 900], [600, 700], [900, 520], [1300, 380], [1750, 220]], mv: [0, 120], color: YEL }]},
    { a: 3, bg: { kind: "chart" }, f: [960, 540], layers: [{ t: "patches", pts: [[700, 540, 220]], drift: [30, 0] }, SH(560, 560, 240, { mono: "#0B1D2E", go: { x: 1100 }, mv: [0, 80] })], hud: [cap("KEEP MOVING")] },
    { a: 4, bg: water("blueGreen"), f: [960, 540], more: [[cap("ALWAYS SEARCHING")]], layers: [SH(500, 560, 900, { mouth: 0.9, go: { x: 960 }, mv: [0, 130] }), { t: "cloud", x: 1500, y: 540, n: 40, spread: [700, 500], size: 20, vx: -0.6 }], hud: [cap("A CONSTANT SEARCH", { tone: "white" })] },
    { a: 5, bg: dark(), f: [960, 540], layers: [I("hourglass", 960, 520, 300, { color: WHT, in: "pop" })], hud: [cap("YOU NEVER GET TO STAY STILL")] },
  ] },

  // ---------------- S17 THE HUNT ----------------
  { n: 17, beats: [
    { a: 0, bg: surface({ sky: "haze", horizon: 600, vig: 0.7 }), grade: "grayscale(1) contrast(1.1)", f: [960, 640], more: [[cap("20TH CENTURY", { tone: "white" })]], layers: [I("boat", 700, 640, 460, { color: "#101517", go: { x: 1000 }, mv: [0, 200], bob: 6 }), { t: "waves", y: 650, amp: 10, n: 2, gap: 40, op: 0.8 }], hud: [cap("A FISHING BOAT", { tone: "white" })] },
    { a: 1, bg: water("deep"), f: [960, 540], more: [[cap("OIL-RICH LIVER", { tone: "white" })]], layers: [SH(960, 560, 1200, { mono: "#33454D", op: 0.5 }), I("liver", 960, 570, 640, { color: "#8A3B2E", in: "pop", at: 8 }), { t: "label", text: "LIVER", x: 960, y: 320, ptr: [0, 150], at: 20 }], hud: [cap("HUNTED FOR LIVER OIL")] },
    { a: 2, bg: parch({ vig: 0.5 }), f: [960, 540], more: [[cap("PRODUCTS FROM SHARK LIVER OIL", { tone: "dark" })]], layers: [I("lamp", 460, 480, 220, { color: "#4A3B2A", in: "pop" }), T("LAMPS", 460, 660, 54, { color: INK, at: 6 }), I("bottle", 960, 480, 170, { color: "#4A3B2A", in: "pop", at: 14 }), T("COSMETICS", 960, 660, 54, { color: INK, at: 20 }), I("can", 1460, 480, 200, { color: "#4A3B2A", in: "pop", at: 28 }), T("LUBRICANTS", 1460, 660, 54, { color: INK, at: 34 })] },
    { a: 3, bg: parch({ vig: 0.5 }), f: [960, 540], layers: [I("finIcon", 640, 480, 240, { color: "#4A3B2A", in: "pop" }), T("FINS", 640, 660, 60, { color: INK, at: 8 }), I("steak", 1280, 500, 280, { color: "#A9473F", in: "pop", at: 14 }), T("MEAT", 1280, 660, 60, { color: INK, at: 22 }), I("crate", 960, 790, 220, { color: INK, at: 28 })], hud: [cap("ALSO COMMERCIALLY VALUABLE", { tone: "dark" })] },
    { a: 4, bg: surface({ sky: "haze", horizon: 560, vig: 0.5 }), f: [1100, 640], more: [[cap("STILL FEEDING", { tone: "white" })], [cap("EASY TO APPROACH", { tone: "white" })]], layers: [SH(1300, 700, 800, { mouth: 0.9, op: 0.85 }), I("boat", 300, 620, 440, { color: "#101517", go: { x: 800 }, mv: [0, 200] }), { t: "waves", y: 640, amp: 10, n: 2, gap: 40, op: 0.7 }], hud: [cap("SLOW, NEAR THE SURFACE", { tone: "white" })] },
    { a: 5, bg: water("blueGreen"), f: [960, 540], more: [[cap("GENTLE FEEDING = EASY TARGET", { tone: "white" })]], layers: [SH(960, 560, 1100, { mouth: 0.9 })], hud: [cap("IT WOULD NOT FLEE", { size: 80 })] },
  ] },

  // ---------------- S18 SLOW TO RECOVER ----------------
  { n: 18, beats: [
    { a: 0, bg: water("deep"), f: [960, 540], more: [[cap("SLOW GROWTH", { tone: "white" })]], layers: [{ t: "tbar", x: 960, y: 480, w: 1000, frac: 1, ticks: 5, label: "GROWS SLOWLY", color: "#58B86A", mv: [0, 150] }], hud: [cap("LOW REPRODUCTION RATE")] },
    { a: 1, bg: water("deep"), f: [960, 540], layers: [{ t: "tbar", x: 960, y: 480, w: 1100, frac: 1, ticks: 3, label: "GESTATION (THOUGHT TO BE)", color: YEL, mv: [4, 120] }], hud: [cap("UP TO 3.5 YEARS")] },
    { a: 1.75, bg: water("deep"), f: [960, 540], layers: [{ t: "row", name: "pup", n: 2, w: 200, dx: 260, color: "#8AA9B3", x: 960, y: 520, at: 4, gap: 14 }], hud: [cap("VERY FEW YOUNG")] },
    { a: 2, bg: map([10, 63], 1500, "dark", { hi: ["Norway"] }), f: [960, 540], more: [[cap("EXAMINED IN NORWAY", { tone: "white" })]], layers: [T("1943", 960, 220, 140, { color: YEL, in: "pop", bg: "rgba(4,16,31,0.6)" }), credit()], hud: [cap("ONE PREGNANT FEMALE STUDIED")] },
    { a: 3, bg: map([10, 63], 1500, "dark", { hi: ["Norway"] }), f: [960, 540], more: [[cap("MUCH IS STILL UNKNOWN", { tone: "white" })]], layers: [credit()], hud: [cap("VERY LITTLE DATA ON REPRODUCTION")] },
    { a: 4, bg: dark(), f: [960, 540], layers: [{ t: "curve", x: 960, y: 480, kind: "drop", label: "SCHEMATIC", axis: "TIME", color: RED, mv: [6, 100] }], hud: [cap("HEAVY HUNTING, SLOW REPLACEMENT", { tone: "white", size: 48 })] },
    { a: 4.55, bg: dark(), f: [960, 540], layers: [{ t: "curve", x: 960, y: 480, kind: "slow", label: "SCHEMATIC", axis: "TIME", color: GRN, mv: [6, 100] }], hud: [cap("RECOVERY IS VERY SLOW", { tone: "white" })] },
    { a: 5, bg: dark({ vig: 0.7 }), f: [960, 540], more: [[cap("CLASSIFIED GLOBALLY", { tone: "white" })]], layers: [SH(960, 560, 900, { mono: "#33454D", op: 0.7 }), ST("ENDANGERED", 960, 520, { size: 130 })] },
  ] },

  // ---------------- S19 THE MONSTER SOLVED ----------------
  { n: 19, beats: [
    { a: 0, bg: surface({ sky: "dawn", horizon: 600, vig: 0.55 }), f: [960, 760], layers: [{ t: "waves", y: 640, amp: 8, n: 2, gap: 40, colors: ["#3C6E73", "#2A5558", "#1D4144"] }, I("rocks", 960, 930, 2000, { color: "#171C1F" }), I("carcass", 960, 760, 920, { color: "#3A3530" })], hud: [cap("STRONSAY, 1808", { tone: "white" })] },
    { a: 1, bg: surface({ sky: "dawn", horizon: 600, vig: 0.55 }), f: [960, 760], more: [[cap("AND THEN: AN EXPERT", { tone: "white" })]], layers: [{ t: "waves", y: 640, amp: 8, n: 2, gap: 40, colors: ["#3C6E73", "#2A5558", "#1D4144"] }, I("rocks", 960, 930, 2000, { color: "#171C1F" }), I("carcass", 960, 760, 920, { color: "#3A3530" }), I("question", 960, 400, 140, { color: YEL, at: 20, in: "pop" })], hud: [cap("A MYSTERY FOR YEARS", { tone: "white" })] },
    { a: 2, bg: parch({ vig: 0.5 }), f: [960, 560], more: [[cap("EXAMINED THE REMAINS", { tone: "dark" })]], layers: [I("surgeon", 640, 600, 440, { color: "#2B2118", in: "slideL" }), I("bone", 1100, 500, 300, { color: "#4A3B2A", at: 14, in: "pop" }), I("skull", 1280, 620, 200, { color: "#4A3B2A", at: 22, in: "pop" }), { t: "label", text: "LONDON", x: 640, y: 250, ptr: [0, 120], at: 10 }, T("SIR EVERARD HOME", 1100, 330, 56, { color: INK, at: 16 })], hud: [cap("A LONDON SURGEON", { tone: "dark" })] },
    { a: 3, bg: parch({ vig: 0.5 }), f: [960, 540], layers: [{ t: "row", name: "vertebra", n: 9, w: 70, dx: 78, color: "#4A3B2A", x: 560, y: 380, at: 4, gap: 4 }, { t: "row", name: "vertebra", n: 9, w: 70, dx: 78, color: "#2B2118", x: 1360, y: 380, at: 10, gap: 4 }, T("CARCASS", 560, 520, 56, { color: INK, at: 20 }), T("SHARK", 1360, 520, 56, { color: INK, at: 24 })], hud: [cap("BONES CONSISTENT WITH A BASKING SHARK", { tone: "dark", size: 44 })] },
    { a: 3.55, bg: parch({ vig: 0.5 }), f: [960, 540], layers: [{ t: "row", name: "vertebra", n: 9, w: 70, dx: 78, color: "#4A3B2A", x: 560, y: 380 }, { t: "row", name: "vertebra", n: 9, w: 70, dx: 78, color: "#2B2118", x: 1360, y: 380 }, I("check", 960, 380, 160, { color: "#2E8B4F", in: "pop" }), ST("MATCH", 960, 700, { color: "#2E8B4F", size: 140 })] },
    { a: 4, bg: water("green"), f: [960, 540], layers: [SH(960, 540, 1100, { mouth: 0.5 })], hud: [cap("A LIVING BASKING SHARK", { tone: "white" })] },
    { a: 4.55, bg: water("deep", { particles: 10 }), f: [960, 540], layers: [SH(960, 540, 1100, { mouth: 0.4, op: 0.85, go: { y: 620, r: 6 }, mv: [0, 120] })], grade: "saturate(0.6)", hud: [cap("THEN IT DIES AND DECAYS", { tone: "white" })] },
    { a: 5, bg: water("deep", { particles: 10 }), f: [960, 560], more: [[cap("SOFT TISSUE ROTS FIRST", { tone: "white" })]], grade: "saturate(0.4)", layers: [SH(960, 560, 1100, { mouth: 0.2, op: 0.75 }), I("bone", 1330, 720, 200, { color: "#EDE7D3", go: { y: 920, r: 40 }, mv: [10, 90] })], hud: [cap("THE JAW DROPS AWAY", { tone: "white" })] },
    { a: 6, bg: water("deep", { particles: 10 }), f: [960, 560], more: [[cap("GILLS AND LOWER BODY FADE", { tone: "white" })]], grade: "saturate(0.3)", layers: [SH(960, 560, 1100, { mono: "#33454D", op: 0.3, out: 40 }), { t: "row", name: "vertebra", n: 14, w: 60, dx: 56, color: "#EDE7D3", x: 900, y: 600, at: 10, gap: 3 }, I("skull", 1420, 560, 150, { color: "#EDE7D3", at: 30, in: "pop" })], hud: [cap("ONLY THE SKELETON REMAINS", { tone: "white" })] },
    { a: 6.55, bg: surface({ sky: "dawn", horizon: 600, vig: 0.55 }), f: [960, 760], more: [[cap("SKULL, SPINE, FINS", { tone: "white" })]], layers: [{ t: "waves", y: 640, amp: 8, n: 2, gap: 40, colors: ["#3C6E73", "#2A5558", "#1D4144"] }, I("rocks", 960, 930, 2000, { color: "#171C1F" }), I("carcass", 960, 760, 920, { color: "#D9D2BC", op: 0.9 })], hud: [cap("A LONG-NECKED MONSTER", { tone: "red" })] },
    { a: 7, bg: parch({ vig: 0.5 }), f: [960, 540], layers: [I("carcass", 520, 560, 640, { color: "#3A3530" }), SH(1420, 560, 640, { mono: "#3A3530" }), T("STRONSAY BEAST", 520, 420, 36, { color: INK }), T("BASKING SHARK", 1420, 420, 36, { color: INK }), ST("HOME’S CONCLUSION: A SHARK", 960, 800, { size: 56 })] },
  ] },

  // ---------------- S20 IT HAPPENED AGAIN ----------------
  { n: 20, beats: [
    { a: 0, bg: dark({ vig: 0.7 }), f: [960, 540], more: [[cap("DECAY CAN FOOL THE EYE", { tone: "white" })]], layers: [I("monster", 600, 560, 400, { color: "#0A0F12" }), SH(1300, 560, 700, { mono: "#33454D" }), { t: "qmarks", x: 960, y: 520, n: 5, r: 360 }], hud: [cap("NOT THE LAST TIME", { tone: "red" })] },
    { a: 1, bg: parch({ vig: 0.5 }), f: [960, 540], layers: [{ t: "calendar", x: 960, y: 520, months: ["1977"], w: 520, colors: [RED] }] },
    { a: 1.35, bg: surface({ sky: "haze", horizon: 560, vig: 0.4 }), f: [960, 600], more: [[cap("OFF NEW ZEALAND", { tone: "white" })]], layers: [I("trawler", 760, 560, 760, { color: "#1B2428", bob: 5 }), { t: "waves", y: 650, amp: 10, n: 2, gap: 40, op: 0.7 }, { t: "label", text: "ZUIYO MARU", x: 760, y: 330, ptr: [0, 120], at: 12 }], hud: [cap("JAPANESE TRAWLER, 1977", { tone: "white" })] },
    { a: 1.7, bg: surface({ sky: "haze", horizon: 560, vig: 0.4 }), f: [960, 700], layers: [I("carcass", 960, 700, 860, { color: "#3A3530", in: "slideU" }), { t: "waves", y: 820, amp: 6, n: 1, colors: ["#1B2428"] }], hud: [cap("BADLY DECOMPOSED", { tone: "white" })] },
    { a: 2, bg: surface({ sky: "haze", horizon: 560, vig: 0.4 }), f: [960, 640], more: [[cap("A SURVIVING DINOSAUR-ERA REPTILE?", { tone: "white", size: 44 })]], layers: [I("carcass", 960, 720, 860, { color: "#3A3530" }), I("plesio", 960, 560, 760, { color: YEL, at: 10, in: "fade" })], hud: [cap("PLESIOSAUR?")] },
    { a: 2.5, bg: parch({ vig: 0.5 }), f: [960, 540], layers: [{ t: "paper", kind: "news", w: 900, h: 640, x: 960, y: 520, r: -3 }, T("PLESIOSAUR?", 960, 330, 110, { color: INK, at: 8 }), I("plesio", 960, 640, 520, { color: "#5A4A33", at: 16 })] },
    { a: 3, bg: water("deep"), f: [960, 540], layers: [I("flask", 960, 480, 320, { color: WHT, in: "pop" }), T("MUSCLE TESTS", 960, 760, 90, { color: YEL, at: 10 })], hud: [cap("CHEMICAL ANALYSIS", { tone: "white" })] },
    { a: 3.55, bg: dark(), f: [960, 540], layers: [ST("EVIDENCE POINTS TO\nA BASKING SHARK", 960, 520, { size: 80, color: YEL })] },
    { a: 4, bg: { kind: "split", left: "#4A2A2A", right: "#14504F" }, f: [960, 540], more: [[cap("MOST EXPERTS: SHARK", { size: 76 })]], layers: [T("STRONSAY BEAST", 480, 300, 44), T("55 FT", 480, 480, 150, { color: YEL, in: "pop" }), T("REPORTED", 480, 620, 52, { color: RED }), T("LARGEST RELIABLY\nRECORDED BASKING SHARK", 1440, 300, 44), T("ABOUT 12 M", 1440, 480, 150, { color: YEL, in: "pop", at: 10 }), T("(ABOUT 40 FT)", 1440, 620, 52, { color: WHT })] },
    { a: 5, bg: water("deep"), f: [960, 540], more: [[cap("A FAMILIAR ANIMAL, TRANSFORMED", { tone: "white" })]], layers: [SH(960, 560, 1000, { mono: "#6FA0A8", out: 60 }), I("monster", 960, 560, 520, { color: "#0A0F12", at: 40, in: "fade", inLen: 40 })], hud: [cap("DECAY CAN FOOL THE EYE", { tone: "white" })] },
  ] },

  // ---------------- S21 ANSWER AND CLOSE ----------------
  { n: 21, beats: [
    { a: 0, bg: water("blueGreen"), f: [960, 540], layers: [SH(960, 720, 800, { op: 0.5, mono: "#2C3C42" }), { t: "card", x: 960, y: 400, w: 1300, h: 260, text: "WHY NOT HUNT FISH?", in: "slideD" }] },
    { a: 1, bg: water("blueGreen"), f: [960, 540], layers: [{ t: "card", x: 960, y: 400, w: 1300, h: 260, text: "WHY NOT HUNT FISH?" }, T("IT DOESN’T NEED TO.", 960, 700, 110, { color: YEL, in: "pop" })] },
    { a: 2, bg: water("green"), f: [960, 540], more: [[cap("FILTERING TINY CREATURES", { tone: "white" })], [cap("A DIFFERENT WAY TO SURVIVE", { tone: "white" })]], layers: [SH(500, 560, 1000, { mouth: 0.9, go: { x: 1100 }, mv: [0, 240], bob: 6 })], hud: [cap("AN EFFICIENT WAY TO BE ENORMOUS", { size: 54 })] },
    { a: 3, bg: water("teal"), f: [960, 540], layers: [{ t: "glow", x: 960, y: 540, n: 36, spread: [1400, 700], color: "#8EE07A" }, SH(700, 560, 800, { mouth: 0.9, op: 0.9 })], hud: [cap("NO CHASE", { tone: "white" })] },
    { a: 4, bg: water("deep"), f: [960, 540], cam: CAMZ(1, 1.3, [960, 540], [960, 700]), layers: [SH(960, 520, 900, { mouth: 0.8, go: { y: 640 }, mv: [0, 100] })], hud: [cap("FIND THE RIGHT PATCH. KEEP MOVING.", { tone: "white", size: 50 })] },
    { a: 5, bg: water("blueGreen"), f: [960, 600], layers: [FR(960, 560, 1100, { mouth: 0.9 })], hud: [cap("CALM EYES", { tone: "white" })] },
    { a: 6, bg: water("deep"), f: [960, 540], more: [[cap("SOME OF THE SMALLEST ANIMALS", { tone: "white" })]], layers: [SH(700, 520, 900, { mouth: 0.9 }), { t: "glow", x: 1500, y: 560, n: 50, spread: [500, 500], color: "#8EE07A" }], hud: [cap("BIG FISH. TINY FOOD.", { tone: "white" })] },
    { a: 7, bg: water("deep", { vig: 0.7 }), f: [960, 540], layers: [SH(960, 700, 900, { op: 0.6, mouth: 0.8 }), T("MOST LIKELY THE\nGENTLEST GIANT", 960, 360, 110, { color: YEL, in: "pop" })] },
    { a: 8, bg: dark({ vig: 0.7 }), f: [960, 540], more: [[cap("LIVES BY FILTERING THE OCEAN", { tone: "white" })]], layers: [I("monster", 960, 560, 560, { color: "#0A0F12", out: 80 }), SH(960, 560, 1000, { mouth: 0.8, at: 60, in: "fade", inLen: 60 })], hud: [cap("LOOKS LIKE A MONSTER", { tone: "red" })] },
    { a: 9, bg: water("deep", { vig: 0.75 }), f: [960, 540], fade: "out", more: [[T("THANKS FOR WATCHING", 960, 300, 100, { color: WHT, in: "fade" }), T("THE BASKING SHARK: A GENTLE GIANT", 960, 420, 42, { color: YEL, weight: 600 })]],
      layers: [{ t: "typing", x: 960, y: 560, text: "Which sea monster should we investigate next? Tell us below.", name: "@you", mv: [20, 100] }] },
  ] },
];
