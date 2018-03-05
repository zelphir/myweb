// Gets the display name of a JSX component for dev tools

export const getComponentDisplayName = Component =>
  Component.displayName || Component.name || 'Unknown'

export const isDev = process.env.REACT_STATIC_ENV === 'development'
export const isBrowser = typeof document !== 'undefined'
