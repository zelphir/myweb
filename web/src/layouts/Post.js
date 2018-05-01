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

class Post extends React.PureComponent {
  state = {
    data: this.props.data
  }

  componentDidMount() {
    if (!this.props.data) {
      this.props.loadData()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data) {
      console.log('didUpdate', prevProps.data)
      // return this.props.history.push('/blog')
    }
  }

  render() {
    const { loading, data } = this.props

    if (!data || loading) return <Spinner fluid />

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
}

export default withData(Post, { type: 'post' })
