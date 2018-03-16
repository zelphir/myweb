import { transformBody } from 'shared/helpers'
import { getTags, addPicture } from 'shared/apollo'

export const instagram = async (req, res) => {
  const xClientID = process.env.X_CLIENT_ID

  if (req.get('X-Client-ID') !== xClientID) return res.sendStatus(403)
  if (!req.body) return res.sendStatus(500)

  try {
    const allTags = await getTags()
    const newPicture = await transformBody(req.body, allTags)
    console.log(newPicture) // eslint-disable-line
    const { data } = await addPicture(newPicture)

    return res.status(200).send(JSON.stringify(data))
  } catch (err) {
    console.error(err) // eslint-disable-line
    return res.sendStatus(500)
  }
}
