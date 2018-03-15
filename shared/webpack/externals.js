const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = dirname => [
  nodeExternals(),
  nodeExternals({
    modulesDir: path.resolve(dirname, '../node_modules'),
    whitelist: [/^shared/, /^gql/]
  })
]
