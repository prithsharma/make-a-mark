module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    browser: true,
    jest: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ios.js', '.android.js'],
      },
    },
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    // overrides

    'no-underscore-dangle': ['error', {
      allowAfterThis: true,
    }],

    // disable this rule for require used in images etc.
    'global-require': 0,

    // `.jsx` extension cannot be used with React Native
    // https://github.com/airbnb/javascript/issues/982
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    // TODO - change this to default
    // 'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'padded-blocks': ['error', {
      classes: 'never',
      blocks: 'never',
      switches: 'never',
    }],

    // rules from eslint-plugin-react-native
    'react-native/no-unused-styles': ['error'],
    'react-native/no-color-literals': ['error'],

    'no-restricted-globals': ['error', 'navigator'],
    'import/no-extraneous-dependencies': true
  },
};

