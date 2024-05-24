import globals from "globals";
import pluginJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const compat = new FlatCompat();

export default [
  // Base configuration for JavaScript files
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    ignores: ["**/node_modules/", ".dist/"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
      "no-unused-expressions": "error",
      "prefer-const": "error",
    },
    globals: {
      process: "readonly",
    },
  },
  // Base configuration for TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.node, // Include Node.js globals
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unused-expressions": "error",
    },
  },
  // TypeScript recommended configurations
  ...compat.config({
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      // "eslint:recommended",
      // "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
  }),
  // JavaScript recommended configurations
  pluginJs.configs.recommended,
];



