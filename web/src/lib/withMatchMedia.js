import React from 'react'
import { getComponentDisplayName } from './utils'

const withMatchMedia = ComposedComponent =>
  class WithMatchMedia extends React.Component {
    static displayName = `WithMatchMedia(${getComponentDisplayName(ComposedComponent)})`

    state = { isMobile: true }

    componentDidMount() {
      this.matchMedia = window.matchMedia(`(max-width: 768px)`)
      this.matchMedia.addListener(this.mediaQueryChanged)
    }

    componentWillUnmount() {
      this.matchMedia.removeListener(this.mediaQueryChanged)
    }

    mediaQueryChanged = () => {
      this.setState({ isMobile: this.matchMedia.matches })
    }

    render() {
      return <ComposedComponent {...this.props} isMobile={this.state.isMobile} />
    }
  }

export default withMatchMedia
