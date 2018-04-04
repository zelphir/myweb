import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ApolloProvider } from 'react-apollo'

import client from './lib/apollo'
import Sidebar from './components/Sidebar'
import { MqlProvider } from './lib/withMql'
import { PhotosProvider } from './lib/withPhotos'
import 'typeface-work-sans'
import 'typeface-quattrocento-sans'
import './App.scss'

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <MqlProvider>
        <PhotosProvider>
          <Sidebar />
          <Routes />
        </PhotosProvider>
      </MqlProvider>
    </Router>
  </ApolloProvider>
)

export default hot(module)(App)
