const path = require('path')
const Dotenv = require('dotenv-webpack')
const { default: nexteinConfig } = require('nextein/config')
const withSass = require('@zeit/next-sass')

const isProd = process.env.NODE_ENV === 'production'
const dotEnv = isProd ? '.env.production' : '.env'

module.exports = nexteinConfig(
  withSass({
    webpack(config) {
      config.module.rules = [
        ...config.module.rules,
        {
          test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              publicPath: './',
              outputPath: 'static/',
              name: '[name].[ext]'
            }
          }
        }
      ]

      config.plugins = [
        ...config.plugins,
        new Dotenv({
          path: path.join(__dirname, '../', dotEnv),
          safe: path.join(__dirname, '../.env.example')
        })
      ]

      return config
    }
  })
)
