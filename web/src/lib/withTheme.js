import React from 'react'
import { matchPath } from 'react-router-dom'
import { getComponentDisplayName } from './utils'

const Ctx = React.createContext()

class ThemeProvider extends React.Component {
  render() {
    const photos = matchPath(window.location.pathname, { path: '/photos' })
    const photo = matchPath(window.location.pathname, { path: '/photo/:id' })
    const theme = photos || photo ? 'photos' : 'dev'

    return <Ctx.Provider value={{ theme }}>{this.props.children}</Ctx.Provider>
  }
}

export const withTheme = ComposedComponent =>
  class WithTheme extends React.Component {
    static displayName = `WithTheme(${getComponentDisplayName(
      ComposedComponent
    )})`

    render() {
      return (
        <Ctx.Consumer>
          {({ theme }) => <ComposedComponent theme={theme} {...this.props} />}
        </Ctx.Consumer>
      )
    }
  }

export default ThemeProvider
