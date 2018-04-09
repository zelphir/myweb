import React from 'react'
import Helmet from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import loadable from 'loadable-components'
import routes from './routes'

class App extends React.Component {
  state = { serviceWorkerState: null }

  onSwUpdate = e => {
    this.setState({ swStatus: e.state })
  }

  componentDidMount() {
    window.document.addEventListener('sw', this.onSwUpdate, false)
  }

  componentWillUnmount() {
    window.document.removeEventListener('sw', this.onSwUpdate, false)
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>robertomanzella.com</title>
        </Helmet>
        <Switch>
          {routes.pages.map(({ layout, path, data }) => (
            <Route
              key={path}
              exact
              path={path}
              data={data}
              component={loadable(() => import(`./layouts/${layout}`), {
                render: ({ Component, loading, ownProps }) => {
                  if (loading) return <div>Loading...</div>
                  return <Component {...ownProps} data={data} />
                }
              })}
            />
          ))}
          <Route component={loadable(() => import('./layouts/NoMatch'))} />
        </Switch>
        {this.state.swStatus === 'new' && <div>New content, refresh</div>}
      </React.Fragment>
    )
  }
}

export default App
