import React from 'react'
import LazyLoad from 'react-lazyload'
import { Query } from 'react-apollo'
import { GetPictures } from 'gql/queries.graphql'
import { Link, withRouter } from 'react-router-dom'
import qs from 'query-string'
// import { OnPicturesUpdate } from 'gql/subscriptions.graphql'
import InfiniteScroll from '../lib/InfiniteScroll'
import Spinner from './Spinner'
import Overlay from './Overlay'
import './PhotoList.css'

class PhotoList extends React.PureComponent {
  render() {
    const { pid } = qs.parse(this.props.location.search)

    return (
      <Query
        query={GetPictures}
        variables={{
          first: 24,
          orderBy: 'date_DESC',
          filter: { countryCode: this.props.match.params.country }
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
                showModal={!!pid}
                location={this.props.location.pathname}
                photo={photos.find(({ id }) => id === pid)}
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
                    <Link
                      className="picture"
                      key={photo.id}
                      to={`?pid=${photo.id}`}
                    >
                      <LazyLoad
                        placeholder={<Spinner pacman />}
                        offset={[100, 0]}
                        resize
                      >
                        <img src={photo.thumbnailUrl} alt="" />
                      </LazyLoad>
                    </Link>
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

export default withRouter(PhotoList)
