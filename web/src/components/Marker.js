import React from 'react'
import { ReactComponent as Pin } from '../assets/svgs/pin.svg'

const width = 20
const markerStyle = {
  position: 'absolute',
  width: width,
  height: width,
  left: -width / 2,
  top: -width
}

const Marker = () => (
  <div style={markerStyle}>
    <Pin style={{ width }} />
  </div>
)

export default Marker
