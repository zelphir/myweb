import React from 'react'
import Seo from '../components/Seo'
import Md from 'react-markdown'
import { getDescription } from '../lib/utils'

const Post = ({ data }) => {
  const description = <Md source={getDescription(data)} />
  return (
    <main id="post">
      <Seo {...data} description={description} />
      <h1>{data.title}</h1>
      <Md source={data.content} renderers={{ root: React.Fragment }} />
    </main>
  )
}

export default Post
