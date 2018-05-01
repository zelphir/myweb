import styled from 'react-emotion'
import { fontQuattro, colors } from './common'
import { rgba, lighten } from 'polished'

export const Tag = styled.span`
  ${fontQuattro};
  background: ${({ dark }) => lighten(dark ? 0.25 : 0.95, colors.black)};
  color: ${({ dark }) => rgba(dark ? colors.white : colors.black, 0.4)};
  font-size: ${({ small }) => (small ? '12px' : '14px')};
  padding: ${({ small }) => (small ? '3px 5px 1px' : '2px 3px 1px')};
  margin: 0 5px 5px 0;
`

const Tags = styled.span`
  display: flex;
  flex-wrap: wrap;
  margin: ${({ margin }) => margin};
`

export default Tags
