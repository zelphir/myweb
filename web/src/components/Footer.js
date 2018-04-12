import React from 'react'
import { sidebarService } from 'react-sidebarjs'
import RouterLink from './RouterLink'
import { ReactComponent as Twitter } from '../assets/svgs/twitter.svg'
import { ReactComponent as Linkedin } from '../assets/svgs/linkedin.svg'
import { ReactComponent as Github } from '../assets/svgs/github.svg'
import { ReactComponent as Envelope } from '../assets/svgs/envelope.svg'
import { ReactComponent as Instagram } from '../assets/svgs/instagram.svg'
import './Footer.css'

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rmanzella/',
    Icon: Linkedin
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/robertomanzella',
    Icon: Twitter
  },
  {
    name: 'Github',
    href: 'https://github.com/zelphir',
    Icon: Github
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/robimanz/',
    Icon: Instagram
  },
  {
    name: 'Email',
    href: '/contact',
    Icon: Envelope
  }
]

class Footer extends React.PureComponent {
  closeMenu = () => {
    sidebarService.close('sidebar')
  }

  render() {
    return (
      <div className="footer">
        <div className="socials">
          {socials.map(({ name, href, Icon }) => (
            <RouterLink
              key={name}
              href={href}
              className="social"
              onClick={this.closeMenu}
            >
              <Icon />
            </RouterLink>
          ))}
        </div>
        <div className="copyright">&copy; robertomanzella.com</div>
      </div>
    )
  }
}

export default Footer
