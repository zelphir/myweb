import React from 'react'
import styled from 'react-emotion'
import { ReactComponent as Loading } from '../assets/svgs/loading.svg'
import { colors } from './common'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${props => props.fluid && '100%'};
  width: ${props => props.fluid && '100%'};

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
