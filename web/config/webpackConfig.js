import path from 'path'
import Dotenv from 'dotenv-webpack'
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import { IgnorePlugin } from 'webpack'

import { isDev } from '../src/lib/utils'

const dirname = path.resolve(__dirname, '../')
const dotEnv = isDev ? '.env' : '.env.production'

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
                    options: {
                      sourceMap: true,
                      data: '@import "variables"; @import "mixins";',
                      includePaths: [
                        'src/',
                        path.resolve(dirname, 'src/assets/scss')
                      ]
                    }
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
                        data: '@import "variables"; @import "mixins";',
                        includePaths: [
                          'src/',
                          path.resolve(dirname, 'src/assets/scss')
                        ]
                      }
                    }
                  ]
                })
        },
        defaultLoaders.cssLoader,
        defaultLoaders.jsLoader,
        defaultLoaders.fileLoader
      ]
    }
  ]

  config.plugins.push(
    new Dotenv({
      path: path.join(dirname, '../', dotEnv),
      safe: path.join(dirname, '../.env.example')
    }),
    // Fix webpack warnings
    new IgnorePlugin(/iconv-loader|bufferutil|utf-8-validate/),
    new ExtractCssChunks()
  )

  return config
}

export default webpackConfig
