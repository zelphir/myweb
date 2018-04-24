export const isDev = process.env.NODE_ENV === 'development'

export const getComponentDisplayName = Component =>
  Component.displayName || Component.name || 'Unknown'
