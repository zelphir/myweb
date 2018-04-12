import React from 'react'
import { Link } from 'react-router-dom'

const RouterLink = ({ href, children, ...props }) =>
  href.match(/^(https?:)?\/\//) ? (
    <a href={href} target="blank" {...props}>
      {children}
    </a>
  ) : (
    <Link to={href} {...props}>
      {children}
    </Link>
  )

export default RouterLink
