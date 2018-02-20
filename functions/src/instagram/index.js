import * as functions from 'firebase-functions'

const isDev = process.env.NODE_ENV === 'development'

const generateUrl = (url, type) =>
  type === 'thumb'
    ? url.replace('vp/', '').replace('s640x640', 's320x320/c180.0.720.720')
    : url.replace('vp/', '').replace('s640x640', '')

const transform = ({ tags, imageUrl, caption, ...body }) => {
  return {
    ...body,
    tags: tags.split(','),
    imageUrl: generateUrl(imageUrl),
    thumbnailUrl: generateUrl(imageUrl, 'thumb'),
    caption: caption.replace(/\s?#\w+/g, '')
  }
}

const instagram = (req, res) => {
  const xClientID = isDev ? process.env.X_CLIENT_ID : functions.config().instagram.xclientid

  if (req.get('X-Client-ID') !== xClientID) {
    return res.sendStatus(403)
  }

  if (!req.body) return res.status(200).end()

  console.log(transform(req.body))
  res.status(200).end()
}

export default instagram
