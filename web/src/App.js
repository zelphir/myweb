import React from 'react'
import { Router, Route, Switch } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ApolloProvider } from 'react-apollo'
import universal from 'react-universal-component'
import client from './lib/apollo'
import Sidebar from './components/Sidebar'
import { MqlProvider } from './lib/withMql'
import 'typeface-work-sans'
import 'typeface-quattrocento-sans'
import './App.scss'

const Photos = universal(import('./layouts/Photos'))

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <MqlProvider>
        <Sidebar />
        <Switch>
          <Route path="/photos/:country?" component={Photos} />
          <Routes />
        </Switch>
      </MqlProvider>
    </Router>
  </ApolloProvider>
)

export default hot(module)(App)
