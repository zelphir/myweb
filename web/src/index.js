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

const rootElement = document.getElementById('root')
const EnhancedApp = (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MqlProvider>
        <App />
      </MqlProvider>
    </BrowserRouter>
  </ApolloProvider>
)

if (rootElement.hasChildNodes()) {
  loadComponents().then(() => {
    hydrate(EnhancedApp, rootElement)
  })
} else {
  render(EnhancedApp, rootElement)
}

registerServiceWorker()
