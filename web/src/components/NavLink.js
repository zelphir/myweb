import React from 'react'
import classNames from 'classnames'
import { Route, NavLink as Link } from 'react-router-dom'

const NavLink = ({ path, exact, reload, ...props }) => (
  <Route
    path={path}
    exact={exact}
    children={({ match }) => {
      return reload ? (
        <a
          href={path}
          reload={true}
          className={classNames({ active: match && match.isExact })}
        >
          {props.title}
        </a>
      ) : (
        <Link to={path} exact>
          {props.title}
        </Link>
      )
    }}
  />
)

export default NavLink
