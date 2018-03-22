import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ApolloProvider, compose } from 'react-apollo'
import Sidebar from 'react-sidebar'

import client from './lib/apollo'
import withMatchMedia from './lib/withMatchMedia'
import SidebarContent from './components/SidebarContent'
import ScrollToTop from './components/ScrollToTop'

import './App.scss'

class App extends React.PureComponent {
  state = {
    open: false
  }

  onSetOpen = open => this.setState({ open })

  handleOnClick = ev => {
    ev.preventDefault()
    this.onSetOpen(!this.state.open)
  }

  render() {
    const { isMobile } = this.props

    return (
      <ApolloProvider client={client}>
        <Router>
          <Sidebar
            open={this.state.open}
            sidebarClassName="sidebar"
            contentClassName="main"
            shadow={false}
            onSetOpen={this.onSetOpen}
            sidebar={<SidebarContent isMobile={isMobile} />}
            docked={!isMobile}
            transitions={isMobile}
          >
            <ScrollToTop />
            <a className="open-menu" onClick={this.handleOnClick} href="#">
              =
            </a>
            <Routes />
          </Sidebar>
        </Router>
      </ApolloProvider>
    )
  }
}

App.propTypes = {
  isMobile: PropTypes.bool
}

export default compose(hot(module), withMatchMedia)(App)
