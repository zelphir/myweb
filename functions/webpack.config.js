process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin')
const { DefinePlugin } = require('webpack')
const rules = require('shared/webpack/rules')
const externals = require('shared/webpack/externals')
const env = require('shared/webpack/env')
const outputPath = '.build'

module.exports = ({ fnName }) => ({
  mode: 'production',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, outputPath, fnName)
  },
  module: { rules: rules('6.11.5') },
  externals: externals(__dirname),
  target: 'node',
  plugins: [
    new DefinePlugin(Object.assign({}, env(), { 'process.env.LOCAL': process.env.LOCAL })),
    new CleanWebpackPlugin([outputPath]),
    new CopyPkgJsonPlugin({ remove: ['scripts', 'devDependencies'] }),
    fnName === 'web' &&
      new CopyWebpackPlugin([
        { from: '../web/.next', to: path.resolve(__dirname, outputPath, fnName, '.next') }
      ])
  ].filter(Boolean)
})
