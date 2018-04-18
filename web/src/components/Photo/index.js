import React from 'react'
import { graphql } from 'react-apollo'
import classNames from 'classnames/dedupe'
import { GetPictures } from 'gql/queries.graphql'
import Spinner from '../Spinner'
import Map from './Map'
import Modal from './Modal'
import './index.css'

class Photo extends React.PureComponent {
  render() {
    const { loading, error, modal, photo, animation } = this.props
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
            <Map lat={photo.lat} lng={photo.lng} height={300} />
            <div className="tags">
              {photo.tags.map(({ name, id }) => <span key={id}>{name}</span>)}
            </div>
          </React.Fragment>
        )}
      </HtmlTag>
    )
  }
}

export default graphql(GetPictures, {
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
})(Photo)
