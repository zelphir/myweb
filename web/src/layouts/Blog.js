import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ data }) => (
  <main id="blog">
    <h1>Blog</h1>
    <ul>
      {Object.entries(data.posts).map(([id, post]) => (
        <li key={id}>
          <Link to={post.path}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </main>
)

export default Blog
