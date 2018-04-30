import React from 'react'
import Helmet from 'react-helmet'
import Main from '../components/Main'

const NoMatch = () => {
  return (
    <Main>
      <Helmet>
        <title>404 - not found :(</title>
      </Helmet>
      <h1>404 - :(</h1>
    </Main>
  )
}

export default NoMatch
