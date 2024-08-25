import { Config } from "@remotion/cli/config";
import { cpus } from "node:os";
import config from "./public/config.json";
import { webpackOverride } from "./src/lib/webpack-override";

Config.setConcurrency(cpus().length);
Config.setEntryPoint("./src/remotion/index.ts");
Config.setOutputLocation(`./out/${config.id}.mp4`);
Config.overrideWebpackConfig(webpackOverride);
