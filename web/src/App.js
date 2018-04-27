import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import { Transition } from 'react-spring'
import ThemeProvider from './lib/withTheme'
import withData from './lib/withData'
import Sidebar from './components/Sidebar'
import loadable from 'loadable-components'
import './lib/globalStyles'

const layouts = {
  Page: loadable(() => import('./layouts/Page')),
  Blog: loadable(() => import('./layouts/Blog')),
  Post: loadable(() => import('./layouts/Post')),
  Photo: loadable(() => import('./components/Photo')),
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

  prevLocation = this.props.location

  isModal() {
    const { location } = this.props

    return !!(location.state && location.state.modal && this.prevLocation !== location)
  }

  componentDidMount() {
    const elem = window.document

    elem.addEventListener('serviceWorkerNotification', this.onSwNotification, false)
  }

  componentWillUnmount() {
    const elem = window.document

    elem.removeEventListener('serviceWorkerNotification', this.onSwNotification, false)
  }

  componentDidUpdate() {
    const { location } = this.props

    if (!location.state || !location.state.modal) {
      this.prevLocation = this.props.location
    }
  }

  render() {
    const { location, routes, loading } = this.props

    if (!routes || loading) return null

    const staticRoutes = Object.assign({}, routes, routes.blog.posts)

    return (
      <ThemeProvider>
        <Helmet
          defaultTitle={process.env.REACT_APP_DOMAIN}
          titleTemplate={`%s | ${process.env.REACT_APP_DOMAIN}`}
        />
        <Sidebar />
        <Switch location={this.isModal() ? this.prevLocation : location}>
          {Object.entries(staticRoutes).map(([id, data]) => (
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
          <Route
            path="/photos/:country"
            render={props => {
              const Component = layouts.Photos
              return <Component {...props} />
            }}
          />
          <Route
            path="/photo/:id"
            render={props => {
              const Component = layouts.Photo
              return <Component {...props} />
            }}
          />
          <Route component={layouts.NoMatch} />
        </Switch>
        {this.isModal() && (
          <Transition
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            config={{ tension: 100, friction: 15 }}
          >
            {styles => (
              <Route
                path="/photo/:id"
                render={props => {
                  const Component = layouts.Photo
                  return <Component modal styles={styles} photo={location.state.photo} {...props} />
                }}
              />
            )}
          </Transition>
        )}
      </ThemeProvider>
    )
  }
}

export default compose(withRouter, withData)(App)
