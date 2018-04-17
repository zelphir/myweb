const generateThumbnail = ({ width: w, height: h, url }) => {
  const isSquare = w === h
  const isPortrait = w < h

  if (isSquare) return url.replace('vp/', `s320x320/vp/`)

  const crop = isPortrait
    ? `c0.${parseInt((h - w) / 2)}.${w}.${w}`
    : `c${parseInt((w - h) / 2)}.0.${h}.${h}`

  return url.replace('vp/', `s320x320/${crop}/vp/`)
}

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

const getRatio = ({ width, height }) => {
  switch (true) {
    case width > height:
      return 'landscape'
    case width < height:
      return 'portrait'
    case width === height:
    default:
      return 'square'
  }
}

// For the new posted media
const generateCarousel = carousel =>
  carousel ? carousel.split(',').map(url => url.replace('s640x640', '')) : []

export const transformBody = (
  { tags, imageUrl, caption, date, lat, lng, carousel, ...body },
  allTags
) => ({
  ...body,
  ...generateTags(allTags, tags.split(',')),
  imageUrl: imageUrl.replace('s640x640', ''),
  ratio: getRatio({ width: body.width, height: body.height }),
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
      ratio: getRatio(mainImage[0]),
      width: mainImage[0].width,
      height: mainImage[0].height,
      thumbnailUrl: generateThumbnail(mainImage[0]),
      carousel: images.slice(1).map(image => image[0].url)
    }
  }

  return {
    imageUrl: mainImage.url,
    ratio: getRatio(mainImage),
    width: mainImage.width,
    height: mainImage.height,
    thumbnailUrl: generateThumbnail(mainImage),
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
