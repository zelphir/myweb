import * as functions from 'firebase-functions'

const instagram = (req, res) => {
  if (req.get('X-Client-ID') !== functions.config().instagram.xclientid) {
    return res.sendStatus(403)
  }

  console.log(req.body)
  res.status(200).end()
}

export default instagram
