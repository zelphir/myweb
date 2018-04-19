import React from 'react'
import GoogleAnalytics from 'react-ga'
import { getComponentDisplayName, isDev } from './utils'

GoogleAnalytics.initialize(process.env.REACT_APP_GA_PROPERTY, {
  testMode: isDev
})

const withTracker = (ComposedComponent, options = {}) =>
  class WithTracker extends React.Component {
    trackPage = page => {
      GoogleAnalytics.set({
        page,
        ...options
      })
      GoogleAnalytics.pageview(page)
    }

    static displayName = `WithTracker(${getComponentDisplayName(
      ComposedComponent
    )})`

    componentDidUpdate(prevProps) {
      const prevPage = prevProps.location.pathname
      const currentPage = this.props.location.pathname

      if (currentPage !== prevPage) {
        this.trackPage(prevPage)
      }
    }

    componentDidMount() {
      const page = this.props.location.pathname
      this.trackPage(page)
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

export default withTracker
