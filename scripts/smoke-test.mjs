// Server-renders every beat (3 frames each) to catch runtime errors / NaN without a browser. npm run smoke
import esbuild from "esbuild";
import { execFileSync } from "node:child_process";
esbuild.buildSync({ entryPoints: ["scripts/smoke-test.entry.tsx"], bundle: true, platform: "node", outfile: "/tmp/smoke.cjs",
  alias: { remotion: "./scripts/remotion-shim.ts" }, loader: { ".json": "json" }, logLevel: "error", jsx: "automatic" });
execFileSync("node", ["/tmp/smoke.cjs"], { stdio: "inherit" });
