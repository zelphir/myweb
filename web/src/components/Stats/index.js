import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { graphql } from 'react-apollo'
import { startOfToday, endOfToday } from 'date-fns'
import { TransitionMotion, spring, presets } from 'react-motion'
import randomColor from 'randomcolor'

import WhatDoing from './WhatDoing'
import Languages from './Languages'
import StatsInfo from './StatsInfo'
import { GetTodayLanguages } from 'gql/queries.graphql'
import { OnLanguagesUpdate } from 'gql/subscriptions.graphql'
import { getLanguages } from '../../selectors'

import './Stats.scss'

class Stats extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    languages: PropTypes.array.isRequired,
    subscribeToLanguages: PropTypes.func
  }

  componentDidMount() {
    this.props.subscribeToLanguages()
  }

  willLeave() {
    return { opacity: spring(0), width: spring(0), height: 0 }
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
        <div id="stats">
          {!languages.length && <WhatDoing />}
          <TransitionMotion
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            styles={this.getStyles(languages)}
          >
            {styles => <Languages languages={styles} />}
          </TransitionMotion>
          <StatsInfo />
        </div>
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
})(Stats)
