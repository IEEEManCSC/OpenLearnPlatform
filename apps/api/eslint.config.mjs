import globals from "globals";
import jsPlugin from "@eslint/js";
import tsPlugin from "typescript-eslint";
import unicornPlugin from "eslint-plugin-unicorn";
// import prettierConfig from "eslint-config-prettier";
// import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import sonarjs from "eslint-plugin-sonarjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/seed/**", "**/generated/**"],
  },
  jsPlugin.configs.recommended,
  unicornPlugin.configs["recommended"],
  // prettierPluginRecommended,
  // prettierConfig,
  sonarjs.configs.recommended,
  ...tsPlugin.configs.recommended,
  {
    rules: {
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",
      "unicorn/prefer-ternary": "off",
      "unicorn/switch-case-braces": ["error", "avoid"],
      "unicorn/no-null": "off",
      "sonarjs/assertions-in-tests": "off",
      "sonarjs/no-hardcoded-passwords": "off",
      "sonarjs/cors": "off",
      "@typescript-eslint/no-namespace": "off",
      "unicorn/no-useless-undefined": "off",
    },
    languageOptions: {
      globals: globals.node,
    },
  },
];
