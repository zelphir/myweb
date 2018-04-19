import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import { Transition } from 'react-transition-group'
import Sidebar from './components/Sidebar'
import loadable from 'loadable-components'
import withData from './lib/withData'
import './App.css'

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

    return !!(
      location.state &&
      location.state.modal &&
      this.prevLocation !== location
    )
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

  componentDidUpdate() {
    const { location } = this.props

    if (!location.state || !location.state.modal) {
      this.prevLocation = this.props.location
    }
  }

  render() {
    const { routes, loading, error, location } = this.props

    if (error) return null
    if (loading) return null

    const staticRoutes = Object.assign({}, routes, routes.blog.posts)

    return (
      <React.Fragment>
        <Helmet
          defaultTitle="robertomanzella.com"
          titleTemplate="%s | robertomanzella.com"
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
            key={'/shell.html'}
            path="/shell.html"
            component={() => null}
          />
          <Route
            path="/photo/:id"
            render={props => {
              const Component = layouts.Photo
              return <Component {...props} />
            }}
          />
          <Route key={'/404.html'} component={layouts.NoMatch} />
        </Switch>
        <Transition in={this.isModal()} timeout={100}>
          {state =>
            this.isModal() && (
              <Route
                path="/photo/:id"
                render={props => {
                  const Component = layouts.Photo
                  return (
                    <Component
                      {...props}
                      photo={location.state.photo}
                      modal
                      prevLocation={this.prevLocation.pathname}
                      animation={state}
                    />
                  )
                }}
              />
            )
          }
        </Transition>
      </React.Fragment>
    )
  }
}

export default compose(withRouter, withData)(App)
