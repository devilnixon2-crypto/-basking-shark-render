import { Config } from "@remotion/cli/config";
Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
Config.setOverwriteOutput(true);
Config.setConcurrency(null as unknown as number); // use Remotion's default (half the CPU cores)
