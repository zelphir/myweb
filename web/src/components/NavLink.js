import React from 'react'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'

const NavLink = ({ path, exact, reload, ...props }) => (
  <Route
    path={path}
    exact={exact}
    children={({ match }) => (
      <NavLinkStyle active={match}>
        {reload ? (
          <a href={path} reload={true}>
            {props.title}
          </a>
        ) : (
          <Link to={path}>{props.title}</Link>
        )}
      </NavLinkStyle>
    )}
  />
)

export default NavLink

const NavLinkStyle = styled.div`
  a {
    transition: color 0.2s, border-bottom-color 0.2s;
    color: ${props => (props.active ? '#0000ff' : '#666')};
    text-decoration: none;
    border-bottom: 2px solid;
    border-bottom-color: ${props =>
      props.active ? 'rgba(0, 0, 255, 0.1)' : 'transparent'};
    &:hover,
    &:active,
    &:focus {
      color: ${props => (props.active ? '#0000ff' : '#222')};
    }
  }
`
