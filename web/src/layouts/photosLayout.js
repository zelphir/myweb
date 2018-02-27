import React from 'react'
import PropTypes from 'prop-types'

class PhotosLayout extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  render() {
    const { children } = this.props

    return (
      <div>
        <h1>Photos Layout</h1>
        {children()}
      </div>
    )
  }
}

export default PhotosLayout
