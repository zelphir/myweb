import React from 'react'
import styled from 'react-emotion'

const d = new Date()
const dayOfWeek = d.getDay()
const hour = d.getHours()
const isMonFri = dayOfWeek > 0 && dayOfWeek < 6
const isFromTo = (from, to) => hour > from && hour < to
const renderWhatDoing = () => {
  switch (true) {
    case isFromTo(0, 9):
      return 'Probably sleeping...'
    case isMonFri && isFromTo(18, 20):
      return 'Probably training...'
    case isFromTo(20, 22):
      return 'Probably eating...'
    default:
      return 'Probably resting...'
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`

const WhatDoing = () => <Wrapper>{renderWhatDoing()}</Wrapper>

export default WhatDoing
