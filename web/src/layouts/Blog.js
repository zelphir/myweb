import React from 'react'
import BlogPost from '../components/BlogPost'

const Blog = ({ data }) => (
  <main id="blog">
    <h1>Blog</h1>
    {Object.entries(data.posts).map(([id, post]) => (
      <BlogPost key={id} post={post} />
    ))}
  </main>
)

export default Blog
