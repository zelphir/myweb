import React from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'react-static'
import { GetPictures } from 'gql/queries.graphql'
import PhotoList from '../components/PhotoList'
import Spinner from '../components/Spinner'
// import { OnPicturesUpdate } from 'gql/subscriptions.graphql'

const Photos = () => (
  <main id="photos">
    <h1>Photos time</h1>
    <Query
      query={GetPictures}
      variables={{ skip: 0, first: 12, countryCode: '', orderBy: 'date_DESC' }}
      notifyOnNetworkStatusChange
    >
      {({ loading, error, data, fetchMore }) => {
        if (error) return `Error! ${error.message}`
        if (loading && !data.allPictures) return <Spinner fluid />

        const photos = data.allPictures

        return (
          <PhotoList
            photos={photos}
            isLoading={loading}
            hasMore={photos.length !== data._allPicturesMeta.count}
            onLoadMore={() =>
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
          />
        )
      }}
    </Query>
  </main>
)

export default withRouter(Photos)
