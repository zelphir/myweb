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

module.exports = ({ fnName }) => {
  const pkgOpts = {
    web: {
      name: 'web',
      remove: ['scripts', 'dependencies', 'devDependencies'],
      replace: {
        dependencies: { next: 'latest', react: 'latest', 'react-dom': 'latest' }
      }
    },
    sendgrid: {
      name: 'sendgrid',
      remove: ['scripts', 'dependencies', 'devDependencies'],
      replace: {
        dependencies: { cors: 'latest', 'node-fetch': 'latest' }
      }
    },
    instagram: {
      remove: ['scripts', 'devDependencies'],
      replace: {
        name: 'instagram-import'
      }
    }
  }

  return {
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
      new CleanWebpackPlugin([`${outputPath}/${fnName}`]),
      new CopyPkgJsonPlugin(pkgOpts[fnName]),
      fnName === 'web' &&
        new CopyWebpackPlugin([
          { from: '../web/.next', to: path.resolve(__dirname, outputPath, fnName, '.next') }
        ])
    ].filter(Boolean)
  }
}
