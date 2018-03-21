import path from 'path'
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import { IgnorePlugin } from 'webpack'

import getEnvVariables from 'shared/webpack/env'

const dirname = path.resolve(__dirname, '../')

getEnvVariables()

const sassLoaderOptions = {
  sourceMap: true,
  data: '@import "variables"; @import "mixins";',
  includePaths: ['src/', path.resolve(dirname, 'src/assets/scss')]
}

const webpackConfig = (config, { defaultLoaders, stage }) => {
  config.node = { fs: 'empty' }
  config.module.rules = [
    {
      oneOf: [
        {
          test: /\.s(a|c)ss$/,
          use:
            stage === 'dev'
              ? [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                  {
                    loader: 'sass-loader',
                    options: sassLoaderOptions
                  }
                ]
              : ExtractCssChunks.extract({
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: false
                      }
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                        ...sassLoaderOptions,
                        sourceMap: false
                      }
                    }
                  ]
                })
        },
        defaultLoaders.cssLoader,
        {
          test: /\.(js|jsx)$/,
          // add also top-level node_modules to work with Yarn workspaces
          exclude: [/node_modules/, path.resolve(dirname, '../node_modules')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: stage !== 'production'
              }
            }
          ]
        },
        defaultLoaders.fileLoader
      ]
    }
  ]

  config.plugins.push(
    // Fix webpack warnings
    new IgnorePlugin(/iconv-loader|bufferutil|utf-8-validate/),
    new ExtractCssChunks()
  )

  return config
}

export default webpackConfig
