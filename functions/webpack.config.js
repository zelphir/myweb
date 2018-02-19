const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin')

const outputPath = 'build'

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  ***REMOVED*** {
                    node: '6.11.5'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([outputPath], { exclude: ['node_modules', 'yarn.lock'] }),
    new CopyPkgJsonPlugin({ remove: ['devDependencies', 'scripts'] })
  ]
}
