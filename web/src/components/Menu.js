import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import { Query } from 'react-apollo'
import sortBy from 'lodash/sortBy'
import Spinner from './Spinner'
import { GetCountries } from 'gql/queries.graphql'

const menus = {
  dev: [
    { to: '/resume', label: 'Resume' },
    { to: '/blog', label: 'Blog' },
    { to: '/photos', label: 'Photos' }
  ],
  photos: [{ to: '/photos', label: 'All' }]
}

const Menu = ({ closeMenu, type }) => (
  <div className="menu">
    {menus[type].map(({ to, label }) => (
      <Link to={to} key={to} onClick={closeMenu}>
        {label}
      </Link>
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
                    <Link
                      to={`/photos/${countryCode}`}
                      key={countryCode}
                      onClick={closeMenu}
                    >
                      {country}
                    </Link>
                  ],
                  'props.children'
                )
              }, [])}
            </React.Fragment>
          )
        }}
      </Query>
    )}
  </div>
)

Menu.propTypes = {
  type: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired
}

export default Menu
