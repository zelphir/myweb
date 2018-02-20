export const generateUrl = url => ({
  imageUrl: url.replace('vp/', '').replace('s640x640', ''),
  thumbnailUrl: url.replace('vp/', '').replace('s640x640', 's320x320/c180.0.720.720')
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

export const transformBody = ({ tags, imageUrl, caption, date, ...body }, allTags) => ({
  ...body,
  ...generateTags(allTags, tags.split(',')),
  ...generateUrl(imageUrl),
  date: new Date(date * 1000).toISOString(),
  caption: caption.replace(/\s?#\w+/g, '')
})
