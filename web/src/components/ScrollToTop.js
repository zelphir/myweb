import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-static'

class ScrollToTop extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.getElementsByClassName('main')[0].scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

export default withRouter(ScrollToTop)
