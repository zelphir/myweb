import fs from 'fs'
import path from 'path'
import klaw from 'klaw-sync'
import matter from 'gray-matter'
import markdownPdf from 'markdown-pdf'
import chalk from 'chalk'
import sass from 'node-sass'
import tmp from 'tmp'

const generatePdf = (md, pdf) => {
  const pdfPath = `public/${pdf}`
  const output = path.resolve(__dirname, '..', pdfPath)
  const contact = fs.readFileSync('./src/pages/partials/contact-details.md')
  const cover = fs.readFileSync('./src/pages/partials/cover.md')
  const tmpCss = tmp.fileSync({ postfix: '.css' })
  const mdDocs = [contact, cover, md]
  const { css } = sass.renderSync({ file: './src/assets/scss/_print.scss' })

  console.time(chalk.green(`=> [\u2713] Created ${pdfPath}`)) // eslint-disable-line
  fs.writeFileSync(tmpCss.name, css)

  return new Promise(resolve =>
    markdownPdf({ cssPath: tmpCss.name })
      .concat.from.strings(mdDocs)
      .to.path(output, () => {
        console.timeEnd(chalk.green(`=> [\u2713] Created ${pdfPath}`)) // eslint-disable-line
        resolve(pdfPath)
      })
  )
}

const generatePartials = partials =>
  partials.map(partial =>
    fs.readFileSync(
      path.resolve(__dirname, '../src/pages/partials', partial),
      'utf8'
    )
  )

const generatePage = async file => {
  if (path.extname(file.path) === '.md') {
    const markdownData = fs.readFileSync(file.path, 'utf8')
    const { content, data, excerpt } = matter(markdownData, { excerpt: true })

    if (data.pdf) await generatePdf(content, data.pdf)

    return {
      content,
      excerpt,
      data: {
        ...data,
        partials: data.partials && generatePartials(data.partials),
        slug:
          data.slug ||
          data.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
      }
    }
  }
}

const getFiles = async folder => {
  if (!fs.existsSync(`./src/${folder}`)) return []

  const files = klaw(`./src/${folder}`, {
    nodir: true,
    filter: item => item.path.indexOf('partials') < 0
  })
  return Promise.all(files.map(async file => generatePage(file)))
}

const getRoutes = async () => {
  const posts = await getFiles('posts')
  const pages = await getFiles('pages')

  return [
    ...pages.map(page => ({
      path: `/${page.data.slug}`,
      component: 'src/layouts/Page',
      getData: () => ({ page })
    })),
    {
      path: '/blog',
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
