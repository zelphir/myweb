import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { startOfToday, endOfToday } from 'date-fns'

import { GetAllTags, GetTodayLanguages } from 'gql/queries.graphql'
import { CreatePicture, CreateLanguages } from 'gql/mutations.graphql'

const uri = `https://api.graph.cool/simple/v1/${process.env.GRAPHQL_SERVICE_ID}`
const link = createHttpLink({ uri, fetch })
const cache = new InMemoryCache()
const defaultOptions = { query: { fetchPolicy: 'network-only', errorPolicy: 'all' } }

export const client = new ApolloClient({ link, cache, defaultOptions })

export const addPicture = async variables => {
  try {
    return client.mutate({ variables, mutation: CreatePicture, errorPolicy: 'ignore' })
  } catch (err) {
    console.error(err)
  }
}

export const getTags = async () => {
  try {
    const { data: { allTags } } = await client.query({ query: GetAllTags })

    return allTags
  } catch (err) {
    console.error(err)
  }
}

export const addLanguages = async variables => {
  try {
    return client.mutate({ variables, mutation: CreateLanguages })
  } catch (err) {
    console.error(err)
  }
}

export const getTodayLanguages = async () => {
  try {
    const variables = { from: startOfToday().toISOString(), to: endOfToday().toISOString() }
    const { data: { allLanguages } } = await client.query({ variables, query: GetTodayLanguages })

    return allLanguages[0]
  } catch (err) {
    console.error(err)
  }
}
