import styled, { css } from 'react-emotion'
import { rgba } from 'polished'
import { colors, mq, fadeAnimation } from '../common'

export const FormWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 80px;
  margin-top: 30px;
`

export const FieldWrapper = styled.div`
  flex: 0 0 100%;
  position: relative;

  label {
    color: ${rgba(colors.black, 0.4)};
    font-size: 16px;
    line-height: 36px;
    position: absolute;
    top: 0;
    transition: transform 0.2s linear;
    transform-origin: left;
  }

  textarea {
    min-height: 140px;
  }

  margin-top: ${({ type }) => type === 'textarea' && '20px'};

  input,
  textarea {
    background: transparent;
    border: 0;
    border-bottom: 1px solid ${rgba(colors.black, 0.2)};
    border-radius: 0;
    display: block;
    font-size: 16px;
    outline: 0;
    padding: 5px 0;
    position: relative;
    width: 100%;
    z-index: 1;

    &:focus ~ label {
      transform: scale(0.75) translateY(-30px);
    }
  }

  ${props =>
    props.isDirty &&
    css`
      textarea:not(:focus) ~ label,
      input:not(:focus) ~ label {
        transform: scale(0.75) translateY(-30px);
      }
    `};

  ${props =>
    props.isError &&
    css`
      label {
        color: ${colors.red};
      }

      input,
      textarea {
        color: ${colors.red};
        border-bottom: 1px solid $red;
      }
    `};

  ${({ type }) =>
    type === 'input' &&
    mq.md(css`
        flex: 0 50%;

        &:nth-child(1) {
          padding-right: 5px;
        }

        &:nth-child(2) {
          padding-left: 5px;
        }
    }
  `)};
`

export const ButtonWrapper = styled.div`
  flex: 0 0 100%;
  position: relative;
  text-align: right;

  button {
    border: 1px solid ${colors.secondary};
    color: ${colors.secondary};
    cursor: pointer;
    outline: 0;
    padding: 5px 20px;
    position: relative;
    width: 100%;

    &:hover:not([disabled]) {
      background-color: ${colors.primary};
      color: ${colors.white};
    }

    background-color: ${({ status }) => status === 'loading' && rgba(colors.primary, 0.5)};

    &:after {
      color: ${colors.white};
      content: attr(data-status);
      font-size: 14px;
      height: calc(100% + 2px);
      left: -1px;
      line-height: 42px;
      opacity: 0;
      position: absolute;
      text-align: center;
      top: -1px;
      width: calc(100% + 2px);
    }

    ${({ status }) =>
      status === 'ok' &&
      css`
        &:after {
          animation: ${fadeAnimation} 5s ease-in 0.2s forwards;
          background-color: ${colors.green};
          border-color: ${colors.green};
        }
      `} ${({ status }) =>
      status === 'error' &&
      css`
        &:after {
          animation: ${fadeAnimation} 5s ease-in 0.2s forwards;
          background-color: ${colors.red};
          border-color: ${colors.red};
        }
      `};
  }

  ${mq.md(css`
    button {
      width: 200px;
    }
  `)};
`

export const ErrorMessage = styled.div`
  color: ${colors.red};
  font-size: 12px;
  height: 18px;
  line-height: 16px;
  margin-top: 2px;
`
