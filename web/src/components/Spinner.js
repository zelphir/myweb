import React from 'react'
import classNames from 'classnames'
import { ReactComponent as Loading } from '../assets/svgs/loading.svg'
import './Spinner.css'

const Spinner = ({ light, fluid }) => (
  <div className={classNames('spinner', { light, fluid })}>
    <Loading />
  </div>
)

export default Spinner
