import React from 'react'
import LazyLoad from 'react-lazyload'
import { graphql, compose } from 'react-apollo'
import { GetPictures } from 'gql/queries.graphql'
import { Link, withRouter } from 'react-router-dom'
import Seo from '../Seo'
import InfiniteScroll from '../InfiniteScroll'
import Spinner from '../Spinner'
import Img from '../Img'
import './List.css'

class PhotoList extends React.PureComponent {
  render() {
    const { photos, error, loading, meta, fetchMore, location, match } = this.props

    if (error || (loading && !photos)) return <Spinner fluid />

    const title = match.params.country && `Photos | ${photos[0].country}`

    return (
      <React.Fragment>
        <Spinner light />
        <Seo image={photos[0].imageUrl} path={location.pathname} title={title} />
        <InfiniteScroll
          wrapper="photos"
          isLoading={loading}
          hasMore={photos.length !== meta.count}
          loadMore={() => fetchMore(photos.length)}
        >
          <div className="photo-list">
            {photos.map(photo => (
              <Link
                className="picture"
                key={photo.id}
                to={{
                  pathname: `/photo/${photo.id}`,
                  state: {
                    modal: true,
                    photo
                  }
                }}
              >
                <LazyLoad offset={[100, 0]} resize>
                  <Img
                    src={photo.thumbnailUrl}
                    alt={photo.caption}
                    spinner={{ light: true, fluid: true }}
                  />
                </LazyLoad>
              </Link>
            ))}
            {loading && (
              <div className="picture">
                <Spinner fluid />
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
      notifyOnNetworkStatusChange: true,
      pollInterval: 6000
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
