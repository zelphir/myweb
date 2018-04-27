import React from 'react'
import styled, { css } from 'react-emotion'
import ReactTooltip from 'react-tooltip'
import { mq, sizes } from '../../common'

const Bar = styled.div`
  border-radius: 5px 0 0 5px;
  height: 20px;
  width: ${({ width }) => width}%;
  background-color: ${({ background }) => background};
`

const Label = styled.span`
  opacity: ${({ opacity }) => opacity};
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  padding-right: 5px;
  position: absolute;
  right: 0;
  top: 3px;
  z-index: 1200;
`

const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: flex-end;
  padding: 2px 0;
  position: relative;
  width: 100%;
`

export const Languages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 10px 0 5px ${sizes.sidebar.padding.md}px;
  position: relative;

  ${mq.lg(css`
    padding: 10px 0 5px ${sizes.sidebar.padding.lg}px;
  `)};
`

export const Language = ({ style, text, name }) => (
  <Wrapper height={style.height}>
    <Label opacity={style.opacity} data-tip={text}>
      {name}
    </Label>
    <Bar {...style} />
    <ReactTooltip place="left" effect="solid" />
  </Wrapper>
)
