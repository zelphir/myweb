import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { isBrowser } from './lib/utils'

export default App

if (isBrowser) {
  const serviceWorker = require('./lib/serviceWorker')
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  render(App)
  serviceWorker.register()
}
