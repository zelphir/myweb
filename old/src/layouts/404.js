import React from 'react'
import { Link } from 'react-static'

class NotFound extends React.PureComponent {
  state = {
    ready: false
  }

  componentDidMount() {
    this.makeReady()
  }

  makeReady = () => {
    if (!this.state.ready) {
      this.setState({
        ready: true
      })
    }
  }

  render() {
    return this.state.ready ? (
      <main>
        <h1>404 - :(</h1>
        <Link to="/">Home</Link>
      </main>
    ) : null
  }
}

export default NotFound
