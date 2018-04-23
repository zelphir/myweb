import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import styled from 'react-emotion'
import Tag from './Tag'

const Title = styled.h2`
  margin: 0;
`

const Small = styled.small`
  color: grey;
`

const BlogPost = ({ post }) => (
  <article>
    {post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    <Link to={post.path}>
      <Title>{post.title}</Title>
    </Link>
    <Small>
      {format(post.date, 'D MMM YY')} | in: {post.category.map(tag => <span key={tag}>{tag}</span>)}
    </Small>
    <p>{post.excerpt}</p>
  </article>
)

export default BlogPost
