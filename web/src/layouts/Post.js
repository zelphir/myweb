import React from 'react'
import PropTypes from 'prop-types'

import renderMarkdown from '../lib/renderMarkdown.js'

const Post = ({ post }) => {
  const renderedMarkdown = renderMarkdown(post.content)

  return (
    <main id="post">
      <h3>{post.data.title}</h3>
      {renderedMarkdown}
    </main>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post
