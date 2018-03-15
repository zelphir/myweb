const sendgrid = async (req, res) => {
  const xClientID = process.env.X_CLIENT_ID

  if (req.get('X-Client-ID') !== xClientID) return res.sendStatus(403)
  if (!req.body) return res.sendStatus(500)

  try {
    return res.status(200).send(JSON.stringify('data'))
  } catch (err) {
    console.error(err) // eslint-disable-line
    return res.sendStatus(500)
  }
}

export default sendgrid
