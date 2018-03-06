import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { startOfToday, endOfToday } from 'date-fns'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './Languages.scss'

import { GetTodayLanguages } from 'gql/queries.graphql'
import { OnLanguagesUpdate } from 'gql/subscriptions.graphql'

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1000} classNames="fade">
    {children}
  </CSSTransition>
)

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

    return (
      <TransitionGroup className="todo-list">
        {languages.map(({ name, percent, text }) => (
          <Fade key={name}>
            <div
              className="animated-bar"
              style={{ width: `${percent}%`, height: 30, background: 'red', marginBottom: 5 }}
            >
              {name} - {percent} - {text}
            </div>
          </Fade>
        ))}
      </TransitionGroup>
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
