module.exports = {
    extends: 'airbnb-base',
    env: {
      node: true,
      es6: true,
      mocha: true,
    },
    rules: {
      'import/no-extraneous-dependencies': false,
      'no-useless-escape': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            consistent: true,
            minProperties: 4,
            multiline: true,
          },
          ObjectPattern: 'never',
        },
      ],
      'no-tabs': 0,
      indent: ['error', 'tab'],
      'max-len': [
        'error',
        150,
      ],
    },
    overrides: [
      {
        files: '**/*.test.js',
        rules: {
          'func-names': 'off',
          'prefer-arrow-callback': 'off',
        },
      },
    ],
  };