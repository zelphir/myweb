import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

class Photos extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    photos: PropTypes.array,
    subscribeToPhotos: PropTypes.func
  }

  render() {
    const { error, loading, photos } = this.props

    if (error) return <div>Error...</div>
    if (loading) return <div>Loading...</div>

    return photos.map(photo => <img key={photo.id} src={photo.thumbnailUrl} />)
  }
}

const GetPhotos = gql`
  query GetPhotos {
    allPictures(orderBy: date_DESC, first: 10) {
      id
      country
      caption
      thumbnailUrl
    }
    _allPicturesMeta {
      count
    }
  }
`

export default graphql(GetPhotos, {
  props: ({ data }) => ({
    loading: data.loading,
    error: data.error,
    photos: data.allPictures
  })
})(Photos)
