import React from 'react'
import styled, { css } from 'react-emotion'
import { ReactComponent as Loading } from '../assets/svgs/loading.svg'
import { colors } from './common'

const fluid = css`
  height: 100%;
  width: 100%;
`

const absolute = css`
  ${fluid};
  left: 0;
  margin: 0;
  position: absolute;
  top: 0;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${props => props.fluid && '100%'};
  width: ${props => props.fluid && '100%'};
  ${props => props.fluid && fluid};
  ${props => props.absolute && absolute};

  svg {
    opacity: 0.4;

    rect,
    circle,
    path {
      fill: ${props => (props.light ? colors.white : colors.black)};
    }
  }
`

const Spinner = props => (
  <Wrapper {...props}>
    <Loading />
  </Wrapper>
)

export default Spinner
