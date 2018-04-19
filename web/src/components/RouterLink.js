import React from 'react'
import { Link } from 'react-router-dom'

const RouterLink = ({ href, children, className }) =>
  href.match(/^(https?:)?\/\//) ? (
    <a href={href} target="blank" className={className}>
      {children}
    </a>
  ) : (
    <Link to={href} className={className}>
      {children}
    </Link>
  )

export default RouterLink
