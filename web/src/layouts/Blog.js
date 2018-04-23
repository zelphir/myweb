import React from 'react'
import Seo from '../components/Seo'
import BlogPost from '../components/BlogPost'

const title = 'Blog'
const description =
  'My personal Blog, where I write about stuff that every developer could face in is coding life.'

const Blog = ({ data }) => (
  <main id="blog">
    <Seo title={title} description={description} path="/blog" />
    <h1>{title}</h1>
    <p>{description}</p>
    {Object.entries(data.posts).map(([id, post]) => <BlogPost key={id} post={post} />)}
  </main>
)

export default Blog
