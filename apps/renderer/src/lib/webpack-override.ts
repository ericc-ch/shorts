import { Config } from "@remotion/cli/config";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export const webpackOverride: Parameters<
  typeof Config.overrideWebpackConfig
>[0] = (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    plugins: [...(config.resolve?.plugins ?? []), new TsconfigPathsPlugin()],
  },
});
