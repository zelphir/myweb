import React from 'react'
import { Link } from 'react-router-dom'

const RouterLink = ({ href, children }) =>
  href.match(/^(https?:)?\/\//) ? (
    <a href={href} target="blank">
      {children}
    </a>
  ) : (
    <Link to={href}>{children}</Link>
  )

export default RouterLink
