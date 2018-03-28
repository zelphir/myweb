import React from 'react'
import { TypographyStyle, GoogleFont } from 'react-typography'

import typography from './typography'

// eslint-disable-next-line
const Document = ({ Html, Head, Body, children, siteData, renderMeta }) => (
  <Html lang="en-GB">
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Roberto Manzella: Full Stack developer in London, GB"
      />
      <meta name="theme-color" content="#e6e600" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <title>{siteData.title}</title>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
    </Head>
    <Body>{children}</Body>
  </Html>
)

export default Document
