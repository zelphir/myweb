import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import NavLink from './components/NavLink'
import loadable from 'loadable-components'
import withData from './lib/withData'

const layouts = {
  Page: loadable(() => import('./layouts/Page')),
  Blog: loadable(() => import('./layouts/Blog')),
  Post: loadable(() => import('./layouts/Post')),
  Photos: loadable(() => import('./layouts/Photos')),
  NoMatch: loadable(() => import('./layouts/NoMatch'))
}

class App extends Component {
  state = {
    serviceWorkerState: null
  }

  onSwNotification = e => {
    this.setState({
      serviceWorkerState: e.state
    })
  }

  componentDidMount() {
    const elem = window.document

    elem.addEventListener(
      'serviceWorkerNotification',
      this.onSwNotification,
      false
    )
  }

  componentWillUnmount() {
    const elem = window.document

    elem.removeEventListener(
      'serviceWorkerNotification',
      this.onSwNotification,
      false
    )
  }

  render() {
    const { routes, loading, error } = this.props

    if (error) return null
    if (loading) return null

    return (
      <React.Fragment>
        <Helmet
          defaultTitle="robertomanzella.com"
          titleTemplate="%s | robertomanzella.com"
        />
        <h1>Navigation</h1>
        {Object.entries(routes).map(([id, data]) => (
          <NavLink
            key={id}
            {...data}
            path={data.path}
            reload={this.state.serviceWorkerState === 'new'}
          />
        ))}
        <Switch>
          {Object.entries(routes).map(([id, data]) => (
            <Route
              key={id}
              exact
              path={data.path}
              render={props => {
                const Component = layouts[data.layout]
                return <Component {...props} data={{ id, ...data }} />
              }}
            />
          ))}
          {Object.entries(routes.blog.posts).map(([id, data]) => (
            <Route
              key={id}
              exact
              path={`/blog/${data.path}`}
              render={props => {
                const Component = layouts[data.layout]
                return <Component {...props} data={{ id, ...data }} />
              }}
            />
          ))}
          <Route
            key={'/shell.html'}
            path="/shell.html"
            component={() => null}
          />
          <Route key={'/404.html'} component={layouts.NoMatch} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default withData(App)
