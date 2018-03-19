import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { graphql } from 'react-apollo'
import { TransitionMotion, spring, presets } from 'react-motion'
import randomColor from 'randomcolor'

import WhatDoing from './WhatDoing'
import Languages from './Languages'
import StatsInfo from './StatsInfo'
import { GetDailyStats } from 'gql/queries.graphql'
import { OnDailyStatsUpdate } from 'gql/subscriptions.graphql'

import './Stats.scss'

class Stats extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    languages: PropTypes.array.isRequired,
    subscribeToDailyStats: PropTypes.func
  }

  componentDidMount() {
    this.props.subscribeToDailyStats()
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
        luminosity: 'dark',
        format: 'rgba',
        hue: 'monochrome',
        alpha: 0.15,
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

export default graphql(GetDailyStats, {
  props: ({ data }) => ({
    loading: data.loading,
    error: data.error,
    languages: get(data, 'allDailyStats[0].entries', []),
    subscribeToDailyStats: () =>
      data.subscribeToMore({
        document: OnDailyStatsUpdate,
        updateQuery: (prev, { subscriptionData: { data } }) => {
          if (!data) return prev

          const newDailyStats = get(data, 'DailyStat.node', {})

          return {
            ...prev,
            allDailyStats: [newDailyStats]
          }
        }
      })
  })
})(Stats)
