import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'

import { getComponentDisplayName } from './utils'

const Ctx = createReactContext()

export class MqlProvider extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  state = { isMobile: undefined, isPrint: undefined }

  componentDidMount() {
    this.mqlPrint = window.matchMedia('print')
    this.mqlMobile = window.matchMedia(`(max-width: 768px)`)
    this.mqlMobile.addListener(this.setMql)
    this.mqlPrint.addListener(this.setMql)
    this.setMql()
  }

  componentWillUnmount() {
    this.mqlMobile.removeListener(this.setMql)
    this.mqlPrint.removeListener(this.setMql)
  }

  setMql = () => {
    this.setState({
      isMobile: this.mqlMobile.matches,
      isPrint: this.mqlPrint.matches
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
          {({ isMobile, isPrint }) => (
            <ComposedComponent isMobile={isMobile} isPrint={isPrint} />
          )}
        </Ctx.Consumer>
      )
    }
  }
