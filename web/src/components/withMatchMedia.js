import React from 'react'

const withMatchMedia = WrappedComponent => {
  class WithMatchMedia extends React.Component {
    state = {
      isMobile: true
    }

    componentDidMount() {
      this.matchMedia = window.matchMedia(`(max-width: 768px)`)
      this.matchMedia.addListener(this.mediaQueryChanged)
    }

    componentDidUnmount() {
      this.matchMedia.removeListener(this.mediaQueryChanged)
    }

    mediaQueryChanged = () => {
      this.setState({ isMobile: this.matchMedia.matches })
    }

    render() {
      return <WrappedComponent {...this.props} isMobile={this.state.isMobile} />
    }
  }

  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  WithMatchMedia.displayName = `WithMatchMedia(${componentName})`

  return WithMatchMedia
}

export default withMatchMedia
