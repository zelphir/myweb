import React from 'react'
import { withRouter } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'
import { graphql, compose } from 'react-apollo'
import { GetPictures } from 'gql/queries.graphql'
import { withMql } from '../lib/withMql'
import Modal from './Modal'
import Spinner from './Spinner'
import Marker from './Marker'
import mapStyle from './mapStyle.json'
import './Overlay.css'

class Overlay extends React.PureComponent {
  static getDerivedStateFromProps(nextProps) {
    const { photo } = nextProps

    return {
      photo,
      showModal: !!photo
    }
  }

  state = {
    showModal: true,
    photo: null
  }

  closeModal = e => {
    if (e) e.preventDefault()
    this.setState({ showModal: false })
    setTimeout(() => this.resetUrl(), 300)
  }

  resetUrl = () => {
    const { history, location } = this.props
    return history.push(location.pathname)
  }

  renderHeader(photo) {
    return (
      <div className="modal-header">
        <h2>{photo.country}</h2>
        <a href="/photos" onClick={this.closeModal} className="close-modal">
          &times;
        </a>
      </div>
    )
  }

  renderContent(photo) {
    const { lat, lng } = photo
    return (
      <div className="modal-content">
        <div className="details">
          <p>{photo.caption}</p>
          <div className="picture">
            <img src={photo.imageUrl} alt={photo.caption} />
          </div>
          <div className="tags">
            {photo.tags.map(({ name, id }) => <span key={id}>{name}</span>)}
          </div>
        </div>
        {lat &&
          lng && (
            <div className="map">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_KEY
                }}
                center={[lat, lng]}
                defaultZoom={6}
                options={{ styles: mapStyle, fullscreenControl: false }}
              >
                <Marker lat={lat} lng={lng} />
              </GoogleMapReact>
            </div>
          )}
      </div>
    )
  }

  renderModal() {
    const { photo } = this.state

    return (
      <React.Fragment>
        {this.renderHeader(photo)}
        {this.renderContent(photo)}
      </React.Fragment>
    )
  }

  componentDidUpdate() {
    if (!this.state.photo) this.resetUrl()
  }

  render() {
    const { loading, error } = this.props
    const { photo } = this.state

    return (
      <Modal showModal={this.state.showModal}>
        {error ? (
          <div className="modal-error">{error.message}</div>
        ) : loading ? (
          <Spinner fluid light />
        ) : (
          !!photo && this.renderModal()
        )}
      </Modal>
    )
  }
}

export default compose(
  withMql,
  withRouter,
  graphql(GetPictures, {
    skip: ({ photo }) => !!photo,
    options: ({ pid }) => ({ variables: { filter: { id: pid } } }),
    props: ({ data }) => ({
      loading: data.loading,
      error: data.error,
      photo: data && data.allPictures ? data.allPictures[0] : null
    })
  })
)(Overlay)
