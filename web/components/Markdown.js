import React from 'react'
import Md from 'react-markdown'
import styled from 'react-emotion'
import { rgba } from 'polished'
import { colors } from './common'
// import NavLink from './NavLink'
// import CodeBlock from './CodeBlock'

const InlineCode = styled.code`
  background: ${rgba(colors.black, 0.05)};
  color: ${colors.secondary};
  padding: 2px 4px;
`

const Markdown = ({ source, renderers }) => {
  return (
    <Md
      source={source}
      renderers={{
        root: React.Fragment,
        // link: NavLink,
        inlineCode: InlineCode,
        // code: CodeBlock,
        ...renderers
      }}
    />
  )
}

Markdown.renderers = Md.renderers

export default Markdown
