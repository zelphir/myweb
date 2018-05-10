import React from 'react'
import { css } from 'emotion'
import { ReactComponent as PinSvg } from './svgs/pin.svg'

const Pin = () => (
  <PinSvg
    className={css`
      width: 20px;
      height: 20px;
    `}
  />
)

export default Pin
