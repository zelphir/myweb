import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData } from 'react-static'
import { compose } from 'react-apollo'

import withMatchMedia from '../lib/withMatchMedia'
import renderMarkdown from '../lib/renderMarkdown.js'

import './Page.scss'

const Page = ({ page, isPrint }) => {
  const { partials, slug, title } = page.data
  const className = slug === '/' ? 'home' : slug

  return (
    <div className={className}>
      <h1>{title}</h1>
      {partials &&
        isPrint &&
        partials.map((partial, key) => (
          <React.Fragment key={key}>{renderMarkdown(partial)}</React.Fragment>
        ))}
      {renderMarkdown(page.content)}
    </div>
  )
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
  isPrint: PropTypes.bool.isRequired
}

export default compose(withRouteData, withMatchMedia)(Page)
