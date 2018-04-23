import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { Transition } from 'react-transition-group'
import ThemeProvider from './lib/withTheme'
import Sidebar from './components/Sidebar'
import loadable from 'loadable-components'
import 'normalize.css/normalize.css'
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
    const { location, routes } = this.props
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
      </ThemeProvider>
    )
  }
}

export default withRouter(App)
