import React from 'react'
import { withRouteData } from 'react-static'
import Markdown from 'markdown-to-jsx'

import RouterLink from '../components/RouterLink'
import Contact from '../components/Contact'

import './Page.scss'

export default withRouteData(({ page }) => {
  const className = page.data.slug === '/' ? 'intro' : page.data.class || ''

  return (
    <div className={className}>
      <h1>{page.data.title}</h1>
      <Markdown
        options={{
          overrides: {
            a: {
              component: RouterLink
            },
            Contact: {
              component: Contact
            }
          }
        }}
      >
        {page.content}
      </Markdown>
    </div>
  )
})
