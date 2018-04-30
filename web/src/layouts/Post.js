import React from 'react'
import Seo from '../components/Seo'
import Markdown from '../components/Markdown'
import Main from '../components/Main'

const Post = ({ location }) => {
  const {
    state: { post: data }
  } = location

  return (
    <Main id="post">
      <Seo {...data} />
      <h1>{data.title}</h1>
      <Markdown source={data.content} />
    </Main>
  )
}

export default Post
