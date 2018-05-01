import React from 'react'
import { getComponentDisplayName } from './utils'

window.snapStore = window.snapStore || {}

const withData = (ComposedComponent, options = {}) =>
  class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`

    url = options.url || '/api/posts.json'
    type = options.type || 'posts'

    isSnap = window.snapStore && window.snapStore[this.url]

    state = {
      newData: this.isSnap ? window.snapStore[this.url] : [],
      data:
        this.type === 'posts'
          ? this.props.data[this.type]
          : this.props.location.state && this.props.location.state[this.type],
      loading: false
    }

    fetchData = async () => {
      try {
        const response = await fetch(this.url)
        const json = await response.json()
        window.snapStore[this.url] = json
        return json
      } catch (error) {
        this.setState({ loading: false, error })
      }
    }

    updateState = data => {
      this.setState(prevState => ({
        loading: false,
        data:
          this.type === 'posts'
            ? [...prevState.data, ...data.slice(prevState.data.length, prevState.data.length + 10)]
            : data.find(({ path }) => path === this.props.location.pathname),
        newData: data
      }))
    }

    loadData = async () => {
      this.setState({ loading: true })
      const { newData } = this.state

      if (newData.length) return this.updateState(newData)

      const data = await this.fetchData()
      return this.updateState(data)
    }

    render() {
      const { data, newData, loading } = this.state

      return (
        <ComposedComponent
          {...this.props}
          loading={loading}
          data={data}
          dataCount={newData.length}
          loadData={this.loadData}
        />
      )
    }
  }

export default withData
