import React from 'react'
import LazyLoad from 'react-lazyload'
import styled, { css } from 'react-emotion'
import { lighten } from 'polished'
import { graphql, compose } from 'react-apollo'
import { GetPictures } from 'gql/queries.graphql'
import { Link, withRouter } from 'react-router-dom'
import { mq, colors } from '../common'
import Seo from '../Seo'
import InfiniteScroll from '../InfiniteScroll'
import Spinner from '../Spinner'
import Img from '../Img'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const picture = css`
    background: ${lighten(0.9, colors.black)};
    display: block;
    flex-basis: calc(50% - 10px);
    margin: 5px;
    outline: 0;
    position: relative;

    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    img {
      height: 100%;
      left: 0;
      margin: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  ${mq.lg(css`
    flex-basis: calc(33.333% - 10px);
  `)};
  }
`

const PhotoList = ({ photos, error, loading, meta, fetchMore, location, match }) => {
  if (error || (loading && !photos)) return <Spinner fluid />

  const title = match.params.country && `Photos | ${photos[0].country}`

  return (
    <React.Fragment>
      <Seo image={photos[0].imageUrl} path={location.pathname} title={title} />
      <InfiniteScroll
        wrapper="photos"
        isLoading={loading}
        hasMore={photos.length !== meta.count}
        loadMore={() => {
          console.log('loadmore')
          return fetchMore(photos.length)
        }}
      >
        <Wrapper>
          {photos.map(photo => (
            <Link
              className={picture}
              key={photo.id}
              to={{
                pathname: `/photo/${photo.id}`,
                state: {
                  modal: true,
                  photo
                }
              }}
            >
              <LazyLoad resize offset={[100, 0]} placeholder={<Spinner absolute />}>
                <Img src={photo.thumbnailUrl} alt={photo.caption} spinner={{ absolute: true }} />
              </LazyLoad>
            </Link>
          ))}
          {loading && (
            <div className={picture}>
              <Spinner absolute />
            </div>
          )}
        </Wrapper>
      </InfiniteScroll>
    </React.Fragment>
  )
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
      pollInterval: 60000
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
