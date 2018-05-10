import React from 'react'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light'
import js from 'react-syntax-highlighter/languages/hljs/javascript'
import css from 'react-syntax-highlighter/languages/hljs/css'
import xml from 'react-syntax-highlighter/languages/hljs/xml'
import bash from 'react-syntax-highlighter/languages/hljs/bash'
import dockerfile from 'react-syntax-highlighter/languages/hljs/dockerfile'
import { gruvboxDark } from 'react-syntax-highlighter/styles/hljs'

registerLanguage('javascript', js)
registerLanguage('css', css)
registerLanguage('xml', xml)
registerLanguage('bash', bash)
registerLanguage('dockerfile', dockerfile)

const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter
    language={language || 'javascript'}
    showLineNumbers
    style={gruvboxDark}
    lineNumberStyle={{ color: 'grey' }}
  >
    {value}
  </SyntaxHighlighter>
)

export default CodeBlock
