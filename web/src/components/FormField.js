import React from 'react'
import PropTypes from 'prop-types'
import { Text, TextArea } from 'react-form'
// import isEmail from 'validator/lib/isEmail'

const FormField = ({ id, placeholder, type }) => {
  const Field = type === 'input' ? Text : TextArea
  // const validate = value =>
  //   id === 'email'
  //     ? !value
  //       ? `${placeholder} is required`
  //       : !isEmail(value) ? 'Please enter a valid email' : null
  //     : !value ? `${placeholder} is required` : null

  // return <Field field={id} placeholder={placeholder} validate={validate} />
  return <Field field={id} placeholder={placeholder} />
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default FormField
