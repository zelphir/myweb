import { css } from 'emotion'

const printStyles = css`
  @media print {
    @page {
      size: A4 portrait;
      margin: 1.2cm 1cm;
    }

    html,
    body,
    #root,
    .main {
      opacity: 1;
      margin: 0;
    }

    html {
      font-size: 11px;
      line-height: 1.3;
    }

    a {
      color: black;
      text-decoration: none;
    }

    h2 {
      margin: 10px 0 5px;
      font-size: 1.4rem;
    }

    h4 {
      margin: 0;
      color: #666;
    }

    h3 {
      margin: 8px 0 5px;
      font-size: 1.1rem;
    }

    h6 {
      margin: 2px 0 10px;
    }

    p {
      margin: 0 0 5px;
    }

    ul {
      margin-bottom: 0;

      &:first-of-type {
        columns: 2;
        list-style: none;
        margin: 0 0 10px;

        li {
          margin-bottom: 2px;
        }
      }

      &:nth-of-type(2),
      &:nth-of-type(3) {
        columns: 2;
        column-gap: 2cm;
        margin-left: 0;

        > li {
          display: inline-block;
        }
      }

      &:nth-of-type(4),
      &:nth-of-type(5) {
        list-style: none;
        margin: 0;

        li {
          display: inline;
          margin-right: 5px;

          p {
            display: inline;
            margin-right: 5px;
          }
        }
      }

      ul:first-of-type {
        columns: unset;
        list-style: circle;
        margin-left: 1.45rem;
        margin-bottom: calc(1.45rem / 2);
        margin-top: calc(1.45rem / 2);
      }
    }

    li {
      break-inside: avoid-column;

      p {
        margin: 0;
      }
    }

    hr {
      background: #999 !important;
      border: none;
      height: 1px;
      margin: 5px 0 15px;
      padding: 0;
    }

    .mobile-header,
    .sidebarjs--left,
    .pdf-print,
    .sidebar {
      display: none !important;
    }

    main {
      max-width: 100% !important;
      padding: 0 !important;
      transform: translateX(0) !important;
      width: 100% !important;
    }

    #resume h1 {
      display: none;
    }
  }
`

export default printStyles
