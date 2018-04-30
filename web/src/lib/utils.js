export const isDev = process.env.NODE_ENV === 'development'

export const isSnap = navigator.userAgent === 'ReactSnap'

export const getComponentDisplayName = Component =>
  Component.displayName || Component.name || 'Unknown'
