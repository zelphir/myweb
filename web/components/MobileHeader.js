import React from 'react'
import { rgba, lighten } from 'polished'
import styled, { css } from 'react-emotion'
import { sidebarService } from 'react-sidebarjs'
import { withRouter } from 'react-router-dom'
import { mq, colors } from './common'
import { ReactComponent as Menu } from './svgs/menu.svg'

const Wrapper = styled.div`
  align-items: center;
  box-shadow: 0 0 10px 2px ${rgba(colors.black, 0.2)};
  display: flex;
  height: 60px;
  justify-content: center;
  left: 0;
  padding: 5px 30px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  ${({ type }) =>
    type === 'photos'
      ? css`
          background: ${rgba(lighten(0.3, colors.black), 0.95)};
          color: ${rgba(colors.white, 0.6)};
        `
      : css`
          background: ${rgba(colors.white, 0.95)};
        `};

  ${mq.md(
    css`
      display: none;
    `
  )};
`

const ToggleMenu = styled.span`
  height: 30px;
  left: 30px;
  position: absolute;
  width: 30px;

  svg {
    fill: ${colors.primary};
    height: 30px;
    width: 30px;
  }
`

class MobileHeader extends React.PureComponent {
  handleOnClick = e => {
    e.preventDefault()
    sidebarService.toggle('sidebar')
  }

  render() {
    const {
      location: { pathname }
    } = this.props
    const type = pathname.includes('/photo') ? 'photos' : 'dev'

    return (
      <Wrapper type={type}>
        <ToggleMenu onClick={this.handleOnClick}>
          <Menu />
        </ToggleMenu>
        <span>{process.env.REACT_APP_DOMAIN}</span>
      </Wrapper>
    )
  }
}

export default withRouter(MobileHeader)
