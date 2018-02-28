import React from 'react'
import PropTypes from 'prop-types'

const isProd = !!(process.env.NODE_ENV === 'production')
const mainStyle = require('!raw-loader!./main.css')

let stylesStr

if (isProd) {
  try {
    stylesStr = require('!raw-loader!../public/styles.css')
  } catch (e) {
    console.log(e) // eslint-disable-line
  }
}

class HTML extends React.Component {
  static propTypes = {
    htmlAttributes: PropTypes.array,
    headComponents: PropTypes.array,
    preBodyComponents: PropTypes.array,
    postBodyComponents: PropTypes.array,
    bodyAttributes: PropTypes.array,
    body: PropTypes.string
  }

  render() {
    const {
      htmlAttributes,
      headComponents,
      body,
      bodyAttributes,
      preBodyComponents,
      postBodyComponents
    } = this.props

    return (
      <html {...htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          {headComponents}
          <style dangerouslySetInnerHTML={{ __html: mainStyle }} />
          {isProd && <style dangerouslySetInnerHTML={{ __html: stylesStr }} />}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <div key={'body'} id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}

export default HTML
