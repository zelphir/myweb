import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { Transition } from 'react-spring'
import ThemeProvider from './lib/withTheme'
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
  prevLocation = this.props.location

  isModal() {
    const { location } = this.props
    return !!(location.state && location.state.modal && this.prevLocation !== location)
  }

  componentDidUpdate() {
    const { location } = this.props

    if (!location.state || !location.state.modal) {
      this.prevLocation = this.props.location
    }
  }

  render() {
    const { location, routes } = this.props

    return (
      <ThemeProvider>
        <Helmet
          defaultTitle={process.env.REACT_APP_DOMAIN}
          titleTemplate={`%s | ${process.env.REACT_APP_DOMAIN}`}
        />
        <Sidebar />
        <Switch location={this.isModal() ? this.prevLocation : location}>
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
          <Route
            path="/blog/:slug"
            render={props => {
              const Component = layouts.Post
              return <Component {...props} />
            }}
          />
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

export default withRouter(App)
