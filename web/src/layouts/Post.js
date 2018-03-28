import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData } from 'react-static'

import renderMarkdown from '../lib/renderMarkdown.js'

const Post = ({ post }) => {
  const renderedMarkdown = renderMarkdown(post.content)

  return (
    <React.Fragment>
      <h3>{post.data.title}</h3>
      {renderedMarkdown}
    </React.Fragment>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default withRouteData(Post)
