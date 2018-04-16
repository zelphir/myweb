import React from 'react'
import { withRouter, matchPath } from 'react-router-dom'

class ScrollToTop extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { location } = this.props
    const isModal = prevProps.location.state && prevProps.location.state.modal
    const isPhoto = matchPath(location.pathname, {
      path: '/photo'
    })

    if (
      !isPhoto &&
      !isModal &&
      location !== prevProps.location
    ) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
