import { Config } from "@remotion/cli/config";
import { cpus } from "node:os";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

Config.setConcurrency(cpus().length);

Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      plugins: [...(config.resolve?.plugins ?? []), new TsconfigPathsPlugin()],
    },
  };
});
