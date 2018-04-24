import styled, { css } from 'react-emotion'
import { mq, sizes } from './common'

const Main = styled.main`
  padding: 80px 30px 30px;

  ${mq.md(css`
    max-width: 830px;
    padding: 30px;
    transform: translateX(${sizes.sidebar.width.md}px);
    width: calc(100% - ${sizes.sidebar.width.md}px);
  `)};

  ${mq.lg(css`
    padding: 30px 100px 50px 50px;
    transform: translateX(${sizes.sidebar.width.lg}px);
    width: calc(100% - ${sizes.sidebar.width.lg}px);
  `)};
`

export default Main
