import Typography from 'typography'
import FairyGates from 'typography-theme-fairy-gates'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

const color1 = '#14425a'
const color2 = '#34c8a0'

FairyGates.overrideThemeStyles = ({ rhythm }) => ({
  html: { lineHeight: 1.6 },
  a: { color: color1, textShadow: 'none', backgroundImage: 'none' },
  'a:hover': { color: color2 },
  blockquote: {
    borderLeft: `${rhythm(6 / 16)} solid ${color2}`
  },
  [MOBILE_MEDIA_QUERY]: {
    blockquote: {
      borderLeft: `${rhythm(3 / 16)} solid ${color2}`
    }
  },
  'p a': {
    textDecoration: 'underline'
  }
})

const typography = new Typography(FairyGates)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
