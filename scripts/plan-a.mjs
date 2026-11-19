import { INK, YEL, RED, WHT, GRN, cap, T, I, SH, FR, CUT, BR, ST, water, surface, parch, dark, flat, map, credit, CAMZ } from "./plan-helpers.mjs";

// Each beat: a = narration sentence index (0-based, fractions allowed) where the beat starts.
// more = extra HUD layers used by the extra beats created when a beat is longer than ~3.5 s.
export const scenesA = [
  // ---------------- S01 HOOK ----------------
  { n: 1, beats: [
    { a: 0, fade: "in", cut: true, bg: water("murky", { bubbles: true, vig: 0.7 }), layers: [] },
    { a: 0.5, bg: water("murky", { bubbles: true, vig: 0.7 }), f: [960, 560], cam: CAMZ(1, 1.3, [960, 540], [960, 560]),
      layers: [I("diver", 960, 560, 220, { color: "#E9B949", bob: 8, in: "fade" })], hud: [cap("OFF THE COAST OF SCOTLAND", { tone: "white" })] },
    { a: 1, bg: water("murky", { vig: 0.88, vigIn: 28 }), f: [960, 560],
      layers: [I("diver", 960, 560, 220, { color: "#E9B949", bob: 6, r: 0, go: { r: -8 }, flip: true })], hud: [cap("YOU CAN ONLY SEE A FEW METRES")] },
    { a: 3, bg: water("murky", { vig: 0.85, vigIn: 30 }), f: [960, 560],
      layers: [I("diver", 560, 640, 200, { color: "#E9B949" }), SH(2500, 520, 1100, { mono: "#06100F", blur: 14, op: 0.75, go: { x: 2100 } })] },
    { a: 3.5, bg: water("murky", { vig: 0.85, vigIn: 30 }), f: [900, 560], shake: 2,
      layers: [I("diver", 560, 640, 200, { color: "#E9B949" }), { t: "pulse", x: 560, y: 640, at: 6, color: "rgba(255,255,255,0.55)" }, SH(1500, 520, 1100, { mono: "#06100F", blur: 8, op: 0.9, go: { s: 1.25, x: 1350 } })] },
    { a: 4, bg: water("murky", { vig: 0.7 }), f: [960, 520],
      layers: [SH(960, 480, 1100, { mono: "#0A1A1A", blur: 3 }), BR(960, 700, 1000, "AS LONG AS A BUS", { at: 8 })] , hud: [] },
    { a: 5, bg: water("murky", { vig: 0.6 }), f: [960, 645], cam: CAMZ(1, 1.12, [960, 560], [960, 600]),
      layers: [FR(960, 560, 1300, { mouth: 1 }), I("human", 250, 760, 100, { color: "#E9B949" }), BR(960, 645, 728, "WIDER THAN YOUR SHOULDERS", { dotted: true, at: 12, size: 36 })] },
    { a: 6, bg: water("murky", { vig: 0.6 }), f: [960, 600], shake: 3,
      layers: [FR(960, 560, 1450, { mouth: 1.05, in: "pop" })], hud: [cap("YOU SHOULD BE TERRIFIED", { tone: "red", size: 84, shake: true, y: 930 })] },
    { a: 7, bg: water("teal", { vig: 0.45 }), f: [960, 520], more: [[cap("GIANT MOUTH. TINY MEAL.", { tone: "white" })]],
      layers: [I("rice", 1160, 520, 480, { r: -6, in: "pop" }), I("plankton", 640, 520, 78, { at: 8, in: "pop", color: "#8EE07A" })],
      hud: [cap("SMALLER THAN A GRAIN OF RICE")] },
  ] },

  // ---------------- S02 THE QUESTION ----------------
  { n: 2, beats: [
    { a: 0, bg: water("green"), f: [960, 540], layers: [SH(960, 560, 1100, { x: 100, go: { x: 960 }, mv: [0, 50], mouth: 0.6 }), { t: "label", text: "BASKING SHARK", x: 960, y: 250, ptr: [0, 190], at: 24 }, T("Cetorhinus maximus", 960, 310, 30, { at: 30, weight: 600, ls: "0.06em" })] },
    { a: 0.55, bg: water("deep"), f: [960, 540], layers: [{ t: "rank", x: 960, y: 480, at: 4, items: [{ rank: 1, name: "WHALE SHARK", len: 1 }, { rank: 2, name: "BASKING SHARK", len: 0.82, hi: true }] }], hud: [cap("2ND BIGGEST FISH")] },
    { a: 1, bg: water("green"), f: [1000, 560], layers: [SH(1000, 520, 980), I("human", 470, 650, 60, { color: "#E9B949", at: 6 }), BR(1000, 790, 915, "UP TO 10 M", { at: 10, ticks: true })] },
    { a: 3, bg: water("blueGreen"), f: [1250, 560], cam: CAMZ(1, 1.1, [960, 540], [1150, 560]),
      layers: [SH(900, 540, 1000, { mouth: 0.9 }), { t: "school", x: 1380, y: 700, n: 16, dir: -1, speed: 3, spread: [500, 260], seed: 1 }] },
    { a: 4, bg: water("blueGreen"), f: [1300, 600], cam: CAMZ(1.5, 1.8, [1300, 600], [1300, 600]),
      layers: [SH(900, 540, 1000, { mouth: 0.9 }), I("fish", 1380, 620, 150, { color: "#BFE3DB", bob: 8 }), { t: "ring", x: 1380, y: 620, rx: 110, at: 8 }], hud: [cap("EASY MEAL?")] },
    { a: 5, bg: water("green"), f: [960, 540], cam: CAMZ(1, 1.14, [960, 540]),
      layers: [SH(960, 560, 1300, { op: 0.55, mono: "#2C3C42" }), T("WHY?", 960, 520, 520, { color: YEL, ls: "0.02em" })] },
    { a: 6, bg: map([-3.5, 57], 4200, "night", { vig: 0.6 }), f: [960, 540], cam: CAMZ(1, 1.3, [960, 540], { geo: [-2.6, 59.12] }),
      layers: [{ t: "rain" }, { t: "lightning", flashes: [20, 70] }, { t: "icon", name: "pin", geo: [-2.6, 59.12], w: 54, color: RED, in: "drop", at: 14 }, { t: "text", text: "ORKNEY", geo: [-2.6, 59.12], dy: 70, size: 34, color: WHT, at: 20 }, credit()],
      hud: [cap("200+ YEARS AGO")] },
    { a: 6.55, bg: dark({ vig: 0.8 }), f: [960, 620], layers: [{ t: "fog", y: 760, op: 0.9 }, I("monster", 960, 650, 560, { color: "#0A0F12", go: { y: 560 }, mv: [0, 80] }), { t: "fog", y: 860, op: 0.8, z: 5 }], hud: [cap("A MONSTER", { tone: "red", size: 90 })] },
  ] },

  // ---------------- S03 THREE MYSTERIES ----------------
  { n: 3, beats: [
    { a: 0, bg: dark({ vig: 0.7 }), f: [960, 540], layers: [{ t: "paper", kind: "folder", w: 900, h: 600, x: 960, y: 560, in: "slideU" }, T("CASE FILE", 960, 470, 110, { color: INK, at: 10 }), T("THE BASKING SHARK", 960, 590, 56, { color: INK, at: 16 }), ST("3 MYSTERIES", 1160, 700, { at: 24, size: 78 })] },
    { a: 1, bg: dark(), f: [960, 450], layers: [{ t: "card", x: 960, y: 450, w: 1200, h: 280, num: 1, text: "WHY EAT SOMETHING\nTHIS TINY?", padL: 240, in: "slideR" }, I("plankton", 440, 450, 150, { at: 12, color: "#58B86A", in: "pop" })] },
    { a: 1.5, bg: water("green"), f: [960, 540], layers: [SH(960, 400, 820), I("plankton", 960, 740, 70, { at: 10, in: "pop", color: GRN }), { t: "label", text: "PLANKTON", x: 960, y: 830, ptr: [0, -60], at: 16 }], hud: [cap("BIGGEST BODY. SMALLEST FOOD.", { tone: "white" })] },
    { a: 2, bg: dark(), f: [960, 450], layers: [{ t: "card", x: 960, y: 450, w: 1200, h: 280, num: 2, text: "WHERE DOES IT GO\nIN WINTER?", in: "slideR" }] },
    { a: 2.55, bg: water("deep", { particles: 14 }), f: [960, 540], more: [[cap("WINTER", { tone: "white" })]],
      layers: [{ t: "calendar", x: 620, y: 520, months: ["OCT", "NOV", "DEC", "JAN"], each: 22, colors: ["#C9822B", "#8A6A4A", "#4A7FA8", "#4A7FA8"] }, SH(1250, 560, 700, { mono: "#CFE3EA", op: 0.4, out: 70 })] },
    { a: 3, bg: dark(), f: [960, 560], more: [[cap("UNSOLVED?", { tone: "white" })]], layers: [{ t: "card", x: 960, y: 330, w: 1300, h: 240, num: 3, text: "THE MONSTER THAT\nNEVER EXISTED", in: "slideR", size: 50 }, I("monster", 960, 760, 360, { color: "#0A0F12", blur: 6, at: 20, op: 0.9 }), ST("UNSOLVED", 1200, 800, { at: 30 })] },
    { a: 4, bg: dark({ vig: 0.75 }), f: [960, 520], layers: [{ t: "chips", x: 960, y: 380, labels: ["TINY FOOD", "WINTER", "THE MONSTER"], at: 4 }, I("monster", 960, 700, 360, { color: "#0A0F12", op: 0.9 }), { t: "pulse", x: 960, y: 700, r0: 200, color: "rgba(229,88,75,0.5)", at: 10 }], hud: [cap("STAY TO THE END")] },
  ] },

  // ---------------- S04 STRONSAY 1808 ----------------
  { n: 4, beats: [
    { a: 0, bg: parch({ vig: 0.5 }), f: [960, 540], layers: [{ t: "paper", kind: "parch", w: 1100, h: 520, x: 960, y: 540, in: "slideD" }, T("SEPTEMBER", 960, 480, 110, { color: INK, at: 10, weight: 700 }), T("1808", 960, 620, 150, { color: "#7A1F1A", at: 20 })] },
    { a: 0.28, bg: surface({ sky: "storm", clouds: true, vig: 0.65 }), f: [960, 540], shake: 7,
      layers: [{ t: "waves", y: 560, amp: 40, n: 4, gap: 55, colors: ["#2B3F45", "#1F3138", "#13222A"] }, { t: "rain" }, { t: "lightning", flashes: [12, 52], bx: 1300 }] },
    { a: 0.62, bg: map([-3.5, 57], 4200, "chart", { hi: [] }), f: [960, 540], cam: CAMZ(1, 4.2, [960, 540], { geo: [-2.6, 59.12] }),
      layers: [{ t: "icon", name: "pin", geo: [-2.6, 59.12], w: 40, color: RED, in: "drop", at: 40 }, { t: "text", text: "STRONSAY", geo: [-2.6, 59.12], dy: -60, size: 18, color: INK, at: 46 }, credit()], hud: [cap("ORKNEY ISLANDS", { tone: "white" })] },
    { a: 1, bg: surface({ sky: "dawn", horizon: 600, vig: 0.55 }), f: [960, 650],
      layers: [{ t: "waves", y: 640, amp: 8, n: 2, gap: 40, colors: ["#3C6E73", "#2A5558", "#1D4144"] }, I("rocks", 960, 930, 2000, { color: "#171C1F" }), I("boat", 1300, 700, 230, { color: "#101517", bob: 5 }), I("human", 840, 830, 70, { color: "#101517", at: 10 })], hud: [cap("DAWN. A FISHERMAN.", { tone: "white" })] },
    { a: 2, bg: surface({ sky: "dawn", horizon: 600, vig: 0.55 }), f: [960, 760],
      layers: [{ t: "waves", y: 640, amp: 8, n: 2, gap: 40, colors: ["#3C6E73", "#2A5558", "#1D4144"] }, I("rocks", 960, 930, 2000, { color: "#171C1F" }), I("carcass", 960, 760, 920, { color: "#3A3530", in: "slideU" }), I("human", 350, 830, 70, { color: "#101517" })] },
    { a: 3, bg: surface({ sky: "dawn", horizon: 600, vig: 0.55 }), f: [960, 760], more: [[cap("LIMBS?", { tone: "white" })]],
      layers: [{ t: "waves", y: 640, amp: 8, n: 2, gap: 40, colors: ["#3C6E73", "#2A5558", "#1D4144"] }, I("rocks", 960, 930, 2000, { color: "#171C1F" }), I("carcass", 960, 760, 920, { color: "#3A3530" }),
        { t: "label", text: "LONG NECK", x: 1330, y: 520, ptr: [-90, 110], at: 8 }, { t: "label", text: "TINY HEAD", x: 1560, y: 640, ptr: [-30, -50], at: 20 },
        { t: "markers", pts: [[600, 760], [680, 720], [760, 735], [840, 770], [560, 820], [900, 800]], at: 40 }] },
    { a: 4, bg: surface({ sky: "dawn", horizon: 600, vig: 0.55 }), f: [960, 760], more: [[cap("REPORTED, NOT VERIFIED", { tone: "white" })]],
      layers: [{ t: "waves", y: 640, amp: 8, n: 2, gap: 40, colors: ["#3C6E73", "#2A5558", "#1D4144"] }, I("rocks", 960, 930, 2000, { color: "#171C1F" }), I("carcass", 960, 760, 920, { color: "#3A3530" }), BR(960, 640, 920, "55 FT (REPORTED, ABOUT 17 M)", { at: 6, ticks: true })] },
    { a: 6, bg: parch({ vig: 0.5 }), f: [960, 540], more: [[cap("NOBODY COULD AGREE", { tone: "dark" })], [cap("HOLD THAT THOUGHT", { tone: "dark" })]], fade: "out",
      layers: [I("document", 960, 520, 520, { color: "#EADCB8", r: -3 }), T("NATURALISTS\nDISAGREE", 960, 450, 54, { color: INK, at: 10 }), ST("SEA SERPENT?", 1180, 680, { at: 20, size: 70 })] },
  ] },

  // ---------------- S05 SCALE ----------------
  { n: 5, beats: [
    { a: 0, bg: flat(["#BFE0EE", "#6FA9B8"]), f: [960, 420], layers: [I("bus", 960, 440, 1000, { color: "#E5584B", in: "slideL" })], hud: [cap("DOUBLE-DECKER BUS", { tone: "dark" })] },
    { a: 1, bg: flat(["#BFE0EE", "#6FA9B8"]), f: [960, 560], layers: [I("bus", 960, 330, 1000, { color: "#E5584B" }), SH(960, 640, 1050, { in: "slideR" }), BR(960, 830, 950, "9–10 M", { at: 12 })] },
    { a: 2, bg: water("green"), f: [960, 540], layers: [SH(700, 560, 900, { op: 0.9 }), { t: "row", name: "car", n: 4, w: 170, dx: 0, dy: -62, color: "#D9D9D2", x: 1560, y: 760, at: 8, gap: 12 }], hud: [cap("SEVERAL TONNES")] },
    { a: 2.6, bg: water("green"), f: [900, 420], cam: CAMZ(1.3, 1.5, [900, 460], [900, 420]), layers: [SH(960, 700, 1500), I("human", 520, 560, 90, { color: "#E9B949", at: 6 })], hud: [cap("FIN LIKE A SMALL SAIL")] },
    { a: 3, bg: water("green"), f: [1500, 600], cam: CAMZ(2.6, 1, [1500, 600], [960, 540]), layers: [SH(960, 560, 1500, { mouth: 0.8 })], hud: [cap("BUT HERE’S THE CATCH", { tone: "white" })] },
    { a: 4, bg: water("blueGreen"), f: [1400, 560], layers: [SH(860, 540, 1100, { mouth: 0.8 }), { t: "cloud", x: 1500, y: 560, kind: "copepod", n: 26, spread: [600, 420], size: 20, vx: 0.4 }], hud: [cap("ALMOST INVISIBLE FROM THE SURFACE")] },
    { a: 4.55, bg: dark(), f: [960, 520], layers: [T("BIGGEST BODY", 560, 470, 90, { color: YEL, in: "slideL" }), { t: "arrow", from: [960, 560], to: [960, 660], color: WHT, at: 20 }, T("SMALLEST FOOD", 1260, 700, 90, { color: GRN, in: "slideR", at: 24 })] },
  ] },

  // ---------------- S06 THE MOUTH ----------------
  { n: 6, beats: [
    { a: 0, bg: surface({ sky: "day", sun: true, clouds: true, horizon: 460, vig: 0.4 }), f: [960, 640], more: [[cap("NOT A GREAT WHITE", { tone: "white" })]],
      layers: [SH(300, 700, 900, { op: 0.85, go: { x: 1500 }, mouth: 0.7 }), { t: "waves", y: 600, amp: 12, n: 2, gap: 40, op: 0.45 }, T("THE REAL ANIMAL", 960, 250, 120, { color: INK, in: "pop", at: 6 })] },
    { a: 2, bg: water("bright"), f: [960, 540], layers: [{ t: "gauge", x: 800, y: 540, w: 560, value: 0.14, label: "ABOUT 3 KM/H" }, I("walker", 1280, 560, 130, { color: WHT, at: 10, bob: 6 })], hud: [cap("GENTLE WALK")] },
    { a: 3, bg: surface({ sky: "haze", horizon: 520, vig: 0.4 }), f: [960, 560], layers: [{ t: "fin", x: 400, y: 540, w: 300, go: { x: 1500 } }, { t: "waves", y: 560, amp: 10, n: 2, gap: 40, op: 0.5 }], hud: [cap("CRUISING NEAR THE SURFACE", { tone: "white" })] },
    { a: 4, bg: water("bright"), f: [960, 612], layers: [FR(960, 540, 1100, { mouth: 1 }), BR(960, 612, 616, "ABOUT 1 M", { dotted: true, at: 10 })] },
    { a: 4.5, bg: water("bright"), f: [960, 560], more: [[cap("WATER IN", { tone: "white" })]], layers: [FR(960, 540, 1100, { mouth: 1 }), { t: "stream", from: [260, 250], to: [900, 600], n: 30 }, { t: "stream", from: [1700, 250], to: [1020, 600], n: 30, arrows: false }] },
    { a: 5, bg: dark({ vig: 0.5 }), f: [960, 540], layers: [CUT(960, 540, 1500, { hi: "slits", flow: true }), { t: "label", text: "5 GILL SLITS", x: 1500, y: 250, ptr: [-60, 120], at: 12 }] },
    { a: 6, bg: dark({ vig: 0.5 }), f: [960, 540], cam: CAMZ(1, 1.12, [960, 540]), more: [[cap("HIDDEN INSIDE THE GILLS", { tone: "white" })]],
      layers: [{ t: "gillArch", x: 960, y: 520, w: 640, hi: true, in: "pop" }, { t: "label", text: "GILL RAKERS", x: 560, y: 220, ptr: [150, 190], at: 14 }], hud: [] },
  ] },

  // ---------------- S07 THE SIEVE ----------------
  { n: 7, beats: [
    { a: 0, bg: dark(), f: [960, 540], layers: [CUT(960, 540, 1500, { hi: "rakers" }), { t: "label", text: "GILL RAKERS", x: 1400, y: 220, ptr: [-120, 130], at: 10 }] },
    { a: 1, bg: water("deep"), f: [900, 540], layers: [{ t: "gillArch", x: 1300, y: 520, w: 560 }, { t: "net", x: 800, y: 540, w: 700, h: 500, in: "slideL" }], hud: [cap("A BIOLOGICAL SIEVE")] },
    { a: 2, bg: dark(), f: [960, 540], more: [[cap("WATER OUT", { tone: "white" })]], layers: [CUT(960, 560, 1400, { flow: true }), { t: "text", text: "IN\nMOUTH", x: 140, y: 560, size: 46, color: GRN }, { t: "text", text: "OUT\nGILLS", x: 1790, y: 560, size: 46, color: YEL }, { t: "arrow", from: [210, 440], to: [330, 440], at: 10, color: GRN }, { t: "arrow", from: [1620, 440], to: [1740, 440], at: 24 }] },
    { a: 3, bg: water("teal"), f: [960, 540], more: [[cap("PLANKTON, NOT FISH", { tone: "white" })]], layers: [I("copepod", 960, 520, 760, { color: "#8EE07A", in: "pop", bob: 6 }), { t: "label", text: "COPEPOD", x: 960, y: 800, ptr: [0, -120], at: 14 }] },
    { a: 4, bg: dark(), f: [960, 540], layers: [{ t: "gillArch", x: 800, y: 540, w: 700, trapped: 14, mv: [0, 60] }, { t: "arrow", from: [1130, 540], to: [1450, 760], color: YEL, at: 40 }, { t: "text", text: "SWALLOWED", x: 1560, y: 830, size: 54, color: YEL, at: 50 }], hud: [cap("WATER ESCAPES. FOOD STAYS.", { tone: "white" })] },
    { a: 6, bg: water("blueGreen"), f: [960, 540], layers: [SH(860, 540, 1150, { mouth: 0.9 }), { t: "stream", from: [1500, 420], to: [1180, 560], n: 34 }], hud: [cap("ENORMOUS VOLUMES OF WATER", { tone: "white" })] },
    { a: 7, bg: dark(), f: [960, 540], layers: [{ t: "counter", x: 960, y: 500, to: 1000000, plus: true, unit: "LITRES / HOUR", size: 130 }], hud: [cap("ESTIMATES VARY", { tone: "white" })] },
    { a: 8, bg: water("teal"), f: [960, 540], layers: [{ t: "pool", x: 960, y: 480, w: 900, h: 340, fill: [0, 0.5], label: "ROUGHLY HALF AN OLYMPIC POOL", mv: [6, 70] }] },
    { a: 9, bg: water("teal"), f: [960, 540], more: [[cap("NO CHASE", { tone: "white" })]], layers: [I("clock", 560, 520, 300, { color: WHT, in: "pop" }), { t: "pool", x: 1250, y: 520, w: 700, h: 300, fill: [0, 0.5], label: "REFILLS EVERY HOUR", mv: [0, 60] }], hud: [cap("JUST BY SWIMMING FORWARD")] },
  ] },
];
