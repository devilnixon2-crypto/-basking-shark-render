import React from "react";
import { Composition } from "remotion";
import { loadFont } from "@remotion/google-fonts/Raleway";
import shotsJson from "./data/shots.json";
import { BaskingShark } from "./components/Video";
import { FPS, W, H } from "./theme";

loadFont("normal", { weights: ["600", "700", "800"], subsets: ["latin"] });

export const RemotionRoot: React.FC = () => (
  <Composition id="BaskingShark" component={BaskingShark} durationInFrames={(shotsJson as any).totalFrames} fps={FPS} width={W} height={H} />
);
