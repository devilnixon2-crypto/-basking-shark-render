// test-only stand-in for 'remotion' (pure helpers are the real ones)
export { interpolate, Easing, random } from "../node_modules/remotion/dist/esm/index.mjs";
export const staticFile = (s: string) => "/" + s;
