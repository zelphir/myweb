import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { Query } from 'react-apollo'
import { GetPictures } from 'gql/queries.graphql'
// import { OnPicturesUpdate } from 'gql/subscriptions.graphql'
import InfiniteScroll from '../lib/InfiniteScroll'
import Spinner from './Spinner'
import Overlay from './Overlay'
import './PhotoList.scss'

class PhotoList extends React.PureComponent {
  static propTypes = {
    params: PropTypes.object,
    subscribeToPhotos: PropTypes.func
  }

  state = {
    showModal: false
  }

  handleToggleModal = e => {
    e.preventDefault()
    this.setState({
      showModal: !this.state.showModal
    })
  }

  // componentDidMount() {
  //   console.log('photos')
  //   setTimeout(() => window.scrollTo(0, 0), 100)
  //   console.log('after scroll')
  // }

  render() {
    return (
      <Query
        query={GetPictures}
        variables={{
          first: 24,
          orderBy: 'date_DESC',
          filter: { countryCode: this.props.params.country }
        }}
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data, fetchMore }) => {
          if (error) return `Error! ${error.message}`
          if (loading && !data.allPictures) return <Spinner fluid />

          const photos = data.allPictures

          return (
            <React.Fragment>
              <Overlay
                showModal={this.state.showModal}
                handleModal={this.handleToggleModal}
              />
              <InfiniteScroll
                wrapper="photos"
                isLoading={loading}
                hasMore={photos.length !== data._allPicturesMeta.count}
                loadMore={() =>
                  fetchMore({
                    variables: { skip: photos.length },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev

                      return {
                        ...prev,
                        allPictures: [
                          ...prev.allPictures,
                          ...fetchMoreResult.allPictures
                        ]
                      }
                    }
                  })
                }
              >
                <div className="photo-list">
                  {photos.map(photo => (
                    <a
                      className="picture"
                      key={photo.id}
                      href="#"
                      onClick={this.handleToggleModal}
                    >
                      <LazyLoad
                        placeholder={<Spinner pacman />}
                        offset={[100, 0]}
                        resize
                      >
                        <img src={photo.thumbnailUrl} />
                      </LazyLoad>
                    </a>
                  ))}
                  {loading && (
                    <div className="picture">
                      <Spinner pacman />
                    </div>
                  )}
                </div>
              </InfiniteScroll>
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}

export default PhotoList
