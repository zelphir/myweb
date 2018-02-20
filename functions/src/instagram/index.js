import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

import { getAllTags as query, CreatePicture as mutation } from './schema.graphql'
import { transformBody } from '../utils'

const link = createHttpLink({ uri: process.env.GRAPHQL_URL, fetch })
const client = new ApolloClient({ cache: new InMemoryCache(), link })

const instagram = async (req, res) => {
  if (req.get('X-Client-ID') !== process.env.X_CLIENT_ID) return res.sendStatus(403)
  if (!req.body) return res.sendStatus(500)

  try {
    const { data: { allTags } } = await client.query({ query })
    const variables = await transformBody(req.body, allTags)

    await client.mutate({ variables, mutation })
    return res.status(200).end()
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
}

export default instagram
