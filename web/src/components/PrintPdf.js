import React from 'react'
import Svg from 'react-inlinesvg'

import pdf from '../assets/icons/pdf.svg'
import print from '../assets/icons/print.svg'

class PrintPdf extends React.PureComponent {
  handleOnClick = e => {
    e.preventDefault()
    window.print()
  }

  render() {
    return (
      <div className="pdf-print">
        <a href="/resume.pdf" target="blank" className="icon">
          <Svg src={pdf} />
        </a>
        <a href="" onClick={this.handleOnClick} className="icon">
          <Svg src={print} />
        </a>
      </div>
    )
  }
}

export default PrintPdf
