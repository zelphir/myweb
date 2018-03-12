import React from 'react'

import avatar from '../assets/images/avatar.jpg'
import './Info.scss'

const Info = () => (
  <div className="info">
    <img src={avatar} className="avatar" />
    <h3 className="name">Roberto Manzella</h3>
    <span className="about">FullStack developer, passionate photographer.</span>
  </div>
)

export default Info
