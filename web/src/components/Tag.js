import styled from 'react-emotion'
import { fontQuattro, colors } from './common'
import { rgba, lighten } from 'polished'

const Tag = styled.span`
  ${fontQuattro};
  background: ${({ dark }) => lighten(dark ? 0.25 : 0.95, colors.black)};
  color: ${({ dark }) => rgba(dark ? colors.white : colors.black, 0.4)};
  font-size: 14px;
  margin: 0 5px 5px 0;
  padding: 3px 5px 1px;
`

export default Tag
