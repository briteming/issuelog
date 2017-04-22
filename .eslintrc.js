// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  // 'settings': {
  //   'import/resolver': {
  //     'webpack': {
  //       'config': 'build/webpack.base.conf.js'
  //     }
  //   }
  // },
  // add your custom rules here
  'rules': {
    'semi': ['error', 'always'],
    'no-param-reassign': ['warn', { 'props': false }],
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-body-style': ['warn', 'as-needed'],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': true }],
    'comma-dangle': ['warn', 'never'],
    'no-underscore-dangle': ['warn', { 'allowAfterThis': true }],
    'space-before-function-paren': "warn",
    'handle-callback-err': "warn",
    // don't require .vue extension when importing
    // 'import/extensions': ['warn', 'always', {
    //   'js': 'never',
    //   'vue': 'always'
    // }],
    // allow optionalDependencies
    // 'import/no-extraneous-dependencies': ['error', {
    //   'optionalDependencies': ['test/unit/index.js']
    // }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
