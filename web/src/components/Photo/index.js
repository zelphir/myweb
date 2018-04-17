import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import classNames from 'classnames/dedupe'
import { GetPictures } from 'gql/queries.graphql'
import { withMql } from '../../lib/withMql'
import Spinner from '../Spinner'
// import Header from './Header'
import Content from './Content'
import './index.css'

class Photo extends React.PureComponent {
  render() {
    const { loading, error, modal, photo, animation, prevLocation } = this.props
    const HtmlTag = modal ? 'div' : 'main'

    return (
      <HtmlTag
        id="photo"
        className={classNames({
          modal,
          [animation]: animation
        })}
      >
        {error ? (
          <div className="photo-error">{error.message}</div>
        ) : loading ? (
          <Spinner fluid light />
        ) : (
          <React.Fragment>
            <Content photo={photo} />
          </React.Fragment>
        )}
      </HtmlTag>
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
