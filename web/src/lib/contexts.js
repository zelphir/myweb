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
