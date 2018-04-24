import { css } from 'react-emotion'

const breakpoints = {
  md: 769,
  lg: 1025
}

export const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  const prefix = typeof breakpoints[label] === 'string' ? '' : 'min-width:'
  const suffix = typeof breakpoints[label] === 'string' ? '' : 'px'

  accumulator[label] = cls =>
    css`
      @media (${prefix + breakpoints[label] + suffix}) {
        ${cls};
      }
    `

  return accumulator
}, {})

export const colors = {
  primary: '#cccc00',
  secondary: '#96942a',
  green: '#88cc00',
  black: '#000000',
  white: '#ffffff',
  red: '#cc4444'
}

export const sizes = {
  sidebar: {
    width: {
      md: 280,
      lg: 400
    },
    padding: {
      md: 30,
      lg: 50
    }
  }
}

export const fontQuattro = css`
  font-family: 'Quattrocento Sans', serif;
  font-weight: 400;
`

export const fontWork = css`
  font-family: 'Work Sans', serif;
  font-weight: 600;
`
