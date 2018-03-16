import cors from 'cors'
import fetch from 'node-fetch'

const allowedOrigins = [
  process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  `https://${process.env.DOMAIN}`
].filter(Boolean)

const corsHandler = cors({
  origin: allowedOrigins,
  methods: 'POST'
})

export const sendgrid = async (req, res) => {
  if (!allowedOrigins.includes(req.get('origin'))) {
    return res.sendStatus(403)
  }

  return corsHandler(req, res, async () => {
    const apiKey = process.env.SENDGRID_API_KEY
    const values = req.body.values
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }

    if (values === undefined) return res.status(400).send('No message defined!')

    const email = JSON.stringify({
      personalizations: [{ to: [{ email: process.env.EMAIL }] }],
      from: { email: values.email, name: values.name },
      reply_to: { email: values.email, name: values.name },
      subject: 'Message from website',
      content: [{ type: 'text/plain', value: values.message }]
    })

    try {
      const { status, statusText } = await fetch(
        'https://api.sendgrid.com/v3/mail/send',
        {
          ...options,
          body: email
        }
      )

      if (status !== 200) return res.status(status).send(statusText)
      return res.sendStatus(200)
    } catch (err) {
      return res.status(500).send(JSON.stringify(err))
    }
  })
}
