import React from 'react'
import { withRouteData } from 'react-static'
import Markdown from 'react-markdown'

import RouterLink from '../components/RouterLink'
import Contact from '../components/Contact'

import './Page.scss'

export default withRouteData(({ page }) => {
  const className = page.data.slug === '/' ? 'intro' : page.data.class || ''

  return (
    <div className={className}>
      <h1>{page.data.title}</h1>
      <Markdown
        source={page.content}
        escapeHtml={false}
        renderers={{ link: RouterLink }}
      />
      {page.data.showContact && <Contact />}
    </div>
  )
})
