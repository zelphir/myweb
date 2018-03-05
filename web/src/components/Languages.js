import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { startOfToday, endOfToday } from 'date-fns'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// import './Languages.scss'

import { GetTodayLanguages } from 'gql/queries.graphql'
import { OnLanguagesUpdate } from 'gql/subscriptions.graphql'

class Languages extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    subscribeToNewLanguages: PropTypes.func
  }

  componentDidMount() {
    this.props.subscribeToNewLanguages()
  }

  render() {
    const { data } = this.props
    if (data.error) return <div>Error</div>
    if (data.loading) return <div>Loading...</div>

    const languages = get(data.allLanguages, '[0].entries', [])
    const items = languages.map(({ name, percent, text }) => (
      <div key={name}>
        {percent} - {text}
      </div>
    ))

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {items}
      </ReactCSSTransitionGroup>
    )
  }
}

const variables = { from: startOfToday().toISOString(), to: endOfToday().toISOString() }

export default graphql(GetTodayLanguages, {
  options: { variables },
  props: ({ data }) => {
    return {
      data,
      subscribeToNewLanguages: () => {
        return data.subscribeToMore({
          document: OnLanguagesUpdate,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev
            }
          },
          onError: err => console.error(err) // eslint-disable-line
        })
      }
    }
  }
})(Languages)
