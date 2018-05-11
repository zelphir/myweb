import React from 'react'
import { withRouter } from 'next/router'
import Markdown from '../components/Markdown'
import routes from '../routes.json'

class Page extends React.Component {
  static async getInitialProps({ asPath }) {
    const route = asPath === '/' ? 'home' : asPath.replace('/', '')

    return {
      data: routes[route]
    }
  }

  render() {
    const { router, data } = this.props

    return (
      <>
        <div>{router.asPath}</div>
        <Markdown source={data.content} />
      </>
    )
  }
}

export default withRouter(Page)
