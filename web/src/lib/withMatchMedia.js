import React from 'react'
import { getComponentDisplayName } from './utils'

const withMatchMedia = ComposedComponent =>
  class WithMatchMedia extends React.Component {
    static displayName = `WithMatchMedia(${getComponentDisplayName(
      ComposedComponent
    )})`

    state = { isMobile: true, isPrint: false }

    componentDidMount() {
      this.mqlMobile = window.matchMedia('(max-width: 768px)')
      this.mqlPrint = window.matchMedia('print')
      this.setState({
        isMobile: this.mqlMobile.matches,
        isPrint: this.mqlPrint.matches
      })
      this.mqlMobile.addListener(this.mediaQueryChanged)
      this.mqlPrint.addListener(this.mediaQueryChanged)
    }

    componentWillUnmount() {
      this.mqlMobile.removeListener(this.mediaQueryChanged)
      this.mqlPrint.removeListener(this.mediaQueryChanged)
    }

    mediaQueryChanged = () => {
      this.setState({
        isMobile: this.mqlMobile.matches,
        isPrint: this.mqlPrint.matches
      })
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          isMobile={this.state.isMobile}
          isPrint={this.state.isPrint}
        />
      )
    }
  }

export default withMatchMedia
