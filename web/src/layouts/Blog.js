import React from 'react'
import { isSnap } from '../lib/utils'
import Seo from '../components/Seo'
import BlogPost from '../components/BlogPost'
import Main from '../components/Main'
import Spinner from '../components/Spinner'
import InfiniteScroll from '../components/InfiniteScroll'

const title = 'Blog'
const description =
  'My personal Blog, where I write about stuff that every developer could face in is coding life.'

class Blog extends React.PureComponent {
  static getDerivedStateFromProps({ data }) {
    return {
      postsToShow: data.posts
    }
  }

  state = { posts: [], loading: false }

  getPosts = async () => {
    try {
      const response = await fetch('/api/posts.json')
      return response.json()
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  loadMore = async () => {
    this.setState({ loading: true })
    const { posts, postsToShow } = this.state
    const length = postsToShow.length

    if (posts.length) {
      return this.setState({
        loading: false,
        postsToShow: [...postsToShow, ...posts.slice(length, length + 10)]
      })
    }

    const newPosts = await this.getPosts()
    this.setState({
      loading: false,
      posts: newPosts,
      postsToShow: [...postsToShow, ...newPosts.slice(length, length + 10)]
    })
  }

  async componentDidMount() {
    if (isSnap) {
      const postsToShow = await this.getPosts()
      this.setState({
        loading: false,
        postsToShow
      })
    }
  }

  render() {
    const { loading, posts, postsToShow } = this.state

    if (loading && !postsToShow) return <Spinner fluid />

    return (
      <Main id="blog">
        <Seo title={title} description={description} path="/blog" />
        <h1>{title}</h1>
        <p>{description}</p>
        <InfiniteScroll
          wrapper="blog"
          isLoading={loading}
          hasMore={postsToShow.length !== posts.length}
          loadMore={() => this.loadMore()}
        >
          {postsToShow.map(post => <BlogPost key={post.id} post={post} />)}
        </InfiniteScroll>
      </Main>
    )
  }
}

export default Blog
