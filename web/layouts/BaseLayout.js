import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import './BaseLayout.scss'

const BaseLayout = ({ children, title = 'This is the default title' }) => (
  <React.Fragment>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    {children}
  </React.Fragment>
)

BaseLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string
}

export default BaseLayout
