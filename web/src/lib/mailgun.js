import fetch from 'node-fetch'
import FormData from 'form-data'

const domain = 'sandbox2ca449adf0df487e8978c1b2e0c98600.mailgun.org'
const apiKey = 'key-6bef467422ce1439263923ee37ca92a5'

const options = {
  method: 'POST',
  headers: {
    Authorization: `Basic ${new Buffer(`api:${apiKey}`).toString('base64')}`
  }
}

const mailgun = () => {
  const form = new FormData()

  form.append('from', 'example@robertomanzella.com')
  form.append('to', 'zelphir@gmail.com')
  form.append('subject', 'Test email')
  form.append('text', 'Test email message')

  return fetch(`https://api.mailgun.net/v3/${domain}/message`, {
    ...options,
    body: form
  })
}

export default mailgun
