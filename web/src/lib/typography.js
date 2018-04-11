import gray from 'gray-percentage'
import Typography from 'typography'
import FairyGates from 'typography-theme-fairy-gates'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { primary, secondary } from '../variables.json'

FairyGates.overrideThemeStyles = ({ rhythm }) => ({
  'h1,h2,h3,h4,h5,h6': { marginTop: 0, color: gray(25) },
  'a:hover': { color: primary },
  p: { color: gray(30) },
  html: { lineHeight: 1.6, overflowY: 'auto' },
  a: {
    color: secondary,
    textShadow: 'none',
    backgroundImage: 'none',
    transition: 'color 0.25s linear'
  },
  button: { transition: 'background-color 0.25s linear' },
  blockquote: { borderLeft: `${rhythm(6 / 16)} solid ${primary}` },
  [MOBILE_MEDIA_QUERY]: {
    blockquote: { borderLeft: `${rhythm(3 / 16)} solid ${primary}` }
  }
})

FairyGates.googleFonts = []

const typography = new Typography(FairyGates)

export default typography
