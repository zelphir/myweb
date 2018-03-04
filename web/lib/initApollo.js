import { ApolloClient, from } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) console.log(`[Network error]: ${networkError}`) // eslint-disable-line
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }
})

const config = {
  http: { uri: `${process.env.GQL_URL}/simple/v1/${process.env.GQL_SERVICE_ID}` },
  ws: { uri: process.env.GQL_WSS + process.env.GQL_SERVICE_ID, options: { reconnect: true } }
}

const link = errorLink.split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  from([...(process.browser ? [new WebSocketLink(config.ws)] : [])]),
  from([new HttpLink(config.http)])
)

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) global.fetch = fetch

function create(initialState) {
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link
  })
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create(initialState)

  // Reuse client on the client-side
  if (!apolloClient) apolloClient = create(initialState)

  return apolloClient
}
