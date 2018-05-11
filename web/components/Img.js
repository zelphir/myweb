import React from 'react'
import Spinner from './Spinner'

class Img extends React.PureComponent {
  state = {
    loading: true
  }

  handleOnLoad = () => this.setState({ loading: false })

  render() {
    const { loading } = this.state
    const { spinner, alt } = this.props

    return (
      <React.Fragment>
        {loading && <Spinner {...spinner} />}
        <img
          {...this.props}
          alt={alt}
          onLoad={this.handleOnLoad}
          style={this.state.loading ? { display: 'none' } : {}}
        />
      </React.Fragment>
    )
  }
}

export default Img
