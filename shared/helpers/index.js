const thumbnail = 's240x240/c180.0.720.720'

const generateTags = (allTags, newTags) => {
  const tags = []
  const tagsIds = []

  newTags.map(tag => {
    const existingTag = allTags.find(({ name }) => name === tag)
    return existingTag ? tagsIds.push(existingTag.id) : tags.push({ name: tag })
  })

  return {
    ...(tags.length && { tags }),
    ...(tagsIds.length && { tagsIds })
  }
}

// For the new posted media
const generateUrl = url => ({
  imageUrl: url.replace('vp/', '').replace('s640x640', ''),
  thumbnailUrl: url.replace('vp/', '').replace('s640x640', thumbnail)
})

const generateCarousel = carousel =>
  carousel
    ? carousel
        .split(',')
        .map(url => url.replace('vp/', '').replace('s640x640', ''))
    : []

export const transformBody = (
  { tags, imageUrl, caption, date, lat, lng, carousel, ...body },
  allTags
) => ({
  ...body,
  ...generateTags(allTags, tags.split(',')),
  ...generateUrl(imageUrl),
  carousel: generateCarousel(carousel),
  lat: lat && parseFloat(lat),
  lng: lng && parseFloat(lng),
  date: new Date(date * 1000).toISOString(),
  caption: caption.replace(/\s?#\w+/g, '')
})

// For the instagram-private-api
const generateLoadUrl = images => {
  const mainImage = images[0]

  if (Array.isArray(mainImage)) {
    return {
      imageUrl: mainImage[0].url,
      thumbnailUrl: mainImage[0].url.replace('vp/', thumbnail),
      carousel: images.slice(1).map(image => image[0].url)
    }
  }

  return {
    imageUrl: mainImage.url,
    thumbnailUrl: mainImage.url.replace('vp/', thumbnail),
    carousel: []
  }
}

export const transformImage = (image, allTags) => {
  const { caption, webLink, location, takenAt, images, id } = image.getParams()
  return {
    ...generateLoadUrl(images),
    ...generateTags(
      allTags,
      caption.match(/#\w+/g).map(tag => tag.replace('#', ''))
    ),
    link: webLink,
    location: location.name,
    lat: location.lat,
    lng: location.lng,
    date: new Date(takenAt).toISOString(),
    instagramId: id,
    caption: caption.replace(/\s?#\w+/g, '')
  }
}
