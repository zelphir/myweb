import React from 'react'
import { withRouteData, Link } from 'react-static'
import Markdown from 'react-markdown'

import RouterLink from '../components/RouterLink'

export default withRouteData(({ post }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{post.data.title}</h3>
    <Markdown
      source={post.content}
      escapeHtml={false}
      renderers={{ link: RouterLink }}
    />
  </div>
))
