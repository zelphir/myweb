import React from 'react'
import { Route, Link } from 'react-router-dom'
import { withSW } from '../lib/withSW'

const normalizePath = path => (path.endsWith('/') ? path : `${path}/`)
const isString = path => typeof path === 'string'

const NavLink = ({ to, href, children, newContent, closeMenu, className }) => {
  const path = href || to
  const normalizedPath = isString(path)
    ? normalizePath(path)
    : { ...path, pathname: normalizePath(path.pathname) }
  const staticPath = isString(normalizedPath) ? normalizedPath : normalizedPath.pathname

  return isString(path) && normalizedPath.match(/^(https?:)?\/\//) ? (
    <a href={path} target="_blank" className={className}>
      {children}
    </a>
  ) : (
    <Route
      path={staticPath}
      children={() =>
        newContent && !staticPath.startsWith('/photo/') ? (
          <a className={className} href={staticPath} reload={true}>
            {children}
          </a>
        ) : (
          <Link to={normalizedPath} onClick={closeMenu} className={className}>
            {children}
          </Link>
        )
      }
    />
  )
}

export default withSW(NavLink)
