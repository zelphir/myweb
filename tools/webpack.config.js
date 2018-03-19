const path = require('path')
const merge = require('lodash.merge')
const base = require('shared/webpack/webpack.config.base')
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin')

const options = {
  nodeVersion: 'current',
  dirname: path.resolve(__dirname)
}

const cron = {
  entry: {
    import: './gce-cron/import.js',
    cleanup: './gce-cron/cleanup.js'
  },
  output: {
    filename: '[name].js'
  },
  outputPath: './gce-cron/.build'
}

const load = {
  entry: './load-instagram/index.js',
  outputPath: './load-instagram/.build'
}

module.exports = ({ tool }) => {
  const isCron = tool === 'cron'
  const outputPath = isCron ? cron.outputPath : load.outputPath
  const defaultOutput = {
    libraryTarget: 'var',
    path: path.resolve(__dirname, outputPath)
  }

  if (isCron) {
    options.plugins = [
      new CopyPkgJsonPlugin({
        remove: ['scripts', 'devDependencies']
      })
    ]
  }

  const output = isCron
    ? Object.assign(defaultOutput, cron.output)
    : defaultOutput
  const entry = isCron ? cron.entry : load.entry

  return merge(base(options, outputPath), {
    entry,
    output,
    node: {
      __dirname: false,
      __filename: false
    }
  })
}
