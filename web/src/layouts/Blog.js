import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ posts }) => (
  <main id="blog">
    <h1>Blog time.</h1>
    <br />
    All Posts:
    <ul>
      {posts.map(post => (
        <li key={post.data.slug}>
          <Link to={`/blog/${post.data.slug}/`}>{post.data.title}</Link>
        </li>
      ))}
    </ul>
  </main>
)

Blog.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Blog
