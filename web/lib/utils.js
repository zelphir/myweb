// Gets the display name of a JSX component for dev tools
export const getComponentDisplayName = Component =>
  Component.displayName || Component.name || 'Unknown'
