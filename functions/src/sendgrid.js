import cors from 'cors'

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

  corsHandler(req, res, () => {
    res.sendStatus(200)
  })
  // const origin = req.get('origin') || req.get('host')
  // console.log(req.get('origin'), req.get('host'))
  // if (allowedOrigins.indexOf(origin) > -1) {
  //   res.setHeader('Access-Control-Allow-Origin', origin)
  //   res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  //   return res.sendStatus(200)
  // }
  // return res.sendStatus(403)
  // if (req.get('X-Client-ID') !== xClientID) return res.sendStatus(403)
  // if (!req.body) return res.sendStatus(500)
  // try {
  //   return res.status(200).send(JSON.stringify('data'))
  // } catch (err) {
  //   console.error(err) // eslint-disable-line
  //   return res.sendStatus(500)
  // }
}
