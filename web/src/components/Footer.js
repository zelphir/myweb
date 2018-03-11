import React from 'react'
import Svg from 'react-inlinesvg'

import twitter from '../assets/twitter.svg'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'
import envelope from '../assets/envelope.svg'

import './Footer.scss'

const socials = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/robertomanzella',
    icon: twitter
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rmanzella/',
    icon: linkedin
  },
  {
    name: 'Github',
    url: 'https://github.com/zelphir',
    icon: github
  },
  {
    name: 'Email',
    url: '',
    icon: envelope
  }
]

const Footer = () => (
  <footer>
    <div className="socials">
      {socials.map(({ name, url, icon }) => (
        <a href={url} key={name} target="blank" className="social">
          <Svg src={icon} />
        </a>
      ))}
    </div>
    <div className="copyright">&copy; robertomanzella.com</div>
  </footer>
)

export default Footer
