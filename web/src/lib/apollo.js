import { ApolloClient, split } from 'apollo-client-preset'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

import { isDev, isBrowser } from './utils'

if (!isBrowser) global.fetch = fetch

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) console.log('[Network error]', networkError) // eslint-disable-line
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
})

const httpLink = new HttpLink({
  uri: `${process.env.GQL_URL}/simple/v1/${process.env.GQL_SERVICE_ID}`
})

const wsLink = isBrowser
  ? new WebSocketLink({
      uri: process.env.GQL_WSS + process.env.GQL_SERVICE_ID,
      options: { reconnect: true }
    })
  : () => {}

const links = [
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
]

const client = new ApolloClient({
  link: isDev ? errorLink.split(...links) : split(...links),
  cache: new InMemoryCache()
})

export default client
