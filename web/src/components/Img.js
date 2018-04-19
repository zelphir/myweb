import React from 'react'
import Spinner from './Spinner'

class Img extends React.PureComponent {
  state = {
    loading: true,
    error: false
  }

  componentDidMount() {
    const img = new Image()

    img.onload = () => {
      this.setState({
        loading: false,
        error: false
      })
    }

    img.src = this.props.src
  }

  render() {
    const { loading, error } = this.state
    const { spinner } = this.props

    if (loading || error) return <Spinner {...spinner} />

    return <img {...this.props} /> // eslint-disable-line
  }
}

export default Img
