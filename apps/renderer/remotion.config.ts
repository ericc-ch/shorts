import { Config } from "@remotion/cli/config";

import { webpackOverride } from "./src/lib/webpack-override";

Config.setEntryPoint("./src/remotion/index.ts");
Config.overrideWebpackConfig(webpackOverride);
