import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import styled from 'react-emotion'

const Title = styled.h2`
  margin: 0;
`

const Small = styled.small`
  color: grey;
`

const BlogPost = ({ post }) => (
  <article>
    <Link to={{ pathname: post.path, state: { post } }}>
      <Title>{post.title}</Title>
    </Link>
    <Small>
      {format(post.date, 'D MMM YY')} | in: {post.category.map(cat => <span key={cat}>{cat}</span>)}
    </Small>
    <p>{post.excerpt}</p>
  </article>
)

export default BlogPost
