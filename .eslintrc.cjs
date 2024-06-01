require("@ariesclark/eslint-config/eslint-patch");
process.env["ESLINT_PROJECT_ROOT"] = __dirname;

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@ariesclark/eslint-config',
    '@ariesclark/eslint-config/next',
    '@ariesclark/eslint-config/tailwindcss',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': "off",
    '@next/next/no-img-element': "off"
  },
}
