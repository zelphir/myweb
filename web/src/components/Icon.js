import React from 'react'
import { css } from 'react-emotion'
import { rgba } from 'polished'
import { withTheme } from '../lib/withTheme'
import { colors } from './common'

const Icon = ({ theme, size = 18, icon }) => {
  const color = theme === 'photos' ? colors.white : colors.black

  return (
    <span
      className={css`
        margin-left: 10px;

        &:hover {
          svg {
            fill: ${rgba(color, 0.9)};
          }
        }

        svg {
          fill: ${rgba(color, 0.6)};
          height: ${size}px;
          transition: fill 0.5s linear;
          width: ${size}px;
        }
      `}
    >
      {icon}
    </span>
  )
}

export default withTheme(Icon)
