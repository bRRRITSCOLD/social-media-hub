module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    // 'plugin:react/recommended',
    // 'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'import/prefer-default-export': [0],
    'arrow-body-style': [0],
    '@typescript-eslint/no-unsafe-assignment': [0],
    '@typescript-eslint/unbound-method': [0],
    "no-param-reassign": [0],
    "react/jsx-closing-bracket-location": [0],
    "max-len": [0],
    'react/require-default-props': [0],
    'curly': [0],
    'no-useless-return': [0],
    '@typescript-eslint/restrict-template-expressions': [0],
    'react-hooks/exhaustive-deps': [0],
    'react/jsx-props-no-spreading': [0],
    'no-useless-catch': [0]
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
