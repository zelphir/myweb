import React from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { withMql } from '../../lib/withMql'
import Map from './Map'
import Img from '../Img'

class PhotoContent extends React.PureComponent {
  padding = {
    h: 140,
    v: 140
  }

  getPictureSize() {
    const { photo, windowSize } = this.props
    const percent = 70 / 100
    const calcWidth = (windowSize.width - this.padding.h) * percent
    const calcHeight = windowSize.height - this.padding.v
    const width = calcWidth <= photo.width ? calcWidth : photo.width
    const height = calcHeight <= photo.height ? calcHeight : photo.width

    if (width * photo.height / photo.width >= height) {
      return {
        width: height * photo.width / photo.height,
        height
      }
    }

    return {
      width,
      height: width * photo.height / photo.width
    }
  }

  getMapSize() {
    const { windowSize } = this.props
    const percent = 30 / 100
    return {
      width: (windowSize.width - this.padding.h) * percent,
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
              <Img
                src={photo.imageUrl}
                alt={photo.caption}
                spinner={{ light: true, fluid: true }}
              />
            </div>
            <Map lat={photo.lat} lng={photo.lng} {...this.getMapSize()} />
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
