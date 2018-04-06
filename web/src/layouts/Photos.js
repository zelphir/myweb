import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-static'
import qs from 'query-string'
import PhotoList from '../components/PhotoList'

const Photos = ({ location }) => (
  <main id="photos">
    <h1>Photos time</h1>
    <PhotoList params={qs.parse(location.search)} />
  </main>
)

Photos.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Photos)
