import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData, Link } from 'react-static'

import renderMarkdown from '../lib/renderMarkdown.js'

const Post = ({ post }) => {
  const renderedMarkdown = renderMarkdown(post.content)

  return (
    <div>
      <Link to="/blog/">{'<'} Back</Link>
      <br />
      <h3>{post.data.title}</h3>
      {renderedMarkdown}
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default withRouteData(Post)
