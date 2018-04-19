import React from 'react'
import { getComponentDisplayName } from './utils'

const Ctx = React.createContext()

export class MqlProvider extends React.Component {
  mqlPrint = window.matchMedia('print')
  mqlMobile = window.matchMedia(`(max-width: 768px)`)

  state = {
    isMobile: this.mqlMobile.matches,
    isPrint: this.mqlPrint.matches,
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount() {
    this.mqlMobile.addListener(this.setMql)
    this.mqlPrint.addListener(this.setMql)
    window.addEventListener('resize', this.setWindowSize, false)
  }

  componentWillUnmount() {
    this.mqlMobile.removeListener(this.setMql)
    this.mqlPrint.removeListener(this.setMql)
    window.removeEventListener('resize', this.setWindowSize, false)
  }

  setMql = () => {
    this.setState({
      isMobile: this.mqlMobile.matches,
      isPrint: this.mqlPrint.matches
    })
  }

  setWindowSize = () => {
    this.setState({
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
  }

  render() {
    return <Ctx.Provider value={this.state}>{this.props.children}</Ctx.Provider>
  }
}

export const withMql = ComposedComponent =>
  class WithMql extends React.Component {
    static displayName = `WithMql(${getComponentDisplayName(
      ComposedComponent
    )})`

    render() {
      return (
        <Ctx.Consumer>
          {({ isMobile, isPrint, windowSize }) => (
            <ComposedComponent
              isMobile={isMobile}
              isPrint={isPrint}
              windowSize={windowSize}
              {...this.props}
            />
          )}
        </Ctx.Consumer>
      )
    }
  }
