import { client } from 'shared/graphql/client'
import { getAllTags as query, CreatePicture as mutation } from './query.gql'

export const addPicture = async variables => client.mutate({ variables, mutation })

export const getTags = async () => {
  try {
    const { data: { allTags } } = await client.query({ query })
    return allTags
  } catch (err) {
    console.error(err)
  }
}
