import { Config } from "@remotion/cli/config"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"

Config.setEntryPoint("./src/remotion/index.ts")
Config.overrideWebpackConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    plugins: [...(config.resolve?.plugins ?? []), new TsconfigPathsPlugin()],
  },
}))
