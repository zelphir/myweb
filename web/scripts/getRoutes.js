const fs = require('fs')
const path = require('path')
const klaw = require('klaw-sync')
const matter = require('gray-matter')
const chalk = require('chalk')
const removeMd = require('remove-markdown')

const getPartials = partials =>
  partials.reduce(
    (obj, { file, ...partial }) => ({
      ...obj,
      [file.replace('.md', '')]: {
        ...partial,
        content: fs.readFileSync(path.resolve(__dirname, '../src/pages/partials', file), 'utf8')
      }
    }),
    {}
  )

const getId = (slug, title) =>
  slug ||
  title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

const getPage = async file => {
  if (path.extname(file.path) === '.md') {
    const markdownData = fs.readFileSync(file.path, 'utf8')
    const { content, excerpt, data: mdData } = matter(markdownData, {
      excerpt: file => {
        file.excerpt = file.content
          .split('\n')
          .slice(0, 3)
          .join(' ')
      }
    })
    const { slug, ...data } = mdData
    const id = getId(slug, data.title)
    const isPost = file.path.includes('src/posts')
    const path = isPost ? `/blog/${id}` : id.includes('/') ? id : `/${id}`

    return {
      id: id === '/' ? 'home' : id,
      ...data,
      content,
      excerpt,
      description: data.description || removeMd(excerpt),
      path,
      layout: data.layout || 'Post',
      date: data.date && data.date.toString(),
      partials: data.partials && getPartials(data.partials)
    }
  }
}

const getFiles = async folder => {
  if (!fs.existsSync(`./src/${folder}`)) return []

  const files = klaw(`./src/${folder}`, {
    nodir: true,
    filter: item => item.path.indexOf('partials') < 0
  })

  return Promise.all(files.map(async file => getPage(file)))
}

const arrayToObj = array =>
  array.reduce(
    (obj, { id, ...item }) => ({
      ...obj,
      [id]: item
    }),
    {}
  )

const getRoutes = async () => {
  console.time(chalk.green(`[\u2713] Routes created`)) // eslint-disable-line
  const posts = await getFiles('posts')
  const pages = await getFiles('pages')

  return {
    ...arrayToObj(pages),
    photos: {
      layout: 'Photos',
      path: '/photos',
      title: 'Photos'
    },
    blog: {
      layout: 'Blog',
      path: '/blog',
      title: 'Blog',
      posts: arrayToObj(posts)
    }
  }
}

getRoutes().then(routes => {
  const apiPath = 'public/api'
  if (!fs.existsSync(apiPath)) fs.mkdirSync(apiPath)
  fs.writeFileSync(`${apiPath}/routes.json`, JSON.stringify(routes, null, 2))
  console.timeEnd(chalk.green(`[\u2713] Routes created`)) // eslint-disable-line
})
