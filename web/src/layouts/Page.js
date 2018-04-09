import React from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames/dedupe'
// import Svg from 'react-inlinesvg'

// import pdf from '../assets/svgs/pdf.svg'
import { withMql } from '../lib/withMql'
// import renderMarkdown from '../lib/renderMarkdown.js'

// import './Page.scss'

class Page extends React.PureComponent {
  static propTypes = {
    isPrint: PropTypes.bool
  }

  // renderPdf() {
  //   return (
  //     <a href="/resume.pdf" target="blank" className="icon">
  //       <Svg src={pdf} />
  //     </a>
  //   )
  // }

  // renderPartials(isPrint) {
  //   return this.props.page.data.partials
  //     .filter(partial => !!partial.printOnly === isPrint)
  //     .map(({ file, content }) => (
  //       <React.Fragment key={file}>{renderMarkdown(content)}</React.Fragment>
  //     ))
  // }

  // isResumePage(slug) {
  //   return slug === 'resume'
  // }

  // customH6(isPrint) {
  //   return isPrint
  //     ? {}
  //     : {
  //         h6: ({ children }) => {
  //           return (
  //             <h6 className="tags">
  //               {children[0]
  //                 .split(/,\s?/)
  //                 .map(tag => <span key={tag}>{tag}</span>)}
  //             </h6>
  //           )
  //         }
  //       }
  // }

  render() {
    // const { page, isPrint } = this.props
    // const { partials, slug, title } = page.data

    return <main>page</main>
    // return (
    //   <main
    //     id={slug === '/' ? 'home' : slug}
    //     className={classNames({
    //       'no-print': this.isResumePage(slug) && !isPrint
    //     })}
    //   >
    //     {this.isResumePage(slug) ? (
    //       <header>
    //         <h1>{title}</h1>
    //         {!isPrint && this.renderPdf()}
    //       </header>
    //     ) : (
    //       <h1>{title}</h1>
    //     )}
    //     {partials && this.renderPartials(isPrint)}
    //     {renderMarkdown(page.content, this.customH6(isPrint))}
    //   </main>
    // )
  }
}

export default withMql(Page)
