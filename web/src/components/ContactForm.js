import React from 'react'
import { Form } from 'react-form'
import isEmail from 'validator/lib/isEmail'
import classNames from 'classnames/dedupe'

// import sendgrid from '../lib/sendgrid'
import FormField from './FormField'

import './ContactForm.scss'

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

  // onSubmit = async (values, _, formApi) => {
  //   this.setState({ isSending: true })
  //   const res = await sendgrid(values)
  //   const { status, statusText } = await res.json()
  //   this.setState({ status: status === 202 ? 'ok' : 'error', statusText })
  //   this.setState({ isSending: false })
  //   formApi.resetAll()
  // }

  validations({ name, email, message }) {
    const isValidEmail = !email
      ? 'Email is required'
      : !isEmail(email) ? 'Please enter a valid email' : null

    return {
      name: !name ? 'Name is required' : null,
      email: isValidEmail,
      message: !message ? 'Message is required' : null
    }
  }

  render() {
    const { isSending, status, statusText } = this.state
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validations}
        render={({ submitForm, errors, touched, values }) => (
          <form onSubmit={submitForm} id="contact">
            {fields.map(field => {
              const isError = errors && touched[field.id] && errors[field.id]
              const fieldClass = classNames('form-field', field.type, {
                error: isError,
                dirty: values[field.id]
              })

              return (
                <div className={fieldClass} key={field.id}>
                  <FormField {...field} />
                  <div className="error-message">
                    {isError && errors[field.id]}
                  </div>
                </div>
              )
            })}
            <div className="form-field button">
              <button
                type="submit"
                disabled={isSending}
                className={isSending ? 'loading' : status}
                data-status={statusText}
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        )}
      />
    )
  }
}

export default ContactForm
