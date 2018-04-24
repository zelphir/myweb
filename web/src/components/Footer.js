import React from 'react'
import styled, { css } from 'react-emotion'
import { sidebarService } from 'react-sidebarjs'
import RouterLink from './RouterLink'
import { mq, sizes } from './common'
import Icon from '../components/Icon'
import { ReactComponent as Twitter } from '../assets/svgs/twitter.svg'
import { ReactComponent as Linkedin } from '../assets/svgs/linkedin.svg'
import { ReactComponent as Github } from '../assets/svgs/github.svg'
import { ReactComponent as Envelope } from '../assets/svgs/envelope.svg'
import { ReactComponent as Instagram } from '../assets/svgs/instagram.svg'

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rmanzella/',
    SocialIcon: Linkedin
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/robertomanzella',
    SocialIcon: Twitter
  },
  {
    name: 'Github',
    href: 'https://github.com/zelphir',
    SocialIcon: Github
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/robimanz/',
    SocialIcon: Instagram
  },
  {
    name: 'Email',
    href: '/contact',
    SocialIcon: Envelope
  }
]

const CopyRight = styled.div`
  margin-top: 10px;
`

const Wrapper = styled.div`
  margin-top: 20px;
  text-align: right;
  padding: 10px ${sizes.sidebar.padding.md}px 15px;

  ${mq.lg(css`
    padding-right: ${sizes.sidebar.padding.lg}px;
  `)};
`

const Footer = () => (
  <Wrapper>
    {socials.map(({ name, href, SocialIcon }) => (
      <RouterLink key={name} href={href} onClick={() => sidebarService.close('sidebar')}>
        <Icon icon={<SocialIcon />} />
      </RouterLink>
    ))}
    <CopyRight>&copy; robertomanzella.com</CopyRight>
  </Wrapper>
)

export default Footer
