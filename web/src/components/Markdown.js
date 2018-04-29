import React from 'react'
import Md from 'react-markdown'
import NavLink from './NavLink'

const Markdown = ({ source, renderers }) => {
  return <Md source={source} renderers={{ root: React.Fragment, link: NavLink, ...renderers }} />
}

Markdown.renderers = Md.renderers

export default Markdown
