import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const uri = `https://api.graph.cool/simple/v1/${process.env.GRAPHQL_SERVICE_ID}`
const link = createHttpLink({ uri, fetch })
const cache = new InMemoryCache()
const defaultOptions = { query: { fetchPolicy: 'network-only', errorPolicy: 'all' } }

export const client = new ApolloClient({ link, cache, defaultOptions })
