#!/usr/bin/env python3
"""Word-level alignment of narration.txt to audio, fully offline.

1. PocketSphinx (pip install pocketsphinx; model ships inside the wheel) transcribes the audio
   with word timestamps.
2. The transcript is fuzzy-matched (difflib) to the words of narration.txt; unmatched words are
   interpolated between matched anchors.
3. Writes src/data/scene-timing.json (scene start/end, sentences) and src/data/words.json
   (every narration word with start/end seconds, used for caption.srt later).

Usage: python3 scripts/align_audio.py <audio.wav|mp3> [narration.txt]
If you have faster-whisper locally you may swap step 1; the output files keep the same shape.
(scripts/align_audio_fallback.py = silence-based estimate, used only if ASR is unavailable.)
"""
import sys, re, json, subprocess, difflib
audio = sys.argv[1]
narr = sys.argv[2] if len(sys.argv) > 2 else "narration.txt"
from pocketsphinx import Decoder

dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio]).decode())
raw = subprocess.check_output(["ffmpeg", "-loglevel", "error", "-i", audio, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"])
d = Decoder(samprate=16000)
d.start_utt(); d.process_raw(raw, no_search=False, full_utt=True); d.end_utt()
asr = []
for seg in d.seg():
    w = seg.word.split("(")[0]
    if w.startswith("<") or w.startswith("[") or not w: continue
    asr.append((w, seg.start_frame / 100.0, seg.end_frame / 100.0))

paras = [p.strip() for p in open(narr, encoding="utf8").read().split("\n") if p.strip()]
tok = lambda s: re.findall(r"[a-z0-9']+", s.lower().replace("-", " "))
nw, pidx, sidx, display = [], [], [], []
sent_no = 0
for i, p in enumerate(paras):
    for s in re.split(r"(?<=[.?!])\s+", p):
        for raw_w in s.split():
            for t in tok(raw_w):
                nw.append(t); pidx.append(i); sidx.append(sent_no); display.append(raw_w)
        sent_no += 1
aw = [a[0] for a in asr]
sm = difflib.SequenceMatcher(None, nw, aw, autojunk=False)
start = [None] * len(nw); end = [None] * len(nw)
matched = 0
for blk in sm.get_matching_blocks():
    for k in range(blk.size):
        start[blk.a + k] = asr[blk.b + k][1]; end[blk.a + k] = asr[blk.b + k][2]; matched += 1
# interpolate unmatched words between anchors
anch = [i for i, s in enumerate(start) if s is not None]
if not anch: raise SystemExit("no anchors, use align_audio_fallback.py")
for i in range(len(nw)):
    if start[i] is not None: continue
    lo = max([a for a in anch if a < i], default=None); hi = min([a for a in anch if a > i], default=None)
    t0 = end[lo] if lo is not None else 0.0
    t1 = start[hi] if hi is not None else dur
    l = lo if lo is not None else -1; h = hi if hi is not None else len(nw)
    frac = (i - l) / (h - l)
    start[i] = t0 + (t1 - t0) * frac; end[i] = min(t1, start[i] + 0.3)
# enforce monotonic
for i in range(1, len(nw)):
    if start[i] < start[i - 1]: start[i] = start[i - 1]
    if end[i] < start[i]: end[i] = start[i] + 0.05
print(f"audio {dur:.1f}s | narration words {len(nw)} | asr words {len(asr)} | matched {matched} ({100*matched/len(nw):.0f}%)")

scenes = []
for s in range(len(paras)):
    ids = [i for i in range(len(nw)) if pidx[i] == s]
    sents = sorted(set(sidx[i] for i in ids))
    ss = []
    for sn in sents:
        w = [i for i in ids if sidx[i] == sn]
        ss.append({"start": round(start[w[0]], 3), "end": round(end[w[-1]], 3)})
    scenes.append({"scene": s + 1, "firstWords": " ".join(paras[s].split()[:5]), "wordStart": ids[0], "wordEnd": ids[-1],
                   "speechStart": round(start[ids[0]], 3), "speechEnd": round(end[ids[-1]], 3), "sentences": ss})
# scene boundary = just before the first word of the next scene (0.12 s lead), midpoint if there is a long pause
for k, sc in enumerate(scenes):
    sc["start"] = 0.0 if k == 0 else round(max(sc["speechStart"] - 0.12, (scenes[k-1]["speechEnd"] + sc["speechStart"]) / 2), 3)
for k, sc in enumerate(scenes):
    sc["end"] = round(dur if k == len(scenes) - 1 else scenes[k + 1]["start"], 3)
    sc["duration"] = round(sc["end"] - sc["start"], 3)
json.dump({"audioSeconds": round(dur, 3), "method": f"pocketsphinx word alignment ({100*matched/len(nw):.0f}% words matched; others interpolated)",
           "scenes": scenes}, open("src/data/scene-timing.json", "w"), indent=1)
json.dump([[display[i], round(start[i], 3), round(end[i], 3), sidx[i]] for i in range(len(nw))], open("src/data/words.json", "w"))
for sc in scenes:
    print(f"S{sc['scene']:02d} {sc['start']:7.2f}-{sc['end']:7.2f} ({sc['duration']:5.1f}s) {sc['firstWords']}")
