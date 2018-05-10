import React from 'react'

class InfiniteScroll extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll = () => {
    const { wrapper, isLoading, hasMore, loadMore } = this.props
    const container = document.getElementById(wrapper)

    if (isLoading || !hasMore) return null
    if (window.scrollY + window.innerHeight >= container.offsetHeight) {
      loadMore()
    }
  }

  render() {
    const { children } = this.props

    return children
  }
}

export default InfiniteScroll
