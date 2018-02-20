import { transformBody } from '../utils'
import { getTags, addPicture } from './graphql'

const instagram = async (req, res) => {
  if (req.get('X-Client-ID') !== process.env.X_CLIENT_ID) return res.sendStatus(403)
  if (!req.body) return res.sendStatus(500)

  try {
    const allTags = await getTags()
    const newPicture = await transformBody(req.body, allTags)
    const { data } = await addPicture(newPicture)

    return res.status(200).send(JSON.stringify(data))
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
}

export default instagram