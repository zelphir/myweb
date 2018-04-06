import React from 'react'
import PropTypes from 'prop-types'

class InfiniteScroll extends React.Component {
  static propTypes = {
    wrapper: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

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
