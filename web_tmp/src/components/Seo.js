import React from 'react'
import Helmet from 'react-helmet'

const getMetaTags = ({ title, description, url, date, updated, category, tags, image }) => {
  const metaTags = [
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { name: 'description', content: description },
    { name: 'twitter:site', content: '@robertomanzella' },
    { name: 'twitter:title', content: `${title} | ${process.env.REACT_APP_DOMAIN}` },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: '@robertomanzella' },
    { name: 'og:title', content: `${title} | ${process.env.REACT_APP_DOMAIN}` },
    { name: 'og:type', content: date ? 'article' : 'website' },
    { name: 'og:url', content: url },
    { name: 'og:description', content: description },
    { name: 'og:site_name', content: process.env.REACT_APP_DOMAIN },
    { name: 'og:locale', content: 'en_EN' }
  ]

  if (date) metaTags.push({ name: 'article:published_time', content: date })
  if (updated) metaTags.push({ name: 'article:modified_time', content: updated })
  if (category) metaTags.push({ name: 'article:section', content: category })
  if (tags) metaTags.push({ name: 'article:tag', content: tags })
  if (image) {
    metaTags.push({ itemprop: 'image', content: image })
    metaTags.push({ name: 'twitter:image:src', content: image })
    metaTags.push({ name: 'og:image', content: image })
    metaTags.push({ name: 'twitter:card', content: 'summary_large_image' })
  } else {
    metaTags.push({ name: 'twitter:card', content: 'summary' })
  }

  return metaTags
}

const Seo = ({ title, description, path, date, updated, category, tags, image }) => {
  const href = `https://${process.env.REACT_APP_DOMAIN}${path}`
  const metas = {
    ...(title && { title }),
    ...(description && { description }),
    ...(date && { date }),
    ...(updated && { updated }),
    ...(category && { category }),
    ...(tags && { tags }),
    ...(image && { image }),
    url: href
  }

  return (
    <Helmet link={[{ rel: 'canonical', href }]} meta={getMetaTags(metas)}>
      {!!title && <title>{title}</title>}
    </Helmet>
  )
}

export default Seo
