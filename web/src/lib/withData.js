import React from 'react'
import { getComponentDisplayName } from './utils'

const withData = (ComposedComponent, url = '/api/posts.json') =>
  class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
    isSnap = window.snapStore && window.snapStore[url]
    state = { data: this.isSnap ? window.snapStore[url] : [], loading: !this.isSnap }

    async componentDidMount() {
      if (!this.state.loading) return

      try {
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ loading: false, data })
      } catch (error) {
        this.setState({ loading: false, error })
      }
    }

    render() {
      const { data, loading } = this.state
      return <ComposedComponent {...this.props} apiData={data} loading={loading} />
    }
  }

export default withData
