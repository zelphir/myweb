import React from 'react'
import { withMql } from '../../lib/withMql'
import Map from './Map'

class PhotoContent extends React.PureComponent {
  padding = 120

  getPictureSize() {
    const { photo, windowSize } = this.props
    const percent = 70 / 100
    const calcWidth = (windowSize.width - this.padding) * percent
    const calcHeight = windowSize.height - this.padding
    const width = calcWidth <= photo.width ? calcWidth : photo.width
    const height = calcHeight <= photo.height ? calcHeight : photo.width

    return {
      width:
        photo.ratio === 'landscape'
          ? width
          : height * photo.width / photo.height,
      height:
        photo.ratio === 'landscape'
          ? width * photo.height / photo.width
          : height
    }
  }

  getMapSize() {
    const { windowSize } = this.props
    return {
      width: (windowSize.width - this.padding) * 30 / 100,
      height: this.getPictureSize().height
    }
  }

  render() {
    const { photo } = this.props
    return (
      <div className="modal-content">
        <div className="picture" style={this.getPictureSize()}>
          <img src={photo.imageUrl} alt={photo.caption} />
        </div>
        <Map
          lat={photo.lat}
          lng={photo.lng}
          width={this.getMapSize().width}
          height={this.getMapSize().height}
        />
      </div>
    )
  }
}

export default withMql(PhotoContent)
