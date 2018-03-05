import path from 'path'
import Dotenv from 'dotenv-webpack'
import axios from 'axios'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import { isDev } from './src/lib/utils'

const dotEnv = isDev ? '.env' : '.env.production'

export default {
  // siteRoot: 'https://robertomanzella.com',
  getSiteData: () => ({
    title: 'robertomanzella.com'
  }),
  getRoutes: async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = data.slice(0, 5)

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
          path: `/post/${post.id}`,
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
