module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/prettier', '@vue/typescript'],
  ignorePatterns: ['**/*.js'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/script-setup-uses-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
