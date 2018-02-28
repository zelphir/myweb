import React from 'react'

const withMatchMedia = WrappedComponent => {
  class WithMatchMedia extends React.Component {
    matchMedia = window.matchMedia(`(max-width: 768px)`)

    state = {
      isMobile: undefined
    }

    componentWillMount() {
      this.setState({ isMobile: this.matchMedia.matches })
      this.matchMedia.addListener(this.mediaQueryChanged)
    }

    componentWillUnmount() {
      this.matchMedia.removeListener(this.mediaQueryChanged)
    }

    mediaQueryChanged = () => {
      this.setState({ isMobile: this.matchMedia.matches })
    }

    render() {
      return <WrappedComponent {...this.props} isMobile={this.state.isMobile} />
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  WithMatchMedia.displayName = `WithMatchMedia(${displayName})`

  return WithMatchMedia
}

export default withMatchMedia
