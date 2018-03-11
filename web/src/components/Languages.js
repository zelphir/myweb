import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { graphql } from 'react-apollo'
import { startOfToday, endOfToday } from 'date-fns'
import { TransitionMotion, spring, presets } from 'react-motion'
import randomColor from 'randomcolor'

import { GetTodayLanguages } from 'gql/queries.graphql'
import { OnLanguagesUpdate } from 'gql/subscriptions.graphql'
import { getLanguages } from '../selectors'
import Language from './Language'

import './Languages.scss'

class Languages extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    languages: PropTypes.array.isRequired,
    subscribeToLanguages: PropTypes.func
  }

  componentDidMount() {
    this.props.subscribeToLanguages()
  }

  renderWhatDoing() {
    const d = new Date()
    const dayOfWeek = d.getDay()
    const hour = d.getHours()
    const isMonFri = dayOfWeek > 0 && dayOfWeek < 6
    const isFromTo = (from, to) => hour > from && hour < to

    switch (true) {
      case isFromTo(0, 9):
        return <div>Probably sleeping...</div>
      case isMonFri && isFromTo(18, 20):
        return <div>Probably training...</div>
      case isFromTo(20, 22):
        return <div>Probably eating...</div>
      default:
        return <div>Probably resting...</div>
    }
  }

  willLeave() {
    return { opacity: spring(0), width: spring(0) }
  }

  didLeave() {
    return { height: 0 }
  }

  willEnter() {
    return { width: 0 }
  }

  getStyles = languages =>
    languages.map(({ name, percent, text }) => {
      const bg = randomColor({
        luminosity: 'light',
        format: 'rgba',
        hue: '#19282c',
        alpha: 0.4,
        seed: name
      })

      return {
        style: {
          width: spring(percent, presets.wobbly),
          opacity: 1,
          height: 30
        },
        key: name.replace(/\s/g, '').toLowerCase(),
        data: {
          name,
          text,
          bg
        }
      }
    })

  render() {
    const { error, loading, languages } = this.props

    if (error) return <div>Error...</div>
    if (loading) return <div>Loading...</div>

    return (
      <React.Fragment>
        <TransitionMotion
          willEnter={this.willEnter}
          willLeave={this.willLeave}
          didLeave={this.didLeave}
          styles={this.getStyles(languages.slice(0, 6))}
        >
          {styles => (
            <div className="languages">
              {styles.map(({ key, ...props }) => (
                <Language key={key} {...props} />
              ))}
            </div>
          )}
        </TransitionMotion>
        {!languages.length && this.renderWhatDoing()}
      </React.Fragment>
    )
  }
}

const variables = {
  from: startOfToday().toISOString(),
  to: endOfToday().toISOString()
}

export default graphql(GetTodayLanguages, {
  options: { variables, fetchPolicy: 'cache-and-network' },
  props: ({ data }) => ({
    loading: data.loading,
    error: data.error,
    languages: getLanguages(data),
    subscribeToLanguages: () =>
      data.subscribeToMore({
        document: OnLanguagesUpdate,
        updateQuery: (prev, { subscriptionData: { data } }) => {
          if (!data) return prev

          const newLanguages = get(data, 'Language.node', {})

          return {
            ...prev,
            allLanguages: [newLanguages]
          }
        }
      })
  })
})(Languages)
