import React from 'react'
import renderMarkdown from '../lib/renderMarkdown'

const Post = ({ data }) => (
  <main id="post">
    <h1>{data.title}</h1>
    {renderMarkdown(data.content)}
  </main>
)

export default Post
