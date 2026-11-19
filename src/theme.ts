export const FPS = 30;
export const W = 1920;
export const H = 1080;
export const FONT = "Raleway, 'Helvetica Neue', Arial, sans-serif";

export const C = {
  haze: "#E8E4DA",
  shallow: "#2F6B4F", deepGreen: "#0F2A22",
  blue: "#0A2540", nearBlack: "#04101F",
  yellow: "#F2C94C", red: "#E5584B", white: "#F5F5F0",
  parchment: "#E9DDBF", ink: "#2B2118",
  shark: "#5A6B73", sharkLight: "#98A8AB", sharkDark: "#34444C",
  plankton: "#8EE07A", sea: "#1F7A8C",
} as const;

/** Set to false to hide ALL keyword captions (yellow/red/white overlay text).
 *  Narration subtitles are never burned in: use caption.srt for YouTube. */
export const KEYWORD_CAPTIONS = true;
/** Optional background music (put public/music.mp3 in place, then set true). Mixed at 9%. */
export const MUSIC = false;
