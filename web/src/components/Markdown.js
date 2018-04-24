import React from 'react'
import Md from 'react-markdown'

const Markdown = ({ source, renderers }) => {
  return <Md source={source} renderers={{ root: React.Fragment, ...renderers }} />
}

Markdown.renderers = Md.renderers

export default Markdown
