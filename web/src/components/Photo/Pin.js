import React from 'react'
import { ReactComponent as PinSvg } from '../../assets/svgs/pin.svg'

const size = 20
const style = {
  width: size,
  height: size,
  transform: `translate(${-size / 2}px, ${-size}px)`
}

const Pin = () => <PinSvg style={style} />

export default Pin
