import React from 'react'
import { Text, TextArea } from 'react-form'

const FormField = ({ id, placeholder, type }) => {
  const Field = type === 'input' ? Text : TextArea
  return (
    <React.Fragment>
      <Field field={id} name={id} />
      <label htmlFor={id}>{placeholder}</label>
    </React.Fragment>
  )
}

export default FormField
