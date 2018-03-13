import fs from 'fs'
import path from 'path'
import Dotenv from 'dotenv-webpack'
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import klaw from 'klaw'
import matter from 'gray-matter'
import React from 'react'
import { TypographyStyle, GoogleFont } from 'react-typography'
import { IgnorePlugin } from 'webpack'

import typography, { isDev } from './src/lib/utils'

const dotEnv = isDev ? '.env' : '.env.production'

const getFiles = folder => {
  const items = []

  return new Promise(resolve => {
    if (!fs.existsSync(`./src/${folder}`)) resolve(items)

    klaw(`./src/${folder}`)
      .on('data', item => {
        if (path.extname(item.path) === '.md') {
          const data = fs.readFileSync(item.path, 'utf8')
          const dataObj = matter(data)

          dataObj.data.slug =
            dataObj.data.slug ||
            dataObj.data.title
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')

          delete dataObj.orig
          items.push(dataObj)
        }
      })
      .on('error', console.error) // eslint-disable-line
      .on('end', () => resolve(items))
  })
}

export default {
  // siteRoot: 'https://robertomanzella.com',
  // preact: true, // not working after react-static@5.4.0
  bundleAnalyzer: process.env.ANALYZE || false,
  extractCssChunks: true,
  // inlineCss: true,
  getSiteData: () => ({
    title: 'robertomanzella.com'
  }),
  getRoutes: async () => {
    const posts = await getFiles('posts')
    const pages = await getFiles('pages')

    return [
      ...pages.map(page => ({
        path: `/${page.data.slug}/`,
        component: 'src/containers/Page',
        getData: () => ({ page })
      })),
      {
        path: '/blog/',
        component: 'src/containers/Blog',
        getData: () => ({ posts }),
        children: posts.map(post => ({
          path: `/${post.data.slug}/`,
          component: 'src/containers/Post',
          getData: () => ({ post })
        }))
      },
      {
        is404: true,
        component: 'src/containers/404'
      }
    ]
  },
  webpack: (config, { defaultLoaders, stage }) => {
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
                          path.resolve(__dirname, './src/assets/scss')
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
                            path.resolve(__dirname, './src/assets/scss')
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
        path: path.join(__dirname, '../', dotEnv),
        safe: path.join(__dirname, '../.env.example')
      }),
      // Fix webpack warnings
      new IgnorePlugin(/iconv-loader|bufferutil|utf-8-validate/),
      new ExtractCssChunks()
    )

    return config
  },
  // eslint-disable-next-line
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="en-GB">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
      </Head>
      <Body>{children}</Body>
    </Html>
  )
}
