import React from 'react'
import get from 'lodash/get'
import { Query } from 'react-apollo'

import Stats from './Stats'
import { GetDailyStats } from 'gql/queries.graphql'
import { OnDailyStatsUpdate } from 'gql/subscriptions.graphql'

const StatsWrapper = () => (
  <Query query={GetDailyStats}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      const languages = get(data, 'allDailyStats[0].entries', [])

      return (
        <Stats
          languages={languages}
          subscribeToDailyStats={() =>
            subscribeToMore({
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
          }
        />
      )
    }}
  </Query>
)

export default StatsWrapper
