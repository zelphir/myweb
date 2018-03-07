const path = require('path')
const merge = require('lodash.merge')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin')

const base = require('shared/utils/webpack.config.base')

const nodeVersion = 'current'

module.exports = ({ outputPath }) =>
  merge(base(nodeVersion), {
    output: {
      libraryTarget: 'var',
      path: path.resolve(__dirname, outputPath)
    },
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [
      nodeExternals(),
      nodeExternals({
        modulesDir: path.resolve(__dirname, '../node_modules'),
        whitelist: [/^shared/, /^gql/]
      })
    ],
    plugins: [
      new CleanWebpackPlugin([outputPath], { exclude: ['tmp.json'] }),
      new CopyPkgJsonPlugin({
        remove: ['scripts', 'devDependencies'],
        // Add graphql here so it does not conflict with gatsbyjs
        replace: { dependencies: { graphql: '^0.13.1' } }
      })
    ]
  })
