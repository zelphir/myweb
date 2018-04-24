import React from 'react'
import styled, { css, cx } from 'react-emotion'
import { rgba } from 'polished'
import { ReactComponent as Pdf } from '../assets/svgs/pdf.svg'
import Markdown from './Markdown'
import Main from './Main'
import Tag from './Tag'
import Icon from './Icon'
import { colors, fontQuattro } from './common'

const noPrintStyle = css`
  h2 {
    color: ${rgba(colors.black, 0.6)};
  }

  h3 {
    color: ${colors.secondary};
    font-size: 20px;
    margin: 0;

    em {
      ${fontQuattro};
      color: ${rgba(colors.black, 0.4)};
      font-size: 16px;
    }
  }

  h4 {
    font-size: 18px;
    color: ${rgba(colors.black, 0.6)};
    margin: 5px 0;
  }

  ul {
    li {
      margin: 0;
    }

    > li > p {
      color: ${rgba(colors.black, 0.4)};
      font-size: 16px;
    }

    ul {
      > li {
        margin-bottom: 0;
        font-size: 18px;

        p {
          color: ${rgba(colors.black, 0.6)};
          margin-bottom: 0;
        }
      }
    }
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`

const Header = styled.div`
  align-items: baseline;
  display: flex;
`

const heading = props =>
  props.level === 6 ? (
    <Tags>{props.children[0].split(/,\s?/).map(tag => <Tag key={tag}>{tag}</Tag>)}</Tags>
  ) : (
    <Markdown.renderers.heading {...props} />
  )

const Resume = ({ data, isPrint, children }) => (
  <Main id="resume" className={cx({ [noPrintStyle]: !isPrint })}>
    <Header>
      <h1>{data.title}</h1>
      {!isPrint && (
        <a href="/resume.pdf" target="blank">
          <Icon size={28} icon={<Pdf />} />
        </a>
      )}
    </Header>
    {children}
    <Markdown source={data.content} renderers={!isPrint && { heading }} />
  </Main>
)

export default Resume
