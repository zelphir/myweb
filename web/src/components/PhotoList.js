import React from 'react'
import PropTypes from 'prop-types'

class PhotoList extends React.PureComponent {
  static propTypes = {
    photos: PropTypes.array,
    count: PropTypes.number,
    onLoadMore: PropTypes.func,
    subscribeToPhotos: PropTypes.func
  }

  render() {
    const { count, photos, onLoadMore } = this.props

    return (
      <React.Fragment>
        {photos.map(photo => <img key={photo.id} src={photo.thumbnailUrl} />)}
        {count > photos.length && <button onClick={onLoadMore}>more</button>}
      </React.Fragment>
    )
  }
}

export default PhotoList
