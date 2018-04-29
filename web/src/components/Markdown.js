import React from 'react'
import Md from 'react-markdown'
import RouterLink from './RouterLink'

const Markdown = ({ source, renderers }) => {
  return <Md source={source} renderers={{ root: React.Fragment, link: RouterLink, ...renderers }} />
}

Markdown.renderers = Md.renderers

export default Markdown
