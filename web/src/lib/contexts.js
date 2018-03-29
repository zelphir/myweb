import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'

export const Ctx = createReactContext()

export class DeviceProvider extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  state = { isMobile: false, isPrint: false }

  componentDidMount() {
    this.mqlMobile = window.matchMedia(`(max-width: 768px)`)
    this.mqlPrint = window.matchMedia('print')
    this.setState({
      isMobile: this.mqlMobile.matches,
      isPrint: this.mqlPrint.matches
    })
    this.mqlMobile.addListener(this.mediaQueryChanged)
    this.mqlPrint.addListener(this.mediaQueryChanged)
  }

  componentWillUnmount() {
    this.mqlMobile.removeListener(this.mediaQueryChanged)
    this.mqlPrint.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged = () => {
    this.setState({
      isMobile: this.mqlMobile.matches,
      isPrint: this.mqlPrint.matches
    })
  }

  render() {
    return <Ctx.Provider value={this.state}>{this.props.children}</Ctx.Provider>
  }
}
