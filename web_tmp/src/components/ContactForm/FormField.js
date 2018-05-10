import React from 'react'
import { Text, TextArea } from 'react-form'
import { FieldWrapper } from './elements'

const FormField = ({ id, placeholder, type, isDirty, isError, children }) => {
  const Field = type === 'input' ? Text : TextArea

  return (
    <FieldWrapper isError={isError} isDirty={isDirty} type={type}>
      <Field field={id} name={id} />
      <label htmlFor={id}>{placeholder}</label>
      {children}
    </FieldWrapper>
  )
}

export default FormField
