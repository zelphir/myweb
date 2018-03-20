import fs from 'fs'
import path from 'path'
import klaw from 'klaw'
import matter from 'gray-matter'

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

const getRoutes = async () => {
  const posts = await getFiles('posts')
  const pages = await getFiles('pages')

  return [
    ...pages.map(page => ({
      path: `/${page.data.slug}/`,
      component: 'src/layouts/Page',
      getData: () => ({ page })
    })),
    {
      path: '/blog/',
      component: 'src/layouts/Blog',
      getData: () => ({ posts }),
      children: posts.map(post => ({
        path: `/${post.data.slug}/`,
        component: 'src/layouts/Post',
        getData: () => ({ post })
      }))
    },
    {
      is404: true,
      component: 'src/layouts/404'
    }
  ]
}

export default getRoutes
