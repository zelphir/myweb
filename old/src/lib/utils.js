export const isDev = process.env.REACT_STATIC_ENV === 'development'
export const isBrowser = typeof document !== 'undefined'
export const getComponentDisplayName = Component =>
  Component.displayName || Component.name || 'Unknown'
