import React from 'react'
import styled, { css } from 'react-emotion'
import { rgba } from 'polished'
import { mq, colors, lineBreak, sidebarPadding } from '../common'
import avatarDev from './images/avatar_dev.jpg'
import avatarPhotos from './images/avatar_photos.jpg'

const Avatar = styled.img`
  border-radius: 50% 5px 5px 50%;
  height: 60px;
  margin-bottom: 0;
  width: 60px;

  ${mq.lg(css`
    height: 100px;
    width: 100px;
  `)};
`

const Name = styled.h3`
  ${lineBreak};
  color: ${({ isPhoto }) => rgba(isPhoto ? colors.white : colors.black, 0.8)};
  font-size: 16px;
  margin: 5px 0;

  ${mq.lg(css`
    font-size: 18px;
  `)};
`

const About = styled.div`
  ${lineBreak};
  font-size: 14px;
  line-height: initial;

  ${mq.lg(css`
    font-size: 14px;
  `)};
`

const Wrapper = styled.div`
  ${sidebarPadding(15)} text-align: right;

  ${mq.lg(css`
    padding-top: 40px;
  `)};
`

const Info = ({ isPhoto }) => (
  <Wrapper>
    <Avatar src={isPhoto ? avatarPhotos : avatarDev} alt="Roberto Manzella" />
    <Name isPhoto={isPhoto}>
      <span>Roberto</span>
      <span>Manzella</span>
    </Name>
    <About>
      <span>Full stack developer</span>
    </About>
  </Wrapper>
)

export default Info
