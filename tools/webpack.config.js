process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin')
const { DefinePlugin } = require('webpack')
const rules = require('shared/webpack/rules')
const externals = require('shared/webpack/externals')
const env = require('shared/webpack/env')

const cron = {
  entry: { import: './gce-cron/import.js', cleanup: './gce-cron/cleanup.js' },
  output: { filename: '[name].js' },
  outputPath: './gce-cron/.build'
}
const load = {
  entry: './load-instagram/index.js',
  outputPath: './load-instagram/.build'
}

module.exports = ({ tool }) => {
  const isCron = tool === 'cron'
  const outputPath = isCron ? cron.outputPath : load.outputPath
  const plugins = [
    new DefinePlugin(env()),
    new CleanWebpackPlugin([outputPath])
  ]
  const defaultOutput = {
    filename: 'index.js',
    libraryTarget: 'var',
    path: path.resolve(__dirname, outputPath)
  }

  if (isCron) {
    plugins.push(
      new CopyPkgJsonPlugin({ remove: ['scripts', 'devDependencies'] })
    )
  }

  const output = isCron
    ? Object.assign(defaultOutput, cron.output)
    : defaultOutput
  const entry = isCron ? cron.entry : load.entry

  return {
    mode: 'production',
    entry,
    output,
    node: { __dirname: false, __filename: false },
    module: { rules: rules('current') },
    externals: externals(__dirname),
    target: 'node',
    plugins: [
      new DefinePlugin(env()),
      new CleanWebpackPlugin([outputPath]),
      new CopyPkgJsonPlugin({ remove: ['scripts', 'devDependencies'] })
    ]
  }
}
