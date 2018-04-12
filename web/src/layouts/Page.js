import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classNames from 'classnames/dedupe'
import { matchPath } from 'react-router-dom'
import { ReactComponent as PdfIcon } from '../assets/svgs/pdf.svg'
import { withMql } from '../lib/withMql'
import renderMarkdown from '../lib/renderMarkdown.js'
import './Page.css'

class Page extends React.PureComponent {
  static propTypes = {
    isPrint: PropTypes.bool
  }

  renderPdf() {
    return (
      <a href="/resume.pdf" target="blank" className="icon">
        <PdfIcon />
      </a>
    )
  }

  renderPartials() {
    const { isPrint, data } = this.props

    return Object.entries(data.partials)
      .filter(partial => !!partial[1].printOnly === isPrint)
      .map(([id, data]) => (
        <React.Fragment key={id}>{renderMarkdown(data.content)}</React.Fragment>
      ))
  }

  isMatch(path) {
    return matchPath(this.props.location.pathname, {
      path,
      exact: true
    })
  }

  customH6() {
    return this.props.isPrint
      ? {}
      : {
          h6: ({ children }) => {
            return (
              <h6 className="tags">
                {children[0]
                  .split(/,\s?/)
                  .map(tag => <span key={tag}>{tag}</span>)}
              </h6>
            )
          }
        }
  }

  render() {
    const { isPrint, data } = this.props

    return (
      <React.Fragment>
        <Helmet>
          <title>{data.title}</title>
        </Helmet>
        <main
          id={this.isMatch('/') ? 'home' : data.id}
          className={classNames({
            'no-print': this.isMatch('/resume') && !isPrint
          })}
        >
          {this.isMatch('/resume') ? (
            <header>
              <h1>{data.title}</h1>
              {!isPrint && this.renderPdf()}
            </header>
          ) : (
            <h1>{data.title}</h1>
          )}
          {data.partials && this.renderPartials()}
          {renderMarkdown(data.content, this.customH6)}
        </main>
      </React.Fragment>
    )
  }
}

export default withMql(Page)
