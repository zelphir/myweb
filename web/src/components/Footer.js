import React from 'react'
import PropTypes from 'prop-types'
import { scrollTo, Link, withRouter } from 'react-static'
import Svg from 'react-inlinesvg'

import twitter from '../assets/icons/twitter.svg'
import linkedin from '../assets/icons/linkedin.svg'
import github from '../assets/icons/github.svg'
import envelope from '../assets/icons/envelope.svg'
import instagram from '../assets/icons/instagram.svg'

import './Footer.scss'

const socials = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rmanzella/',
    icon: linkedin
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/robertomanzella',
    icon: twitter
  },
  {
    name: 'Github',
    url: 'https://github.com/zelphir',
    icon: github
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/robimanz/',
    icon: instagram
  },
  {
    name: 'Email',
    to: '/contact',
    icon: envelope
  }
]

class Footer extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  handleClick = e => {
    e.preventDefault()

    const element = document.getElementById('contact')

    return scrollTo(element)
  }

  renderExternalLink({ name, url, icon }) {
    return (
      <a href={url} key={name} target="blank" className="social">
        <Svg src={icon} />
      </a>
    )
  }

  renderInternalLink({ name, to, icon }) {
    return this.props.match.isExact ? (
      <a
        href="/contact"
        onClick={this.handleClick}
        className="social"
        key={name}
      >
        <Svg src={icon} />
      </a>
    ) : (
      <Link to={to} key={name} className="social">
        <Svg src={icon} />
      </Link>
    )
  }

  render() {
    return (
      <div id="footer">
        <div className="socials">
          {socials.map(
            social =>
              social.url
                ? this.renderExternalLink(social)
                : this.renderInternalLink(social)
          )}
        </div>
        <div className="copyright">&copy; robertomanzella.com</div>
      </div>
    )
  }
}

export default withRouter(Footer)
