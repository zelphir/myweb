import React from 'react'
import renderMarkdown from '../lib/renderMarkdown'

const Post = ({ data }) => (
  <main id="post">
    <h3>{data.title}</h3>
    {renderMarkdown(data.content)}
  </main>
)

export default Post
