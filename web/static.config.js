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
      // Check if posts directory exists //
      if (fs.existsSync('./src/posts')) {
        klaw('./src/posts')
          .on('data', item => {
            // Filter function to retrieve .md files //
            if (path.extname(item.path) === '.md') {
              // If markdown file, read contents //
              const data = fs.readFileSync(item.path, 'utf8')
              // Convert to frontmatter object and markdown content //
              const dataObj = matter(data)
              // Create slug for URL //
              dataObj.data.slug = dataObj.data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
              // Remove unused key //
              delete dataObj.orig
              // Push object into items array //
              items.push(dataObj)
            }
          })
          .on('error', e => {
            console.log(e) // eslint-disable-line
          })
          .on('end', () => {
            // Resolve promise for async getRoutes request //
            // posts = items for below routes //
            resolve(items)
          })
      } else {
        // If src/posts directory doesn't exist, return items as empty array //
        resolve(items)
      }
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
