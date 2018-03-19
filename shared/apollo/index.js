import fetch from 'node-fetch'
import querystring from 'querystring'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { GetAllTags, GetDailyStats } from 'gql/queries.graphql'
import { CreatePicture, UpdateDailyStats } from 'gql/mutations.graphql'

const uri = `${process.env.GRAPHCOOL_URL}/simple/v1/${
  process.env.GRAPHCOOL_SERVICE_ID
}`
const cache = new InMemoryCache()
const defaultOptions = {
  query: { fetchPolicy: 'network-only', errorPolicy: 'all' }
}

const httpLink = createHttpLink({ uri, fetch })
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${process.env.GRAPHCOOL_TOKEN}`
  }
}))

// =========== Instagram ============ //
const getCountry = async ({ lat, lng: lon }) => {
  try {
    if (!lat || !lon) {
      return { address: { country: null, countryCode: null, city: null } }
    }

    const options = { headers: { 'Accept-Language': 'en-GB' } }
    const params = querystring.stringify({ lat, lon, format: 'json', zoom: 10 })
    const url = `http://nominatim.openstreetmap.org/reverse?${params}`
    const res = await fetch(url, options)

    return res.json()
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
}

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions
})

export const addPicture = async picture => {
  try {
    const {
      address: { country, country_code: countryCode, city }
    } = await getCountry(picture)

    return client.mutate({
      variables: {
        ...picture,
        city,
        country,
        countryCode
      },
      mutation: CreatePicture,
      errorPolicy: 'ignore'
    })
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
}

export const getTags = async () => {
  try {
    const { data: { allTags } } = await client.query({ query: GetAllTags })

    return allTags
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
}

// =========== Stats ============ //
export const updateDailyStats = async variables => {
  try {
    return client.mutate({ variables, mutation: UpdateDailyStats })
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
}

export const getDailyStats = async () => {
  try {
    const { data: { allDailyStats } } = await client.query({
      query: GetDailyStats
    })

    return allDailyStats[0]
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
}
