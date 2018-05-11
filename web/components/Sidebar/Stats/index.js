import React from 'react'
import get from 'lodash/get'
import { Query } from 'react-apollo'

import Stats from './Stats'
import { GetDailyStats } from 'gql/queries.graphql'
import { OnDailyStatsUpdate } from 'gql/subscriptions.graphql'

const StatsWrapper = () => (
  <Query query={GetDailyStats}>
    {({ loading, error, data, subscribeToMore }) => {
      return (
        <Stats
          error={error}
          loading={loading}
          data={data}
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
