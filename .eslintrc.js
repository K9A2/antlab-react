module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'standard',
    'plugin:react/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2015,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
  },
  settings: {
    'react': {
      'version': 'detect'
    }
  }
};
