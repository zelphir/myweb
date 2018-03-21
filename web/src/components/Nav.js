import React from 'react'
import { Link } from 'react-static'

import './Nav.scss'

const Nav = () => (
  <div className="menu">
    <Link to="/">Home</Link>
    <Link to="/resume">Resume</Link>
    <Link to="/about">About</Link>
    <Link to="/blog">Blog</Link>
  </div>
)

export default Nav
