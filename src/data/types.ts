export type Anim = "none" | "fade" | "pop" | "slideL" | "slideR" | "slideU" | "slideD" | "drop";

export interface LayerSpec {
  t: string;                       // layer type, see components/registry.tsx
  x?: number; y?: number;          // centre position in a 1920x1080 world
  s?: number; r?: number;          // scale, rotation (deg)
  flip?: boolean; op?: number;     // mirror, opacity
  in?: Anim; at?: number;          // entrance animation and its delay (frames, relative to the ORIGINAL beat)
  out?: number;                    // frame at which the layer fades out
  go?: { x?: number; y?: number; s?: number; r?: number }; // motion target (layers drift from x,y,s,r to go.*)
  mv?: [number, number];           // frames over which the motion happens (default: whole beat)
  hud?: boolean;                   // true = fixed on screen, unaffected by the camera
  [k: string]: any;
}

export interface Cam { s0: number; s1: number; f0: [number, number]; f1: [number, number] }

export interface BeatProps {
  bg?: Record<string, any>;        // background options (see Backgrounds.tsx)
  cam?: Cam;
  focus?: [number, number];        // main subject point, used by the auto camera presets
  layers: LayerSpec[];
  hud?: LayerSpec[];
  offset?: number;                 // frames already elapsed in the ORIGINAL beat (extra beats)
  origDuration?: number;           // duration of the ORIGINAL beat
  shake?: number;                  // camera shake amplitude in px
  fade?: "in" | "out" | "inout";   // fade from/to black
  dissolve?: number;               // cross-dissolve length in frames at the start
  grade?: string;                  // css filter, e.g. sepia / grayscale
}

export interface Beat {
  id: string; scene: number; startFrame: number; durationFrames: number;
  component: string; props: BeatProps;
}
export interface Shots { fps: number; totalFrames: number; beats: Beat[] }
