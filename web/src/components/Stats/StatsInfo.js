import React from 'react'
import styled, { css } from 'react-emotion'
import { mq, sizes } from '../common'

const Info = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.6);
  cursor: default;
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  width: ${sizes.sidebar.padding.md}px;

  ${mq.lg(css`
    font-size: 14px;
    width: ${sizes.sidebar.padding.lg}px;
  `)};
`

const Label = styled.span`
  display: block;
  height: ${sizes.sidebar.padding.md}px;
  line-height: ${sizes.sidebar.padding.md}px;
  text-align: center;
  transform-origin: top left;
  transform: rotate(90deg) translate(0, -100%);
  white-space: nowrap;
  width: 165px;

  ${mq.lg(css`
    height: ${sizes.sidebar.padding.lg}px;
    line-height: ${sizes.sidebar.padding.lg}px;
  `)};
`

const StatsInfo = () => (
  <Info>
    <Label>Live coding stats</Label>
  </Info>
)

export default StatsInfo
