import React from 'react'
import PropTypes from 'prop-types'

import { getComponentDisplayName } from './utils'

const withInfiniteScroll = ComposedComponent =>
  class WithInfiniteScroll extends React.Component {
    static displayName = `WithInfiteScroll(${getComponentDisplayName(
      ComposedComponent
    )})`

    static propTypes = {
      isLoading: PropTypes.bool,
      hasMore: PropTypes.bool,
      loadMore: PropTypes.func
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false)
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false)
    }

    onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !this.props.isLoading
      ) {
        this.props.loadMore()
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

export default withInfiniteScroll
