import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/*.config.*", "**/dist/"] },

  {
    extends: [
      eslint.configs.recommended,
      perfectionist.configs["recommended-natural"],
      ...tseslint.configs.recommended,
      prettier,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./apps/*/tsconfig*.json", "./packages/*/tsconfig*.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "perfectionist/sort-objects": ["error", { partitionByNewLine: true }],
      "perfectionist/sort-interfaces": ["error", { partitionByNewLine: true }],
    },
  },

  {
    files: ["**/*.tsx"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
