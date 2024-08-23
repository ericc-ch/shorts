import { Config } from "@remotion/cli/config";
import { cpus } from "node:os";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import config from "./public/config.json";

Config.setConcurrency(cpus().length);
Config.setEntryPoint("./src/remotion/index.ts");
Config.setOutputLocation(`./out/${config.id}.mp4`);

Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      plugins: [...(config.resolve?.plugins ?? []), new TsconfigPathsPlugin()],
    },
  };
});
