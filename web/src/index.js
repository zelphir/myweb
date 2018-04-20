import WebFont from 'webfontloader'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import Analytics from 'react-router-ga'
import { loadComponents, getState } from 'loadable-components'
import client from './lib/apollo'
import { MqlProvider } from './lib/withMql'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import ScrollToTop from './components/ScrollToTop'
import routes from './routes.json'

WebFont.load({
  google: {
    families: ['Quattrocento Sans:400', 'Work Sans:600']
  }
})

window.snapSaveState = () => getState()

const AppWithProviders = (
  <ApolloProvider client={client}>
    <MqlProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Analytics id={process.env.REACT_APP_GA_PROPERTY}>
            <App routes={routes} />
          </Analytics>
        </ScrollToTop>
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
