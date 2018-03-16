import React from 'react'
import { Form } from 'react-form'

import sendgrid from '../lib/sendgrid'
import FormField from './FormField'

import './Contact.scss'

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

class Contact extends React.PureComponent {
  state = {
    isSending: false
  }

  onSubmit = async values => {
    this.setState({ isSending: true })
    await sendgrid(values)
    this.setState({ isSending: false })
  }

  validations({ name, email, message }) {
    // const validate = value =>
    //   id === 'email'
    //     ? !value
    //       ? `${placeholder} is required`
    //       : !isEmail(value) ? 'Please enter a valid email' : null
    //     : !value ? `${placeholder} is required` : null
    return {
      name: !name ? 'name required' : null,
      email: !email ? 'email required' : null,
      message: !message ? 'message required' : null
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validations}
        render={({ submitForm, errors, touched }) => (
          <form onSubmit={submitForm} id="contact">
            {fields.map(field => {
              const isError = touched[field.id] && (errors && errors[field.id])
              const fieldClass = ['form-field', field.type, isError && 'error']
                .filter(Boolean)
                .join(' ')

              return (
                <div className={fieldClass} key={field.id}>
                  <FormField {...field} />
                  {isError && (
                    <span className="error-message">{errors[field.id]}</span>
                  )}
                </div>
              )
            })}

            <div className="form-field">
              <button type="submit" disabled={this.state.isSending}>
                Send
              </button>
            </div>
          </form>
        )}
      />
    )
  }
}

export default Contact
