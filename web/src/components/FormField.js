import React from 'react'
import PropTypes from 'prop-types'
import { Text, TextArea } from 'react-form'

const FormField = ({ id, placeholder, type }) => {
  const Field = type === 'input' ? Text : TextArea
  return <Field field={id} placeholder={placeholder} />
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default FormField
