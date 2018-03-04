import React from 'react'
import withPost, { Content } from 'nextein/post'
import Link from 'nextein/link'

import MainLayout from '../layouts/MainLayout'

export default withPost(({ post }) => (
  <MainLayout title={post.data.title}>
    <header>
      <h1>{post.data.title}</h1>
      <Link href="/">Home</Link>
    </header>
    <section>
      <Content {...post} />
    </section>
  </MainLayout>
))
