module.exports = {
  extends: ['@bryce-loskie'],
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
