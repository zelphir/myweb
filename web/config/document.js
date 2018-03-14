import React from 'react'
import { TypographyStyle, GoogleFont } from 'react-typography'

import typography from './typography'

// eslint-disable-next-line
const Document = ({ Html, Head, Body, children, siteData, renderMeta }) => (
  <Html lang="en-GB">
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
    </Head>
    <Body>{children}</Body>
  </Html>
)

export default Document
