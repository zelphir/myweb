import React from 'react'
import withData from '../lib/withData'
import Seo from '../components/Seo'
import BlogPost from '../components/BlogPost'
import Main from '../components/Main'
import Spinner from '../components/Spinner'
import InfiniteScroll from '../components/InfiniteScroll'

const title = 'Blog'
const description =
  'My personal Blog, where I write about stuff that every developer could face in is coding life.'

const Blog = ({ loading, data, dataCount, loadData }) =>
  loading && !data ? (
    <Spinner fluid />
  ) : (
    <Main id="blog">
      <Seo title={title} description={description} path="/blog" />
      <h1>{title}</h1>
      <p>{description}</p>
      <InfiniteScroll
        wrapper="blog"
        isLoading={loading}
        hasMore={data.length !== dataCount}
        loadMore={loadData}
      >
        {data.map(post => <BlogPost key={post.id} post={post} />)}
      </InfiniteScroll>
    </Main>
  )

export default withData(Blog)
