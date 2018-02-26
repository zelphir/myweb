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

    console.log('Loading Instagram Feed...') // eslint-disable-line

    const feed = await new Feed.UserMedia(session, accountId).all()

    for (let image of feed) {
      const allTags = await getTags()
      const newPicture = await transformImage(image, allTags)
      const { data } = await addPicture(newPicture)

      if (!data) {
        // eslint-disable-next-line
        return console.error('Something went wrong, remove errorPolicy to see the error')
      }

      if (data && data.createPicture) {
        console.log('Added', data.createPicture.instagramId) // eslint-disable-line
      } else {
        console.warn('Skipped', `${image.getParams().id} already exists`) // eslint-disable-line
      }
    }
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
})()
