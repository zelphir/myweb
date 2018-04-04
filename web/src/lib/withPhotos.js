import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'

import { getComponentDisplayName } from './utils'

const Ctx = createReactContext()

export class PhotosProvider extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  state = {
    photos: []
  }

  setPhotos = photos => this.setState({ photos })

  render() {
    return <Ctx.Provider value={this.state}>{this.props.children}</Ctx.Provider>
  }
}

export const withPhotos = ComposedComponent =>
  class WithPhotos extends React.Component {
    static displayName = `WithPhotos(${getComponentDisplayName(
      ComposedComponent
    )})`

    render() {
      return (
        <Ctx.Consumer>
          {({ photos }) => (
            <ComposedComponent
              photos={photos}
              setPhotos={this.setPhotos}
              {...this.props}
            />
          )}
        </Ctx.Consumer>
      )
    }
  }
