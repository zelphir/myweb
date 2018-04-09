import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import PhotoList from '../components/PhotoList'

const Photos = ({ match }) => (
  <main id="photos">
    <h1>Photos time</h1>
    <PhotoList params={match.params} />
  </main>
)

Photos.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(Photos)
