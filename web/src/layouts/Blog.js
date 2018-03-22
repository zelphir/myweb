import React from 'react'
import { withRouteData, Link } from 'react-static'

export default withRouteData(({ posts }) => (
  <div className="blog">
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
  </div>
))
