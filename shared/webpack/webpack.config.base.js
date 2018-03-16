process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const webpack = require('webpack')
const rules = require('./rules')
const externals = require('./externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const getEnvVariables = require('./env')
const env = getEnvVariables()

module.exports = ({ nodeVersion, dirname, plugins }, outputPath) => {
  const basePlugins = [
    new webpack.DefinePlugin(env),
    new CleanWebpackPlugin([outputPath], { root: dirname })
  ]

  if (plugins && plugins.length) {
    basePlugins.push(...plugins)
  }

  return {
    output: {
      filename: 'index.js',
      libraryTarget: 'commonjs'
    },
    target: 'node',
    module: {
      rules: rules(nodeVersion)
    },
    externals: externals(dirname),
    plugins: basePlugins
  }
}
