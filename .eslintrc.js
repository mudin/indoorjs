module.exports = {
  root: true,
  "extends": ["airbnb", "prettier"],
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    document: true
  },
  plugins: [
    'prettier'
  ],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: false
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'arrow-parens': 'off',
    'function-paren-newline': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'vue/no-unused-components': {
      ignoreWhenBindingPresent: false
    },
    'no-console': 'off',
    'max-len': ['error', {
      code: 100,
      ignoreUrls: true,
      ignoreStrings: true
    }],
    'no-param-reassign': [2, {
      props: false
    }]
  }
};
