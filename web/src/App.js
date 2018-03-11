import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ApolloProvider, compose } from 'react-apollo'

import client from './lib/apollo'
import withMatchMedia from './lib/withMatchMedia'
import Sidebar from './components/Sidebar'

import './App.scss'

const App = ({ isMobile }) => (
  <ApolloProvider client={client}>
    <Router>
      <div id="container">
        <Sidebar
          pageWrapId={'page-wrap'}
          outerContainerId={'container'}
          id="sidebar"
          isMobile={isMobile}
        />
        <div id="page-wrap">
          <Routes />
        </div>
      </div>
    </Router>
  </ApolloProvider>
)

App.propTypes = {
  isMobile: PropTypes.bool
}

export default compose(hot(module), withMatchMedia)(App)
