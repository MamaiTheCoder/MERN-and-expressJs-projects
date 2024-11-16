import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: {
    globals: {
      ...globals.browser,  // Include browser-specific globals
      ...globals.jest,  // Include Jest-specific globals (e.g., describe, it, expect)
      ...globals.node,  // Include Node.js-specific globals (e.g., __dirname, process)
      Atomics: 'readonly',  // Ensure Atomics is readonly
      SharedArrayBuffer: 'readonly',  // Ensure SharedArrayBuffer is readonly
  }}},
  pluginJs.configs.recommended,  // Use ESLint's recommended JavaScript rules
  {
    rules: {
      'no-console': 'off',  // Turn off the no-console rule
    },
  },
];