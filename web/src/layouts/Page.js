import React from 'react'
import PropTypes from 'prop-types'
import { withRouteData } from 'react-static'
import classNames from 'classnames/dedupe'

import { Ctx } from '../lib/contexts'
import renderMarkdown from '../lib/renderMarkdown.js'
import PrintPdf from '../components/PrintPdf'

import './Page.scss'

const Page = ({ page }) => {
  const { partials, slug, title } = page.data

  return (
    <Ctx.Consumer>
      {({ isPrint }) => (
        <main
          className={classNames(slug === '/' ? 'home' : slug, {
            'no-print': !isPrint
          })}
        >
          <h1>{title}</h1>
          {slug === 'resume' && <PrintPdf />}
          {partials &&
            partials
              .filter(partial => !!partial.printOnly === isPrint)
              .map(({ file, content }) => (
                <React.Fragment key={file}>
                  {renderMarkdown(content)}
                </React.Fragment>
              ))}
          {renderMarkdown(page.content)}
        </main>
      )}
    </Ctx.Consumer>
  )
}

Page.propTypes = {
  page: PropTypes.object.isRequired
}

export default withRouteData(Page)
