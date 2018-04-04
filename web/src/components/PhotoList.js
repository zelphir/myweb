import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'

import { withMql } from '../lib/withMql'
import { withPhotos } from '../lib/withPhotos'
import './PhotoList.scss'

class PhotoList extends React.PureComponent {
  static propTypes = {
    photos: PropTypes.array,
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    onLoadMore: PropTypes.func,
    subscribeToPhotos: PropTypes.func
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll = () => {
    const { isLoading, hasMore } = this.props
    const main = document.getElementById('photos')

    if (isLoading || !hasMore) return null

    if (window.scrollY + window.innerHeight >= main.offsetHeight) {
      this.props.onLoadMore()
    }
  }

  render() {
    const { photos, isLoading } = this.props

    return (
      <React.Fragment>
        <div className="photo-list">
          {photos.map(photo => (
            <div key={photo.id} src={photo.thumbnailUrl}>
              <img src={photo.thumbnailUrl} />
            </div>
          ))}
        </div>
        {isLoading && <div>loading more...</div>}
      </React.Fragment>
    )
  }
}

export default compose(withMql, withPhotos)(PhotoList)
