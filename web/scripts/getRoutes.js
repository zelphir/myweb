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
  partials.reduce(
    (obj, { file, ...partial }) => ({
      ...obj,
      [file.replace('.md', '')]: {
        ...partial,
        content: fs.readFileSync(
          path.resolve(__dirname, '../src/pages/partials', file),
          'utf8'
        )
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
      excerpt: true
    })
    const { slug, ...data } = mdData

    if (data.pdf && process.env.GET_PDF) await getPdf(content, data.pdf)

    const id = getId(slug, data.title)

    return {
      id: id === '/' ? 'home' : id,
      ...data,
      content,
      excerpt,
      path: id.includes('/') ? id : `/${id}`,
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
