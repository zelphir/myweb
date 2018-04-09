const fs = require('fs')
const path = require('path')
const klaw = require('klaw-sync')
const matter = require('gray-matter')
const chalk = require('chalk')
const sass = require('node-sass')
const Remarkable = require('remarkable')
const Html2Pdf = require('electron-html-to')

const remarkable = new Remarkable()
const conversion = Html2Pdf({ converterPath: Html2Pdf.converters.PDF })

const getPdf = (md, pdfFile) => {
  const pdfPath = `./public/${pdfFile}`
  const contact = fs.readFileSync('./src/pages/partials/contact-details.md')
  const cover = fs.readFileSync('./src/pages/partials/cover.md')
  const { css } = sass.renderSync({ file: './src/assets/scss/_pdf.scss' })
  const html = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${remarkable.render(contact + cover + md)}
      </body>
    </html>
  `
  console.time(chalk.green(`[\u2713] ${pdfPath} created`)) // eslint-disable-line

  return new Promise((resolve, reject) =>
    conversion({ html, pdf: { printBackground: true } }, (err, result) => {
      if (err) return reject(err)
      result.stream.pipe(fs.createWriteStream(pdfPath))
      conversion.kill()
      console.timeEnd(chalk.green(`[\u2713] ${pdfPath} created`)) // eslint-disable-line
      resolve(pdfPath)
    })
  )
}

const getPartials = partials =>
  partials.map(partial => ({
    ...partial,
    content: fs.readFileSync(
      path.resolve(__dirname, '../src/pages/partials', partial.file),
      'utf8'
    )
  }))

const getSlug = data =>
  data.slug ||
  `/${data.title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')}`

const getPage = async file => {
  if (path.extname(file.path) === '.md') {
    const markdownData = fs.readFileSync(file.path, 'utf8')
    const { content, data, excerpt } = matter(markdownData, { excerpt: true })

    if (data.pdf && !process.env.NO_PDF) await getPdf(content, data.pdf)

    return {
      path: getSlug(data),
      data: {
        content,
        excerpt,
        date: data.date && data.date.toString(),
        ...data,
        partials: data.partials && getPartials(data.partials)
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

  return Promise.all(files.map(async file => getPage(file)))
}

const getRoutes = async () => {
  console.time(chalk.green(`[\u2713] Routes created`)) // eslint-disable-line
  const posts = await getFiles('posts')
  const pages = await getFiles('pages')

  return {
    pages: [
      ...pages.map(page => ({
        layout: 'Page',
        ...page
      })),
      {
        path: '/photos',
        layout: 'Photos'
      },
      {
        path: '/blog',
        layout: 'Blog'
      }
    ],
    posts: posts.map(post => ({ ...post, layout: 'Post' }))
  }
}

getRoutes().then(routes => {
  fs.writeFileSync('src/routes.json', JSON.stringify(routes, null, 2))
  console.timeEnd(chalk.green(`[\u2713] Routes created`)) // eslint-disable-line
})
