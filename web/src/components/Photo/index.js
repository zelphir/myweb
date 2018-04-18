import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import classNames from 'classnames/dedupe'
import { GetPictures } from 'gql/queries.graphql'
import { withMql } from '../../lib/withMql'
import Spinner from '../Spinner'
import Map from './Map'
import Modal from './Modal'
import './index.css'

class Photo extends React.PureComponent {
  wrapper = React.createRef()

  state = {
    wrapperWidth: null,
    imageLoaded: false
  }

  updateWidth() {
    const wrapper = window.getComputedStyle(this.wrapper.current, null)
    const width = parseInt(wrapper.getPropertyValue('width'))
    const paddingLeft = parseInt(wrapper.getPropertyValue('padding-left'))
    const paddingRight = parseInt(wrapper.getPropertyValue('padding-right'))
    const wrapperWidth = width - paddingLeft - paddingRight
    this.setState({ wrapperWidth })
  }

  componentDidUpdate() {
    if (!this.props.photo) return this.props.history.push('/photos')
    if (this.state.imageLoaded) this.updateWidth()
  }

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true })
  }

  render() {
    const { loading, error, modal, photo, animation } = this.props
    const HtmlTag = modal ? 'div' : 'main'

    return (
      <HtmlTag
        id="photo"
        ref={this.wrapper}
        className={classNames('photo', {
          modal,
          [animation]: animation
        })}
      >
        {error ? (
          <div className="photo-error">{error.message}</div>
        ) : loading ? (
          <Spinner fluid light />
        ) : modal ? (
          !!photo && <Modal photo={photo} />
        ) : (
          !!photo && (
            <React.Fragment>
              <h1>{photo.country}</h1>
              <p>{photo.caption}</p>
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                onLoad={this.handleImageLoaded}
              />
              <Map
                lat={photo.lat}
                lng={photo.lng}
                height={300}
                width={this.state.wrapperWidth}
                light
              />
              <div className="tags">
                {photo.tags.map(({ name, id }) => <span key={id}>{name}</span>)}
              </div>
            </React.Fragment>
          )
        )}
      </HtmlTag>
    )
  }
}

export default compose(
  withMql,
  withRouter,
  graphql(GetPictures, {
    skip: ({ photo }) => !!photo,
    options: ({
      match: {
        params: { id }
      }
    }) => ({
      variables: { filter: { id } }
    }),
    props: ({ data }) => ({
      loading: data.loading,
      error: data.error,
      photo: data && data.allPictures ? data.allPictures[0] : null
    })
  })
)(Photo)
