import React from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { withMql } from '../../lib/withMql'
import Map from './Map'

class PhotoContent extends React.PureComponent {
  padding = {
    h: 140,
    v: 200
  }

  getPictureSize() {
    const { photo, windowSize } = this.props
    const percent = 70 / 100
    const calcWidth = (windowSize.width - this.padding.h) * percent
    const calcHeight = windowSize.height - this.padding.v
    const width = calcWidth <= photo.width ? calcWidth : photo.width
    const height = calcHeight <= photo.height ? calcHeight : photo.width

    switch (photo.ratio) {
      case 'landscape':
        return {
          width,
          height: width * photo.height / photo.width
        }
      case 'portrait':
      default:
        return {
          width: height * photo.width / photo.height,
          height
        }
    }
  }

  getMapSize() {
    const { windowSize } = this.props
    return {
      width: (windowSize.width - this.padding.h) * 30 / 100,
      height: this.getPictureSize().height
    }
  }

  closeModal = e => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {
    const { photo } = this.props
    return (
      <React.Fragment>
        <a href="/photos" onClick={this.closeModal} className="close-modal">
          &times;
        </a>
        <div
          className="modal-content"
          style={{
            width: this.getPictureSize().width + this.getMapSize().width
          }}
        >
          <h2>{photo.country}</h2>
          <p>{photo.caption}</p>
          <div className="picture">
            <div style={this.getPictureSize()}>
              <img src={photo.imageUrl} alt={photo.caption} />
            </div>
            <Map
              lat={photo.lat}
              lng={photo.lng}
              width={this.getMapSize().width}
              height={this.getMapSize().height}
            />
          </div>
          <div className="tags">
            {photo.tags.map(({ name, id }) => <span key={id}>{name}</span>)}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default compose(withRouter, withMql)(PhotoContent)
