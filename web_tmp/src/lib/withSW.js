import React from 'react'
import { getComponentDisplayName } from './utils'

const Ctx = React.createContext()

class SWProvider extends React.Component {
  state = {
    serviceWorkerState: null
  }

  onSwNotification = e => {
    this.setState({
      serviceWorkerState: e.detail.state
    })
  }

  componentDidMount() {
    const elem = window.document
    elem.addEventListener('serviceWorkerNotification', this.onSwNotification, false)
  }

  componentWillUnmount() {
    const elem = window.document
    elem.removeEventListener('serviceWorkerNotification', this.onSwNotification, false)
  }

  render() {
    return <Ctx.Provider value={this.state}>{this.props.children}</Ctx.Provider>
  }
}

export const withSW = ComposedComponent =>
  class WithSW extends React.Component {
    static displayName = `WithSW(${getComponentDisplayName(ComposedComponent)})`

    render() {
      return (
        <Ctx.Consumer>
          {({ serviceWorkerState }) => (
            <ComposedComponent newContent={serviceWorkerState === 'new'} {...this.props} />
          )}
        </Ctx.Consumer>
      )
    }
  }

export default SWProvider
