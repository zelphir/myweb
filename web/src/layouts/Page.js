import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData } from 'react-static'
import { compose } from 'react-apollo'
import classNames from 'classnames/dedupe'

import withMatchMedia from '../lib/withMatchMedia'
import renderMarkdown from '../lib/renderMarkdown.js'

import './Page.scss'

const Page = ({ page, isPrint }) => {
  const { partials, slug, title } = page.data

  return (
    <div
      className={classNames(slug === '/' ? 'home' : slug, {
        'no-print': !isPrint
      })}
    >
      <h1>{title}</h1>
      {partials &&
        partials
          .filter(partial => !!partial.printOnly === isPrint)
          .map(({ file, content }) => (
            <React.Fragment key={file}>
              {renderMarkdown(content)}
            </React.Fragment>
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
