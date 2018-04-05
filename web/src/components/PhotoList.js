import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import Spinner from './Spinner'
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
      <div className="photo-list">
        {photos.map(photo => (
          <div key={photo.id}>
            <LazyLoad placeholder={<Spinner pacman />} offset={[100, 0]} resize>
              <img src={photo.thumbnailUrl} />
            </LazyLoad>
          </div>
        ))}
        {isLoading && (
          <div>
            <Spinner pacman />
          </div>
        )}
      </div>
    )
  }
}

export default PhotoList
