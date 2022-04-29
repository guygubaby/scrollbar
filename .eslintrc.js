module.exports = {
  env: {
    jest: true,
  },
  extends: ['@bryce-loskie', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['jest'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['playground/**/*.*'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
}
