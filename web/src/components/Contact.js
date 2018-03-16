import React from 'react'
import { Form } from 'react-form'

import sendgrid from '../lib/sendgrid'
import FormField from './FormField'

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
    const res = await sendgrid(values)
    this.setState({ isSending: false })
    console.log(res) // eslint-disable-line
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ submitForm, errors }) => (
          <form onSubmit={submitForm} id="contact">
            {fields.map(field => (
              <div className="form-field" key={field.id}>
                <FormField {...field} />
                <span className="error-message">
                  {errors && errors[field.id] ? errors[field.id] : null}
                </span>
              </div>
            ))}
            <button type="submit" disabled={this.state.isSending}>
              Send
            </button>
          </form>
        )}
      />
    )
  }
}

export default Contact
