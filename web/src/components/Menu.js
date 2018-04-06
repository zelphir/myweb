import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import { Query } from 'react-apollo'
import sortBy from 'lodash/sortBy'
import Spinner from './Spinner'
import { GetCountries } from 'gql/queries.graphql'

const menus = {
  dev: [
    { to: '/', label: 'Home' },
    { to: '/resume', label: 'Resume' },
    { to: '/blog', label: 'Blog' },
    { to: '/photos', label: 'Photos' }
  ],
  photos: [{ to: '/', label: 'Home' }]
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
                if (country === null) return prev
                if (prev.find(({ key }) => countryCode === key)) return prev

                return sortBy(
                  [
                    ...prev,
                    <Link
                      to={`/photos?country=${countryCode}`}
                      key={countryCode}
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
