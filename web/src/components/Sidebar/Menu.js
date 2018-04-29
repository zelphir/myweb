import React from 'react'
import { Query } from 'react-apollo'
import sortBy from 'lodash/sortBy'
import styled, { css } from 'react-emotion'
import { rgba } from 'polished'
import { mq, sidebarPadding, colors } from '../common'
import NavLink from '../NavLink'
import Spinner from '../Spinner'
import { GetCountries } from 'gql/queries.graphql'

const menus = {
  dev: [
    { to: '/', label: 'Home' },
    { to: '/resume', label: 'Resume' },
    { to: '/blog', label: 'Blog' },
    { to: '/photos', label: 'Photos' }
  ],
  photos: [{ to: '/', label: 'Home' }, { to: '/photos', label: 'All' }]
}

const Wrapper = styled.div`
  ${sidebarPadding(20)} align-items: flex-end;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  text-transform: uppercase;

  ${({ type }) => {
    const isPhoto = type === 'photos'
    const color = isPhoto ? 'white' : 'black'

    return css`
      a {
        color: ${rgba(colors[color], 0.8)};

        &:hover {
          color: ${rgba(colors[color], isPhoto ? 0.7 : 0.4)};
        }
      }
    `
  }};

  ${mq.md(css`
    font-size: 18px;
  `)};
`

const Menu = ({ closeMenu, type }) => (
  <Wrapper type={type}>
    {menus[type].map(({ to, label }) => (
      <NavLink to={to} key={to} onClick={closeMenu}>
        {label}
      </NavLink>
    ))}
    {type === 'photos' && (
      <Query query={GetCountries}>
        {({ loading, error, data }) => {
          if (error) return null
          if (loading) return <Spinner light />

          return (
            <React.Fragment>
              {data.allPictures.reduce((prev, { country, countryCode }) => {
                if (!country || !countryCode) return prev
                if (prev.find(({ key }) => countryCode === key)) return prev

                return sortBy(
                  [
                    ...prev,
                    <NavLink to={`/photos/${countryCode}`} key={countryCode} onClick={closeMenu}>
                      {country}
                    </NavLink>
                  ],
                  'props.children'
                )
              }, [])}
            </React.Fragment>
          )
        }}
      </Query>
    )}
  </Wrapper>
)

export default Menu
