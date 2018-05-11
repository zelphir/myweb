import React from 'react'
import { Form } from 'react-form'
import isEmail from 'validator/lib/isEmail'
import sendgrid from '../../lib/sendgrid'
import FormField from './FormField'
import Button from './Button'
import { FormWrapper, ErrorMessage } from './elements'

const fields = [
  {
    id: 'name',
    placeholder: 'Name',
    type: 'input'
  },
  {
    id: 'email',
    placeholder: 'Email',
    type: 'input'
  },
  {
    id: 'message',
    placeholder: 'Message',
    type: 'textarea'
  }
]

class ContactForm extends React.PureComponent {
  state = {
    isSending: false,
    status: undefined,
    statusText: undefined
  }

  // eslint-disable-next-line
  onSubmit = async (values, _, formApi) => {
    try {
      this.setState({ isSending: true })
      const res = await sendgrid(values)
      const { status, statusText } = await res.json()
      this.setState({
        status: status === 202 ? 'ok' : 'error',
        statusText,
        isSending: false
      })
      formApi.resetAll()
    } catch (err) {
      this.setState({
        status: 'error',
        statusText: err.message,
        isSending: false
      })
    }
  }

  validations({ name, email, message }) {
    const isValidEmail = !email
      ? 'Email is required'
      : !isEmail(email)
        ? 'Please enter a valid email'
        : null

    return {
      name: !name ? 'Name is required' : null,
      email: isValidEmail,
      message: !message ? 'Message is required' : null
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validations}
        render={({ submitForm, errors, touched, values }) => (
          <FormWrapper onSubmit={submitForm} id="contact-form">
            {fields.map(field => {
              const isError = errors && touched[field.id] && errors[field.id]

              return (
                <FormField
                  {...field}
                  key={field.id}
                  type={field.type}
                  isError={!!isError}
                  isDirty={!!values[field.id]}
                >
                  <ErrorMessage>{isError && errors[field.id]}</ErrorMessage>
                </FormField>
              )
            })}
            <Button {...this.state} />
          </FormWrapper>
        )}
      />
    )
  }
}

export default ContactForm
