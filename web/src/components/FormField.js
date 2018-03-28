import React from 'react'
import PropTypes from 'prop-types'
import { Text, TextArea } from 'react-form'

const FormField = ({ id, placeholder, type }) => {
  const Field = type === 'input' ? Text : TextArea
  return (
    <React.Fragment>
      <label htmlFor={id} style={{ display: 'none' }}>
        {placeholder}
      </label>
      <Field field={id} placeholder={placeholder} />
    </React.Fragment>
  )
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default FormField
