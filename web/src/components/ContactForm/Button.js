import React from 'react'
import { ButtonWrapper } from './elements'

const Button = ({ isSending, status, statusText }) => {
  return (
    <ButtonWrapper status={isSending ? 'loading' : status}>
      <button type="submit" disabled={isSending} data-status={statusText}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </ButtonWrapper>
  )
}

export default Button
