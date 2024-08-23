import { Config } from "@remotion/cli/config";
import { cpus } from "node:os";
import path from "path";

Config.setConcurrency(cpus().length);

Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        "~": path.join(process.cwd()),
      },
    },
  };
});
