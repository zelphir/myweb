import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData, Link } from 'react-static'

const Blog = ({ posts }) => (
  <main className="blog">
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

export default withRouteData(Blog)
