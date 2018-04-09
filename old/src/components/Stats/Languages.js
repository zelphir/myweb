import React from 'react'
import PropTypes from 'prop-types'
import Language from './Language'

const Languages = ({ languages }) => (
  <div className="languages">
    {languages.map(({ key, ...props }) => <Language key={key} {...props} />)}
  </div>
)

Languages.propTypes = {
  languages: PropTypes.array.isRequired
}

export default Languages
