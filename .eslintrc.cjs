module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".next", "node_modules"],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'unused-imports'],
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/ban-ts-comment': ['warn'],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'off',
          parameterProperties: 'explicit',
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 144,
        singleQuote: true,
        semi: false,
        endOfLine: 'lf',
        singleAttributePerLine: true,
        useTabs: false,
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'parent',
            position: 'before',
          },
        ],
        groups: [['builtin', 'external'], ['parent', 'sibling'], 'index', ['unknown', 'object', 'type']],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    'no-undef': ['error'],
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-no-useless-fragment': ['error'],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'consistent',
        singleline: 'consistent',
      },
    ],
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-indent-props': [
      'error',
      {
        indentMode: 2,
        ignoreTernaryOperator: true,
      },
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: {
          single: 2,
          multi: 1,
        },
      },
    ],
    'react/jsx-no-leaked-render': ['error'],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: false,
        shorthandLast: true,
        multiline: 'ignore',
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        locale: 'auto',
      },
    ],
    'react/jsx-tag-spacing': ['error'],
    'react/no-this-in-sfc': ['error'],
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
  overrides: [],
}
