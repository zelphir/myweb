import flattenDeep from 'lodash.flattendeep'

const generateUrl = url => ({
  imageUrl: url.replace('vp/', '').replace('s640x640', ''),
  thumbnailUrl: url.replace('vp/', '').replace('s640x640', 's240x240/c180.0.720.720')
})

const generateLoadUrl = ({ url }) => ({
  imageUrl: url,
  thumbnailUrl: url && url.replace('vp/', 's240x240/c180.0.720.720')
})

export const generateTags = (allTags, newTags) => {
  const tags = []
  const tagsIds = []

  newTags.map(tag => {
    const existingTag = allTags.find(({ name }) => name === tag)

    if (existingTag) return tagsIds.push(existingTag.id)

    return tags.push({ name: tag })
  })

  return {
    ...(tags.length && { tags }),
    ...(tagsIds.length && { tagsIds })
  }
}

export const transformBody = ({ tags, imageUrl, caption, date, lat, lng, ...body }, allTags) => ({
  ...body,
  ...generateTags(allTags, tags.split(',')),
  ...generateUrl(imageUrl),
  lat: parseFloat(lat),
  lng: parseFloat(lng),
  date: new Date(date * 1000).toISOString(),
  caption: caption.replace(/\s?#\w+/g, '')
})

export const transformImage = (image, allTags) => {
  const { caption, webLink, location, takenAt, images, id } = image.getParams()
  return {
    ...generateLoadUrl(flattenDeep(images)[0]),
    ...generateTags(allTags, caption.match(/#\w+/g).map(tag => tag.replace('#', ''))),
    link: webLink,
    location: location.name,
    lat: location.lat,
    lng: location.lng,
    date: new Date(takenAt).toISOString(),
    instagramId: id,
    caption: caption.replace(/\s?#\w+/g, '')
  }
}
