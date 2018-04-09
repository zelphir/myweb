import { isDev } from './utils'

const url = isDev
  ? `http://localhost:8010/${
      process.env.GOOGLE_PROJECT_ID
    }/us-central1/sendgrid`
  : `https://us-central1-${
      process.env.GOOGLE_PROJECT_ID
    }.cloudfunctions.net/sendgrid`

const sendgrid = values =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values })
  })

export default sendgrid
