import React from 'react'
import { Route, Link } from 'react-router-dom'
import { withSW } from '../lib/withSW'

const RouterLink = ({ href, children, newContent }) =>
  href.match(/^(https?:)?\/\//) ? (
    <a href={href} target="blank">
      {children}
    </a>
  ) : (
    <Route
      path={href}
      children={() =>
        newContent ? (
          <a href={href} reload={true}>
            {children}
          </a>
        ) : (
          <Link to={href}>{children}</Link>
        )
      }
    />
  )

export default withSW(RouterLink)
