'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API: '" http://localhost:7300/mock/5bbc4c5cfd09821d08f86382/vue-admin-template"',
  // BASE_API: '"https://api-dev"'
})
