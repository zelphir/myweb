export const isDev = process.env.NODE_ENV === 'development'

export const getComponentDisplayName = Component =>
  Component.displayName || Component.name || 'Unknown'

export const getDescription = data => {
  const description =
    data.partials && data.partials.cover
      ? data.partials.cover.content
      : data.excerpt || data.content

  return description
    .split('\n')
    .slice(0, 3)
    .join(' ')
}
