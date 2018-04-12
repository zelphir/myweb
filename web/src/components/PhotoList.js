import React from 'react'
import LazyLoad from 'react-lazyload'
import { graphql, compose } from 'react-apollo'
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
    const { photos, error, loading, meta, fetchMore } = this.props
    const { pid } = qs.parse(this.props.location.search)

    if (error) return `Error! ${error.message}`
    if (loading && !photos) return <Spinner fluid />

    return (
      <React.Fragment>
        <Overlay
          showModal={!!pid}
          {...this.props}
          photo={photos.find(({ id }) => id === pid)}
        />
        <InfiniteScroll
          wrapper="photos"
          isLoading={loading}
          hasMore={photos.length !== meta.count}
          loadMore={() => fetchMore(photos.length)}
        >
          <div className="photo-list">
            {photos.map(photo => (
              <Link className="picture" key={photo.id} to={`?pid=${photo.id}`}>
                <LazyLoad placeholder={<Spinner />} offset={[100, 0]} resize>
                  <img src={photo.thumbnailUrl} alt={photo.caption} />
                </LazyLoad>
              </Link>
            ))}
            {loading && (
              <div className="picture">
                <Spinner />
              </div>
            )}
          </div>
        </InfiniteScroll>
      </React.Fragment>
    )
  }
}

export default compose(
  withRouter,
  graphql(GetPictures, {
    options: ({ match }) => ({
      variables: {
        first: 24,
        orderBy: 'date_DESC',
        filter: { countryCode: match.params.country }
      },
      notifyOnNetworkStatusChange: true
    }),
    props: ({ data }) => ({
      loading: data.loading,
      error: data.error,
      photos: data.allPictures,
      meta: data._allPicturesMeta,
      fetchMore: skip =>
        data.fetchMore({
          variables: { skip },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev

            return {
              ...prev,
              allPictures: [...prev.allPictures, ...fetchMoreResult.allPictures]
            }
          }
        })
    })
  })
)(PhotoList)
