import React from 'react'
import { Query } from 'react-apollo'

import { GetPhotos } from 'gql/queries.graphql'
// import { OnPhotosUpdate } from 'gql/subscriptions.graphql'
import PhotoList from '../components/PhotoList'

const Photos = () => (
  <main className="photos">
    <h1>Photos time</h1>
    <Query query={GetPhotos} variables={{ skip: 0 }}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        const photos = data.allPictures

        return (
          <PhotoList
            photos={photos}
            count={data._allPicturesMeta.count}
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
