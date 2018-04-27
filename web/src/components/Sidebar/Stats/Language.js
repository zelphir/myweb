import React from 'react'
import styled, { css } from 'react-emotion'
import ReactTooltip from 'react-tooltip'
import { mq, sizes, fadeAnimation } from '../../common'

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
const Update = styled.span`
  animation: ${fadeAnimation} 2s ease-in 0.2s forwards;
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

export const Language = ({ styles, text, name }) => (
  <Wrapper height={styles.height}>
    <Label opacity={styles.opacity} data-tip={text}>
      <Update>{text}</Update> {name}
    </Label>
    <Bar {...styles} />
    <ReactTooltip place="left" effect="solid" />
  </Wrapper>
)
