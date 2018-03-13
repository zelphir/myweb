import gray from 'gray-percentage'
import Typography from 'typography'
import FairyGates from 'typography-theme-fairy-gates'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

export const getComponentDisplayName = Component =>
  Component.displayName || Component.name || 'Unknown'

export const isDev = process.env.REACT_STATIC_ENV === 'development'
export const isBrowser = typeof document !== 'undefined'

const color1 = 'rgba(39,60,67,0.8)'
const color2 = 'rgba(24,56,67,0.5)'

FairyGates.overrideThemeStyles = ({ rhythm }) => ({
  'html,body,#root,#container': { height: '100%' },
  'h1,h2,h3,h4,h5,h6': { marginTop: 0, color: gray(25) },
  'a:hover': { color: color2 },
  'p a': { textDecoration: 'underline' },
  p: { color: gray(30) },
  html: { lineHeight: 1.6 },
  a: { color: color1, textShadow: 'none', backgroundImage: 'none' },
  blockquote: { borderLeft: `${rhythm(6 / 16)} solid ${color2}` },
  [MOBILE_MEDIA_QUERY]: {
    blockquote: { borderLeft: `${rhythm(3 / 16)} solid ${color2}` }
  }
})

const typography = new Typography(FairyGates)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production' && module.hot) {
  typography.injectStyles()
}

export default typography
