import React from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { location } = this.props
    const isModal = location.state && location.state.modal && prevProps.location !== location

    if (!isModal && location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
