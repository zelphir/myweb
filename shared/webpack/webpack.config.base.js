const rules = require('./rules')
const externals = require('./externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = ({ nodeVersion, dirname, plugins }, outputPath) => {
  const basePlugins = [new CleanWebpackPlugin([outputPath], { root: dirname })]

  if (plugins && plugins.length) {
    basePlugins.push(...plugins)
  }

  return {
    output: {
      filename: 'index.js',
      libraryTarget: 'commonjs'
    },
    mode: 'development',
    target: 'node',
    module: {
      rules: rules(nodeVersion)
    },
    externals: externals(dirname),
    plugins: basePlugins
  }
}
