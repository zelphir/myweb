import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import Head from 'next/head'

import { getComponentDisplayName } from './utils'
import initApollo from './initApollo'

export default ComposedComponent => {
  return class WithApollo extends React.Component {
    static displayName = `WithApollo(${getComponentDisplayName(ComposedComponent)})`

    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static defaultProps = {
      serverState: {
        apollo: {
          data: {}
        }
      }
    }

    static async getInitialProps(ctx) {
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}

      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo()

      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apollo}>
            <ComposedComponent {...composedInitialProps} />
          </ApolloProvider>,
          {
            router: {
              asPath: ctx.asPath,
              pathname: ctx.pathname,
              query: ctx.query
            }
          }
        )
      } catch (e) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // console.error('catch', e) // eslint-disable-line
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      return {
        serverState: {
          apollo: {
            data: apollo.cache.extract()
          }
        },
        ...composedInitialProps
      }
    }

    apollo = initApollo(this.props.serverState.apollo.data)

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
