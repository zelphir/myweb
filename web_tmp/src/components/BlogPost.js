import React from 'react'
import { format } from 'date-fns'
import styled from 'react-emotion'
import NavLink from './NavLink'

const Title = styled.h2`
  margin: 0;
`

const Small = styled.small`
  color: grey;
`

const BlogPost = ({ post }) => (
  <article>
    <NavLink to={{ pathname: post.path, state: { post } }}>
      <Title>{post.title}</Title>
    </NavLink>
    <Small>
      {format(post.date, 'D MMM YY')} | in: {post.category.map(cat => <span key={cat}>{cat}</span>)}
    </Small>
    <p>{post.excerpt}</p>
  </article>
)

export default BlogPost
