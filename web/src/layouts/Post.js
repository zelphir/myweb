import React from 'react'
import Seo from '../components/Seo'
import md from '../lib/renderMarkdown'
import { getDescription } from '../lib/utils'

const Post = ({ data }) => {
  const description = getDescription(data)
  return (
    <main id="post">
      <Seo {...data} description={description} />
      <h1>{data.title}</h1>
      {md(data.content).render}
    </main>
  )
}

export default Post
