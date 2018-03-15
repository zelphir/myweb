const path = require('path')
const merge = require('lodash.merge')
const base = require('shared/webpack/webpack.config.base')

const options = {
  nodeVersion: 'current',
  dirname: path.resolve(__dirname)
}

module.exports = ({ outputPath }) =>
  merge(base(options, outputPath), {
    output: {
      libraryTarget: 'var',
      path: path.resolve(__dirname, outputPath)
    },
    node: {
      __dirname: false,
      __filename: false
    }
  })
