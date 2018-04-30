import React from 'react'
import { matchPath } from 'react-router-dom'
import { withMql } from '../lib/withMql'
import Main from '../components/Main'
import Markdown from '../components/Markdown'
import Resume from '../components/Resume'
import Seo from '../components/Seo'
import ContactForm from '../components/ContactForm'

class Page extends React.PureComponent {
  renderPartials() {
    const { isPrint, data } = this.props

    return Object.entries(data.partials)
      .filter(partial => !!partial[1].printOnly === isPrint)
      .map(([id, data]) => <Markdown key={id} source={data.content} />)
  }

  isMatch(path) {
    return matchPath(this.props.location.pathname, {
      path,
      exact: true
    })
  }

  render() {
    const { isPrint, data } = this.props

    return (
      <React.Fragment>
        <Seo {...data} />
        {this.isMatch('/resume') ? (
          <Resume isPrint={isPrint} data={data}>
            {data.partials && this.renderPartials()}
          </Resume>
        ) : (
          <Main id={this.isMatch('/resume') && data.id}>
            <h1>{data.title}</h1>
            {data.partials && this.renderPartials()}
            <Markdown source={data.content} />
            {data.contact && <ContactForm />}
          </Main>
        )}
      </React.Fragment>
    )
  }
}

export default withMql(Page)
