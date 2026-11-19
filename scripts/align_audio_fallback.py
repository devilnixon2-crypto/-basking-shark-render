#!/usr/bin/env python3
"""Align narration paragraphs (= scenes) to an audio file WITHOUT any model download.

Method: ffmpeg silencedetect finds every pause. Each narration sentence is matched, in order,
to a pause (Viterbi) so that sentence durations follow speaking time ~ character count and
longer pauses are preferred. Paragraph ends become scene boundaries.

Usage: python3 scripts/align_audio.py <audio.wav|mp3> [narration.txt] [out.json]

If you have faster-whisper locally you can replace this with word timestamps; the output
shape (scene-timing.json) stays the same.
"""
import re, subprocess, json, sys

audio = sys.argv[1]
narr = sys.argv[2] if len(sys.argv) > 2 else "narration.txt"
out = sys.argv[3] if len(sys.argv) > 3 else "src/data/scene-timing.json"

dur = float(subprocess.check_output(
    ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio]).decode())
log = subprocess.run(["ffmpeg", "-i", audio, "-af", "silencedetect=n=-38dB:d=0.3", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
raw = list(zip(starts, ends))
lead = raw[0][1] if raw and raw[0][0] < 0.05 else 0.0
gaps = [g for g in raw if g[0] > lead + 0.3 and g[1] < dur - 0.05]

paras = [p.strip() for p in open(narr, encoding="utf8").read().split("\n") if p.strip()]
sents, pidx = [], []
for i, p in enumerate(paras):
    for s in re.split(r"(?<=[.?!])\s+", p):
        sents.append(s)
        pidx.append(i)
n, m = len(sents), len(gaps)
chars = [len(s) for s in sents]
rate = (dur - lead - 0.4 - 0.6 * n) / sum(chars)  # seconds per character
INF = 1e18


def seg_cost(t0, t1, c, glen):
    exp = rate * c
    return ((t1 - t0) - exp) ** 2 / (exp + 1.0) - 0.35 * min(glen, 1.5)  # prefer long pauses


cost = [[INF] * m for _ in range(n)]
back = [[-1] * m for _ in range(n)]
for j in range(m):
    cost[0][j] = seg_cost(lead, gaps[j][0], chars[0], gaps[j][1] - gaps[j][0])
for i in range(1, n - 1):
    for j in range(m):
        gl = gaps[j][1] - gaps[j][0]
        for k in range(j):
            if cost[i - 1][k] >= INF:
                continue
            c = cost[i - 1][k] + seg_cost(gaps[k][1], gaps[j][0], chars[i], gl)
            if c < cost[i][j]:
                cost[i][j] = c
                back[i][j] = k
fin, fk = INF, -1
for k in range(m):
    if cost[n - 2][k] >= INF:
        continue
    c = cost[n - 2][k] + ((dur - gaps[k][1]) - rate * chars[n - 1]) ** 2 / (rate * chars[n - 1] + 1)
    if c < fin:
        fin, fk = c, k
path = [fk]
for i in range(n - 2, 0, -1):
    path.append(back[i][path[-1]])
path.reverse()  # gap index that ends sentence i (i = 0..n-2)

sent_start = [lead] + [gaps[j][1] for j in path]
sent_end = [gaps[j][0] for j in path] + [dur]
scenes = []
for s in range(len(paras)):
    ids = [i for i in range(n) if pidx[i] == s]
    scenes.append({
        "scene": s + 1,
        "start": sent_start[ids[0]] if s > 0 else 0.0,
        "end": sent_end[ids[-1]] if s < len(paras) - 1 else dur,
        "firstWords": " ".join(paras[s].split()[:5]),
        "sentences": [{"start": round(sent_start[i], 3), "end": round(sent_end[i], 3), "text": sents[i][:40]} for i in ids],
    })
for a, b in zip(scenes, scenes[1:]):  # contiguous: cut in the middle of the pause
    mid = (a["end"] + b["start"]) / 2
    a["end"] = b["start"] = mid
for sc in scenes:
    sc["start"], sc["end"] = round(sc["start"], 3), round(sc["end"], 3)
    sc["duration"] = round(sc["end"] - sc["start"], 3)
json.dump({
    "audioSeconds": round(dur, 3),
    "method": "silence + sentence Viterbi (approximate, not word-level)",
    "pauses": [round((a + b) / 2, 3) for a, b in gaps],
    "scenes": scenes,
}, open(out, "w"), indent=1)
print(f"audio {dur:.1f}s, {n} sentences, {m} pauses")
for sc in scenes:
    print(f"S{sc['scene']:02d} {sc['start']:7.2f}-{sc['end']:7.2f} ({sc['duration']:5.1f}s) {sc['firstWords']}")
