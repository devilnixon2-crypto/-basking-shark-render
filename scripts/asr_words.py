#!/usr/bin/env python3
"""Offline rough word timestamps with PocketSphinx (model ships inside the pip package).
Usage: python3 scripts/asr_words.py audio.wav /tmp/words.json"""
import sys, json, subprocess
from pocketsphinx import Decoder
audio, out = sys.argv[1], sys.argv[2]
raw = subprocess.check_output(["ffmpeg","-loglevel","error","-i",audio,"-ac","1","-ar","16000","-f","s16le","-"])
d = Decoder(samprate=16000)
d.start_utt()
CH = 16000*2*30
words = []
d.process_raw(raw, no_search=False, full_utt=True)
d.end_utt()
for seg in d.seg():
    w = seg.word
    if w.startswith("<") or w.startswith("[") or w == "": continue
    words.append([w.split("(")[0], seg.start_frame/100.0, seg.end_frame/100.0])
json.dump(words, open(out,"w"))
print(len(words), "words")
