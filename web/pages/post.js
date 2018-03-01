import React from 'react'
import withPost, { Content } from 'nextein/post'

import MainLayout from '../layouts/MainLayout'

export default withPost(({ post }) => (
  <MainLayout title={post.data.title}>
    <header>
      <h1>{post.data.title}</h1>
      <a href="/">Home</a>
    </header>
    <section>
      <Content {...post} />
    </section>
  </MainLayout>
))
