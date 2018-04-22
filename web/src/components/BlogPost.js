import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import styled from 'react-emotion'
import Tag from './Tag'

const Title = styled.h2`
  margin-bottom: 0;
`

const Small = styled.small`
  color: grey;
`

const BlogPost = ({ post }) => (
  <article>
    <Link to={post.path}>
      <Title>{post.title}</Title>
    </Link>
    <Small>{format(post.date, 'D MMM YY')} | </Small>
    {post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    <p>{post.excerpt}</p>
  </article>
)

export default BlogPost
