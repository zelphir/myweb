const path = require('path')
const merge = require('lodash.merge')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const base = require('shared/utils/webpack.config.base')

const outputPath = '.build'
const nodeVersion = 'current'

module.exports = merge(base(nodeVersion), {
  entry: './index',
  output: {
    path: path.resolve(__dirname, outputPath),
    libraryTarget: 'var'
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules')
    })
  ],
  plugins: [new CleanWebpackPlugin([outputPath])]
})
