import React from 'react'
import styled, { css } from 'react-emotion'
import { sidebarService } from 'react-sidebarjs'
import PerfectScrollbar from 'perfect-scrollbar'
import { lighten, darken, rgba } from 'polished'
import { mq, colors, sizes } from '../common'
import { withTheme } from '../../lib/withTheme'
import Stats from './Stats'
import Footer from './Footer'
import Menu from './Menu'
import Info from './Info'
import bgDev from './images/dev-pattern.png'
import bgPhotos from './images/photos-pattern.png'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

const Aside = styled.aside`
  display: none;
  flex-direction: column;
  font-size: 16px;
  height: 100%;
  justify-content: space-between;

  .sidebarjs--left & {
    display: flex;
  }

  ${({ type }) =>
    type === 'photos'
      ? css`
          background-image: url(${bgPhotos}),
            linear-gradient(
              45deg,
              ${lighten(0.2, colors.black)} 10%,
              ${lighten(0.05, colors.black)}
            );
          border-right: 5px solid ${lighten(0.3, colors.black)};
          color: ${rgba(colors.white, 0.6)};
        `
      : css`
          background-image: url(${bgDev}),
            linear-gradient(45deg, ${lighten(0.05, colors.primary)} 10%, ${colors.primary} 100%);
          border-right: 5px solid ${darken(0.05, colors.primary)};
          color: ${rgba(colors.black, 0.6)};
        `};

  ${mq.md(css`
    display: flex;
    width: ${sizes.sidebar.width.md}px;
    position: fixed;
  `)};

  ${mq.lg(css`
    width: ${sizes.sidebar.width.lg}px;
  `)};
`

class SidebarContent extends React.PureComponent {
  closeMenu = () => {
    sidebarService.close('sidebar')
  }

  applyScrollbar() {
    this.ps = new PerfectScrollbar('#sidebar', {
      suppressScrollX: true
    })
  }

  componentDidUpdate() {
    this.ps.destroy()
    this.applyScrollbar()
  }

  componentDidMount() {
    this.applyScrollbar()
  }

  componentWillUnmount() {
    this.ps.destroy()
    this.ps = null
  }

  render() {
    const { theme } = this.props
    const isPhoto = theme === 'photos'

    return (
      <Aside id="sidebar" type={theme}>
        <div>
          <Info isPhoto={isPhoto} />
          <Menu type={theme} closeMenu={this.closeMenu} />
        </div>
        <div>
          {!isPhoto && <Stats />}
          <Footer />
        </div>
      </Aside>
    )
  }
}

export default withTheme(SidebarContent)
