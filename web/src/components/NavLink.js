import React from 'react'
import { Route, Link } from 'react-router-dom'
import { withSW } from '../lib/withSW'

const NavLink = ({ to, href, children, newContent, closeMenu }) => {
  const path = href || to

  return path.match(/^(https?:)?\/\//) ? (
    <a href={path} target="blank">
      {children}
    </a>
  ) : (
    <Route
      path={path}
      children={() =>
        newContent ? (
          <a href={path} reload={true} onClick={closeMenu}>
            {children}
          </a>
        ) : (
          <Link to={path} onClick={closeMenu}>
            {children}
          </Link>
        )
      }
    />
  )
}

export default withSW(NavLink)
