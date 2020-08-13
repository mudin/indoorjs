module.exports = {
  root: true,
  extends: ['airbnb-base'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    document: true,
    window: true,
    fabric: true,
    panzoom: true
  },
  plugins: ['prettier'],
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
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'function-paren-newline': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'vue/no-unused-components': {
      ignoreWhenBindingPresent: false
    },
    'no-console': 'off',
    'no-continue': 'off',
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true
      }
    ]
  }
};
