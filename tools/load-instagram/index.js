import { V1 as Client } from 'instagram-private-api'
import { getTags, addPicture } from 'shared/apollo'
import { transformImage } from 'shared/helpers'

const { Feed, Session, Device, CookieMemoryStorage } = Client
const device = new Device('nodeServer')
const storage = new CookieMemoryStorage()
const instaUser = process.env.INSTAGRAM_USER
const instaPass = process.env.INSTAGRAM_PASSWORD

// Fetch Instagram feed and save images/tags to graphql
;(async () => {
  try {
    const session = await Session.create(device, storage, instaUser, instaPass)
    const accountId = await session.getAccountId()

    console.log('Loading Instagram Feed...')

    const feed = await new Feed.UserMedia(session, accountId).all()

    for (let image of feed) {
      const allTags = await getTags()
      const newPicture = await transformImage(image, allTags)
      const { data: { createPicture } } = await addPicture(newPicture)
      if (createPicture) {
        console.log('Added', createPicture.instagramId)
      } else {
        console.warn('Skipped', `${image.getParams().id} already exists`)
      }
    }
  } catch (err) {
    console.error(err)
  }
})()
