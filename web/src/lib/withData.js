import React from 'react'
import { getComponentDisplayName } from './utils'

const withData = (ComposedComponent, url = '/api/routes.json') =>
  class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
    isSnap = window.snapStore && window.snapStore[url]
    state = { routes: this.isSnap ? window.snapStore[url] : [], loading: !this.isSnap }

    async componentDidMount() {
      if (!this.state.loading) return

      try {
        const response = await fetch(url)
        const routes = await response.json()
        this.setState({ loading: false, routes })
      } catch (error) {
        this.setState({ loading: false, error })
      }
    }

    render() {
      const { routes, loading } = this.state
      return <ComposedComponent {...this.props} routes={routes} loading={loading} />
    }
  }

export default withData
