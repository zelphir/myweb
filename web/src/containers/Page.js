import React from 'react'
import { withRouteData } from 'react-static'
import Markdown from 'react-markdown'

import RouterLink from '../components/RouterLink'
import Contact from '../components/Contact'

export default withRouteData(({ page }) => {
  const introClass = page.data.slug === '/' ? 'intro' : ''

  return (
    <React.Fragment>
      <h1 className={introClass}>{page.data.title}</h1>
      <Markdown
        className={introClass}
        source={page.content}
        escapeHtml={false}
        renderers={{ link: RouterLink }}
      />
      {page.data.showContact && <Contact />}
    </React.Fragment>
  )
})
