import React from 'react'
import { withRouteData } from 'react-static'
import Markdown from 'react-markdown'

import RouterLink from '../components/RouterLink'
import Contact from '../components/Contact'

export default withRouteData(({ page }) => {
  const introClass = page.data.slug === '/' ? 'intro' : ''

  return (
    <div className={introClass}>
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
