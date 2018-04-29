import React from 'react'
import styled, { css } from 'react-emotion'
import ReactTooltip from 'react-tooltip'
import { mq, sizes, colors, fontWork } from '../../common'

const Bar = styled.div`
  border-radius: 5px 0 0 5px;
  height: 20px;
  box-sizing: content-box;
  width: ${({ width }) => width}%;
  padding-left: ${({ isUpdated }) => isUpdated && '30px'};
  transition: background-color 0.25s ease-in-out, padding-left 0.25s ease-in-out;
  background-color: ${({ background, isUpdated }) => (isUpdated ? colors.white : background)};
`

const Update = styled.span`
  ${fontWork};
  font-size: 12px;
  margin-right: 10px;
  transition: opacity 0.25s ease-in-out;
  opacity: ${({ isUpdated }) => (isUpdated ? 1 : 0)};
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

export class Language extends React.PureComponent {
  state = {
    isUpdated: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.highlightUpdate()
    }
  }

  highlightUpdate = () => {
    this.setState({ isUpdated: true })
    setTimeout(() => this.setState({ isUpdated: false }), 1000)
  }

  render() {
    const { styles, text, name } = this.props
    const { isUpdated } = this.state

    return (
      <Wrapper height={styles.height}>
        <Label opacity={styles.opacity} data-tip={text}>
          <Update isUpdated={isUpdated}>{text}</Update>
          {name}
        </Label>
        <Bar {...styles} isUpdated={isUpdated} />
        <ReactTooltip place="top" />
      </Wrapper>
    )
  }
}
