import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { GetPictures } from 'gql/queries.graphql'
import { withMql } from '../../lib/withMql'
import Spinner from '../Spinner'
import Tags, { Tag } from '../Tags'
import Main from '../Main'
import Seo from '../Seo'
import Map from './Map'
import Modal from './Modal'

class Photo extends React.PureComponent {
  wrapper = React.createRef()

  state = {
    wrapperWidth: null,
    imageLoaded: false
  }

  updateWrapperWidth() {
    const wrapper = window.getComputedStyle(this.wrapper.current, null)
    const width = parseInt(wrapper.getPropertyValue('width'))
    const paddingLeft = parseInt(wrapper.getPropertyValue('padding-left'))
    const paddingRight = parseInt(wrapper.getPropertyValue('padding-right'))
    const wrapperWidth = width - paddingLeft - paddingRight
    this.setState({ wrapperWidth })
  }

  componentDidUpdate() {
    if (!this.props.photo) return this.props.history.push('/photos')
    if (this.state.imageLoaded) this.updateWrapperWidth()
  }

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true })
  }

  render() {
    const { location, loading, error, modal, photo, styles } = this.props
    const { wrapperWidth: width } = this.state
    const height = width * 9 / 16

    return (
      <React.Fragment>
        {modal ? (
          <Modal photo={photo} styles={styles} />
        ) : (
          <Main id="photo" innerRef={this.wrapper}>
            {error ? (
              <p>{error.message}</p>
            ) : loading || !photo ? (
              <Spinner fluid light />
            ) : (
              <React.Fragment>
                <h1>{photo.country}</h1>
                <p>{photo.caption}</p>
                <img src={photo.imageUrl} alt={photo.caption} onLoad={this.handleImageLoaded} />
                <Map lat={photo.lat} lng={photo.lng} height={height} width={width} light />
                <Tags margin="10px 0 0">
                  {photo.tags.map(({ name, id }) => <Tag key={id}>{name}</Tag>)}
                </Tags>
              </React.Fragment>
            )}
          </Main>
        )}
        {!!photo && (
          <Seo
            image={photo.imageUrl}
            path={location.pathname}
            title={`Photo: ${photo.country}`}
            description={photo.caption}
          />
        )}
      </React.Fragment>
    )
  }
}

export default compose(
  withMql,
  withRouter,
  graphql(GetPictures, {
    skip: ({ photo }) => !!photo,
    options: ({
      match: {
        params: { id }
      }
    }) => ({
      variables: { filter: { id } }
    }),
    props: ({ data }) => ({
      loading: data.loading,
      error: data.error,
      photo: data && data.allPictures ? data.allPictures[0] : null
    })
  })
)(Photo)
