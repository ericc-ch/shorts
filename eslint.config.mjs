// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["eslint.config.*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        project: ["./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
