import { V1 as Client } from 'instagram-private-api'
import { getTags, addPicture } from 'shared/apollo'
import { transformImage } from 'shared/helpers'

const { Feed, Session, Device, CookieMemoryStorage } = Client
const device = new Device('nodeServer')
const storage = new CookieMemoryStorage()
const instaUser = process.env.INSTAGRAM_USER
const instaPass = process.env.INSTAGRAM_PASSWORD

// const wait = ms => new Promise((r, j) => setTimeout(r, ms))

const load = async image => {
  const allTags = await getTags()
  console.log('allTags => ', allTags)
  const newPicture = await transformImage(image, allTags)
  const { data } = await addPicture(newPicture)
  // await wait(5000)
  console.warn('done', data.id, newPicture.tags, newPicture.tagsIds)
  return data
}

const start = async () => {
  try {
    const session = await Session.create(device, storage, instaUser, instaPass)
    const accountId = await session.getAccountId()
    const feed = await new Feed.UserMedia(session, accountId).get()

    return Promise.all(feed.slice(0, 2).map(load))
  } catch (err) {
    console.error(err)
  }
}

start()
