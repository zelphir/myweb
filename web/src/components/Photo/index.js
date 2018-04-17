import React from 'react'
import { graphql, compose } from 'react-apollo'
import classNames from 'classnames/dedupe'
import { GetPictures } from 'gql/queries.graphql'
import { withMql } from '../../lib/withMql'
import Spinner from '../Spinner'
import Map from './Map'
import Modal from './Modal'
import './index.css'

class Photo extends React.PureComponent {
  state = {
    parentWidth: null
  }

  componentDidUpdate(prevProps) {
    const { loading, error, modal } = this.props

    if (loading || error || modal) return

    const mapWrapper = document.getElementById('map')
    this.setState({ parentWidth: mapWrapper.clientWidth })

    if (prevProps.windowSize.width !== this.props.windowSize.width) {
      this.setState({ parentWidth: mapWrapper.clientWidth })
    }
  }

  render() {
    const { loading, error, modal, photo, animation } = this.props
    const { parentWidth } = this.state
    const HtmlTag = modal ? 'div' : 'main'

    return (
      <HtmlTag
        id="photo"
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
          <Modal photo={photo} />
        ) : (
          <React.Fragment>
            <h1>{photo.country}</h1>
            <p>{photo.caption}</p>
            <img src={photo.imageUrl} alt={photo.caption} />
            <div id="map">
              {parentWidth && (
                <Map
                  lat={photo.lat}
                  lng={photo.lng}
                  height={300}
                  width={parentWidth}
                />
              )}
            </div>
            <div className="tags">
              {photo.tags.map(({ name, id }) => <span key={id}>{name}</span>)}
            </div>
          </React.Fragment>
        )}
      </HtmlTag>
    )
  }
}

export default compose(
  withMql,
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
