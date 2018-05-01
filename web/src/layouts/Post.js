import React from 'react'
import styled from 'react-emotion'
import { format } from 'date-fns'
import withData from '../lib/withData'
import Seo from '../components/Seo'
import Spinner from '../components/Spinner'
import Markdown from '../components/Markdown'
import Main from '../components/Main'
import Tags, { Tag } from '../components/Tags'

const Details = styled.small`
  color: grey;
  display: block;
  margin-bottom: 15px;
`

const Post = ({ loading, data }) => (
  <Main id="post">
    {!data || loading ? (
      <Spinner fluid />
    ) : (
      <React.Fragment>
        <Seo {...data} />
        <h1>{data.title}</h1>
        <Details>
          {format(data.date, 'D MMM YY')} | in: {data.category.map(c => <span key={c}>{c}</span>)}
        </Details>
        <Markdown source={data.content} />
        <Tags>{data.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Tags>
      </React.Fragment>
    )}
  </Main>
)

export default withData(Post, { type: 'post' })
