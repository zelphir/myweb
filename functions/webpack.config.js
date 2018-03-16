const path = require('path')
const merge = require('lodash.merge')
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin')
const base = require('shared/webpack/webpack.config.base')

const outputPath = '.build'

const options = {
  nodeVersion: '6.11.5',
  dirname: path.resolve(__dirname),
  plugins: [
    new CopyPkgJsonPlugin({
      remove: ['scripts', 'devDependencies']
    })
  ]
}

module.exports = ({ fnName }) =>
  merge(base(options, outputPath), {
    output: {
      path: path.resolve(__dirname, outputPath, fnName)
    }
  })
