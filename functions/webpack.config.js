const path = require('path')
const merge = require('lodash.merge')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin')

const base = require('shared/utils/webpack.config.base')

const outputPath = '.build'
const nodeVersion = '6.11.5'

module.exports = merge(base(nodeVersion), {
  entry: './src',
  output: {
    path: path.resolve(__dirname, outputPath)
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules'),
      whitelist: [/^shared/, /^gql/]
    })
  ],
  plugins: [
    new CleanWebpackPlugin([outputPath], { exclude: ['node_modules', 'yarn.lock'] }),
    new CopyPkgJsonPlugin({ remove: ['devDependencies', 'scripts'] })
  ]
})
