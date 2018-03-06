import fs from 'fs'
import path from 'path'
import Dotenv from 'dotenv-webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import klaw from 'klaw'
import matter from 'gray-matter'

import { isDev } from './src/lib/utils'

const dotEnv = isDev ? '.env' : '.env.production'

const getPosts = () => {
  const items = []

  const getFiles = () =>
    new Promise(resolve => {
      if (!fs.existsSync('./src/posts')) resolve(items)

      klaw('./src/posts')
        .on('data', item => {
          if (path.extname(item.path) === '.md') {
            const data = fs.readFileSync(item.path, 'utf8')
            const dataObj = matter(data)

            dataObj.data.slug = dataObj.data.title
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

  return getFiles()
}

export default {
  // siteRoot: 'https://robertomanzella.com',
  getSiteData: () => ({
    title: 'robertomanzella.com'
  }),
  getRoutes: async () => {
    const posts = await getPosts()

    return [
      {
        path: '/',
        component: 'src/containers/Home'
      },
      {
        path: '/about',
        component: 'src/containers/About'
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({ posts }),
        children: posts.map(post => ({
          path: `/post/${post.data.slug}`,
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
                ? [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
                : ExtractTextPlugin.extract({
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
                        options: { includePaths: ['src/'] }
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
      })
    )

    return config
  }
}
