import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import shotsJson from "../data/shots.json";
import type { Beat, Shots } from "../data/types";
import { BeatView } from "./BeatView";
import { MUSIC } from "../theme";

const shots = shotsJson as unknown as Shots;
const OVERLAP = 8; // frames a beat stays under the next one so dissolves have something to dissolve from

const BeatSeq: React.FC<{ beat: Beat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  return <BeatView beat={beat} frame={frame} />;
};

export const BaskingShark: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Audio src={staticFile("narration.mp3")} />
    {MUSIC && <Audio src={staticFile("music.mp3")} volume={0.09} loop />}
    {shots.beats.map((b, i) => {
      const next = shots.beats[i + 1];
      const extra = next && next.props.dissolve ? OVERLAP : 0;
      return (
        <Sequence key={b.id} from={b.startFrame} durationInFrames={b.durationFrames + extra} layout="none" name={b.id}>
          <BeatSeq beat={b} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
