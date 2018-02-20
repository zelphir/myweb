const path = require('path')
const merge = require('lodash.merge')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const base = require('./utils/webpack.config.base')

const outputPath = 'build'
const nodeVersion = 'current'

module.exports = merge(base(nodeVersion), {
  entry: './import',
  output: {
    path: path.resolve(__dirname, outputPath)
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules')
    })
  ],
  plugins: [new CleanWebpackPlugin([outputPath])]
})
