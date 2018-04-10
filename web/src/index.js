import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { loadComponents, getState } from 'loadable-components'
import client from './lib/apollo'
import { MqlProvider } from './lib/withMql'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

window.snapSaveState = () => getState()

const AppWithProviders = (
  <ApolloProvider client={client}>
    <MqlProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MqlProvider>
  </ApolloProvider>
)

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  loadComponents().then(() => {
    hydrate(AppWithProviders, rootElement)
  })
} else {
  render(AppWithProviders, rootElement)
}

registerServiceWorker()
