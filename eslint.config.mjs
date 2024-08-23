// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["eslint.config.*"],
  },

  eslint.configs.recommended,
  ...tseslint.configs.strict,
);
