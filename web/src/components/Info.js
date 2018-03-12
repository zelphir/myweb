import React from 'react'

import avatar from '../assets/images/avatar.jpg'
import './Info.scss'

const Info = () => (
  <div className="info">
    <img src={avatar} className="avatar" />
    <h3 className="name">
      <span>Roberto</span>
      <span>Manzella</span>
    </h3>
    <div className="about">
      <span>Full stack developer,</span>
      <span>passionate photographer.</span>
    </div>
  </div>
)

export default Info
