import { injectGlobal, css } from 'emotion'
import { normalize, rgba, modularScale } from 'polished'
import { colors, fontWork, fontQuattro } from '../components/common'
import printStyles from './printStyles'

const htag = css`
  ${fontWork};
  line-height: 1.1;
  padding: 0;
  text-rendering: optimizeLegibility;
  color: ${rgba(colors.black, 0.75)};
  margin-bottom: 0.725rem;
`

injectGlobal`
  ${normalize()};

  html {
    box-sizing: border-box;
  }

  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }

  html,
  body,
  #root {
    height: 100vh;
  }

  html {
    font: 125%/1.45 'Quattrocento Sans', serif;
    line-height: 1.6;
    overflow-y: auto;
  }

  body {
    ${fontQuattro};
    color: ${rgba(colors.black, 0.8)};
    margin: 0;
    word-wrap: break-word;
  }

  a {
    color: ${colors.secondary};
    text-decoration: none;
    transition: color 0.25s linear;

    &:active {
      outline-width: 0;
    }

    &:hover {
      outline-width: 0;
      color: $primary;
    }
  }

  abbr[title] {
    border-bottom: 1px dotted ${rgba(colors.black, 0.5)};
    cursor: help;
    text-decoration: none;
  }

  img {
    border-style: none;
    display: inline-block;
    margin: 0 0 1.45rem;
    max-width: 100%;
    padding: 0;
  }

  code {
    font-family: monospace;
    font-size: 1em;
    font-size: 0.85rem;
    line-height: 1.45rem;
  }

  pre {
    font-family: monospace;
    font-size: 1em;
    font-size: 0.85rem;
    line-height: 1.45rem;
    margin: 0 0 1.45rem;
    padding: 0;
  }

  hr {
    background: ${rgba(colors.black, 0.2)};
    border: none;
    box-sizing: content-box;
    height: 1px;
    margin: 0 0 calc(1.45rem-1px);
    overflow: visible;
    padding: 0;
  }

  button {
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    transition: background-color 0.25s linear;

    &::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }

    &:-moz-focusring {
      outline: 1px dotted ButtonText;
    }
  }

  h1 {
    font-size: ${modularScale(2)};
    ${htag};
    margin-top: 5px;
  }

  h2 {
    font-size: ${modularScale(1.5)};
    ${htag};
  }

  h3 {
    font-size: ${modularScale(1)};
    ${htag};
  }

  h4 {
    font-size: ${modularScale(0.5)};
    ${htag};
  }

  h5 {
    font-size: ${modularScale(0)};
    ${htag};
  }

  h6 {
    font-size: ${modularScale(-0.5)};
    ${htag};
  }

  p {
    color: ${rgba(colors.black, 0.7)};
    margin: 0 0 1.45rem;
    padding: 0;
  }

  blockquote {
    border-left: 0.54375rem solid ${colors.secondary};
    color: ${rgba(colors.black, 0.65)};
    font-size: ${modularScale(1.5)};
    font-style: italic;
    line-height: 1.45rem;
    margin: 0 0 1.45rem;
    padding: 0 0 0 ${modularScale(0.5)};

    &:last-child {
      margin-bottom: 0;
    }

    cite {
      color: ${rgba(colors.black, 0.8)};
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.45rem;
      &:before {
        content: '— ';
      }
    }

    & > :last-child {
      margin-bottom: 0;
    }
  }

  ul {
    list-style-image: none;
    list-style-position: outside;
    margin: 0 0 1.45rem 1.45rem;
    padding: 0;

    li {
      padding-left: 0;
    }
  }

  ol {
    list-style-image: none;
    list-style-position: outside;
    margin: 0 0 1.45rem 1.45rem;
    padding: 0;

    li {
      padding-left: 0;
    }
  }

  dl {
    margin: 0 0 1.45rem;
    padding: 0;
  }

  dd {
    margin: 0 0 1.45rem;
    padding: 0;
  }

  .sidebarjs--is-visible {
    [sidebarjs-backdrop] {
      &:before {
        ${fontWork};
        content: '\\d7';
        font-size: 30px;
        color: ${colors.white};
        position: absolute;
        right: 16px;
        top: 0;
      }
    }
  }

  .ps__rail-y {
    margin-right: -5px;
  }

  @media (max-width: 480px) {
    html {
      font-size: 106.25%;
      line-height: 1.45;
    }

    blockquote {
      border-left: 0.27187rem solid ${colors.secondary};
      color: ${rgba(colors.black, 0.6)};
      font-style: italic;
      margin-left: -1.0875rem;
      margin-right: 0;
      padding-left: 0.81563rem;
    }
  }

  ${printStyles};
`
