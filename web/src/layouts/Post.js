import React from 'react'
import styled from 'react-emotion'
import { format } from 'date-fns'
import Seo from '../components/Seo'
import Markdown from '../components/Markdown'
import Main from '../components/Main'
import Tags, { Tag } from '../components/Tags'

const Details = styled.small`
  color: grey;
  display: block;
  margin-bottom: 15px;
`

const Post = ({ location }) => {
  const {
    state: { post: data }
  } = location

  return (
    <Main id="post">
      <Seo {...data} />
      <h1>{data.title}</h1>
      <Details>
        {format(data.date, 'D MMM YY')} | in: {data.category.map(c => <span key={c}>{c}</span>)}
      </Details>
      <Markdown source={data.content} />
      <Tags>{data.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Tags>
    </Main>
  )
}

export default Post
