import React from 'react'
import { Query } from 'react-apollo'

import { GetPictures } from 'gql/queries.graphql'
// import { OnPicturesUpdate } from 'gql/subscriptions.graphql'
import PhotoList from '../components/PhotoList'

const Photos = () => (
  <main id="photos">
    <h1>Photos time</h1>
    <Query
      query={GetPictures}
      variables={{ skip: 0 }}
      notifyOnNetworkStatusChange
    >
      {({ loading, error, data, fetchMore }) => {
        const photos = data.allPictures

        if (loading && !photos) return 'Loading...'
        if (error) return `Error! ${error.message}`

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

export default Photos
