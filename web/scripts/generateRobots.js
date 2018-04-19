const { writeFileSync } = require('fs')
const { resolve } = require('path')
const robotstxt = require('generate-robotstxt').default
const isBeta = process.argv[2] === 'beta'

const configProd = {
  policy: [
    {
      userAgent: '*',
      allow: '/',
      disallow: '/api'
    }
  ],
  sitemap: 'https://robertomanzella.com/sitemap.xml',
  host: 'https://robertomanzella.com'
}

const configBeta = {
  policy: [
    {
      userAgent: '*',
      disallow: '/'
    }
  ]
}

robotstxt(isBeta ? configBeta : configProd).then(content => {
  writeFileSync(resolve(__dirname, '../public/robots.txt'), content)
})
