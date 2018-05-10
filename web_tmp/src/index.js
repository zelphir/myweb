import React from 'react'
import WebFont from 'webfontloader'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import Analytics from 'react-router-ga'
import { loadComponents, getState } from 'loadable-components'
import registerServiceWorker from './lib/registerServiceWorker'
import MqlProvider from './lib/withMql'
import SWProvider from './lib/withSW'
import client from './lib/apollo'
import { isSnap } from './lib/utils'
import App from './App'
import ScrollToTop from './components/ScrollToTop'
import routes from './routes.json'

!isSnap &&
  WebFont.load({
    google: {
      families: ['Quattrocento Sans:400', 'Work Sans:600']
    }
  })

window.snapSaveState = () => getState()

const rootElement = document.getElementById('root')

const AppWithProviders = (
  <ApolloProvider client={client}>
    <SWProvider>
      <MqlProvider>
        <BrowserRouter>
          <ScrollToTop>
            {!isSnap ? (
              <Analytics id={process.env.REACT_APP_GA_PROPERTY}>
                <App routes={routes} />
              </Analytics>
            ) : (
              <App routes={routes} />
            )}
          </ScrollToTop>
        </BrowserRouter>
      </MqlProvider>
    </SWProvider>
  </ApolloProvider>
)

if (rootElement.hasChildNodes()) {
  loadComponents().then(() => {
    hydrate(AppWithProviders, rootElement)
  })
} else {
  render(AppWithProviders, rootElement)
}

!isSnap && registerServiceWorker()
