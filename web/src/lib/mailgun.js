import fetch from 'node-fetch'

const apiKey =
  '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'

const options = {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
}

const body = JSON.stringify({
  personalizations: [{ to: [{ email: 'zelphir@gmail.com' }] }],
  from: { email: 'example@example.com' },
  subject: 'Hello, World!',
  content: [{ type: 'text/plain', value: 'Heya!' }]
})

const mailgun = () => {
  return fetch('http://localhost:8010/myweb-195810/us-central1/sendgrid', {
    ...options,
    body
  })
}

export default mailgun
