module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    node: true
  },
  rules: {
    'no-console': [1, { allow: ['error', 'info', 'warn'] }],
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-unused-vars': ['warn', { args: 'after-used' }]
  },
};
