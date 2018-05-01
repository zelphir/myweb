import React from 'react'
import { getComponentDisplayName } from './utils'

window.snapStore = window.snapStore || {}

const withData = (ComposedComponent, options = {}) =>
  class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`

    url = options.url || '/api/posts.json'
    type = options.type || 'posts'

    state = {
      newData: window.snapStore[this.url] || [],
      data: this.type === 'post' ? undefined : this.props.data[this.type],
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

    getPost = data => {
      const post = data.find(({ path }) => path === this.props.location.pathname)
      if (!post) return this.props.history.push('/blog')
      return post
    }

    updateState = newData => {
      this.setState(prevState => ({
        loading: false,
        data:
          this.type === 'post'
            ? this.getPost(newData)
            : [
                ...prevState.data,
                ...newData.slice(prevState.data.length, prevState.data.length + 10)
              ],
        newData
      }))
    }

    loadData = async () => {
      this.setState({ loading: true })
      const { newData } = this.state

      if (newData.length) return this.updateState(newData)

      const data = await this.fetchData()
      return this.updateState(data)
    }

    async componentDidMount() {
      // Load all the posts for snapshot
      if (this.props.isSnap) {
        const data = await this.fetchData()
        this.setState({ data, loading: false })
      }

      if (this.type === 'post') {
        if (this.props.location.state) {
          this.setState({ data: this.props.location.state.post })
        } else {
          await this.loadData()
        }
      }
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
