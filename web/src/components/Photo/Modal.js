import React from 'react'
import { compose } from 'react-apollo'
import styled from 'react-emotion'
import { rgba, lighten } from 'polished'
import { withRouter } from 'react-router-dom'
import { withMql } from '../../lib/withMql'
import { colors } from '../common'
import Map from './Map'
import Img from '../Img'
import Tags, { Tag } from '../Tags'

const Wrapper = styled.div`
  align-items: center;
  background: ${rgba(lighten(0.15, colors.black), 0.955)};
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;

  h2,
  p {
    margin: 0 0 3px 0;
    color: ${colors.white};
  }

  h2 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
  }

  img {
    margin: 0;
  }
`

const CloseModal = styled.a`
  position: absolute;
  color: ${colors.white};
  font-size: 40px;
  line-height: 40px;
  padding: 0 15px;
  right: 0;
  top: 0;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`

const Picture = styled.div`
  align-items: center;
  background: rgba($black, 0.8);
  display: flex;
  justify-content: center;
`

class PhotoContent extends React.PureComponent {
  padding = {
    h: 120,
    v: 160
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
    const { photo, styles } = this.props
    return (
      <Wrapper style={styles}>
        <CloseModal href="/photos" onClick={this.closeModal}>
          &times;
        </CloseModal>
        <ModalContent
          style={{
            width: this.getPictureSize().width + this.getMapSize().width
          }}
        >
          <h2>{photo.country}</h2>
          <p>{photo.caption}</p>
          <Picture>
            <div style={this.getPictureSize()}>
              <Img
                src={photo.imageUrl}
                alt={photo.caption}
                spinner={{ light: true, fluid: true }}
              />
            </div>
            <Map lat={photo.lat} lng={photo.lng} {...this.getMapSize()} />
          </Picture>
          <Tags margin="10px 0 0">
            {photo.tags.map(({ name, id }) => (
              <Tag key={id} dark small>
                {name}
              </Tag>
            ))}
          </Tags>
        </ModalContent>
      </Wrapper>
    )
  }
}

export default compose(withRouter, withMql)(PhotoContent)
