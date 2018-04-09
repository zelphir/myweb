import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'

const RouterLink = ({ href, children }) =>
  href.match(/^(https?:)?\/\//) ? (
    <a href={href} target="blank">
      {children}
    </a>
  ) : (
    <Link to={href}>{children}</Link>
  )

RouterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
}

export default RouterLink
