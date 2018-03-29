import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ApolloProvider } from 'react-apollo'

import client from './lib/apollo'
import Sidebar from './components/Sidebar'
import { DeviceProvider } from './lib/contexts'
import 'typeface-work-sans'
import 'typeface-quattrocento-sans'
import './App.scss'

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <DeviceProvider>
        <Sidebar />
        <Routes />
      </DeviceProvider>
    </Router>
  </ApolloProvider>
)

export default hot(module)(App)
