import React from 'react'
import Svg from 'react-inlinesvg'
import { Link } from 'react-static'
import { sidebarService } from 'react-sidebarjs'

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
  handleClick = e => {
    e.preventDefault()
    return scrollTo(document.getElementById('contact'))
  }

  closeMenu = () => {
    sidebarService.toggle('sidebar')
  }

  renderExternalLink({ name, url, icon }) {
    return (
      <a href={url} key={name} target="blank" className="social">
        <Svg src={icon} />
      </a>
    )
  }

  renderInternalLink({ name, to, icon }) {
    return (
      <Link to={to} key={name} className="social" onClick={this.closeMenu}>
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

export default Footer
