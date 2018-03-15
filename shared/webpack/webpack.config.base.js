const rules = require('./rules')
const externals = require('./externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = ({ nodeVersion, dirname, plugins }, outputPath) => {
  const basePlugins = [new CleanWebpackPlugin([outputPath])]

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
