import path from 'path'
import { writeFileSync, readFileSync } from 'fs'
import querystring from 'querystring'
import { format } from 'date-fns'
import fetch from 'node-fetch'
import getOr from 'lodash/fp/getOr'
import get from 'lodash/get'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import isEqual from 'lodash/isEqual'
import { getDailyStats, updateDailyStats } from 'shared/apollo'

const apiKey = process.env.WAKATIME_API_KEY
const date = new Date()
const today = format(date, 'YYYY-MM-DD')
const options = {
  headers: { Authorization: `Basic ${new Buffer(apiKey).toString('base64')}` }
}
const params = querystring.stringify({ start: today, end: today })
const tmpJson = path.join(__dirname, 'tmp.json')

// Fetch stats and send them to graphcool
;(async () => {
  try {
    const res = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?${params}`,
      options
    )
    const json = await res.json()
    const languages = flow(
      getOr([], 'data[0].languages'),
      map(({ total_seconds, ...values }) => ({
        ...values,
        totalSeconds: total_seconds
      }))
    )(json)
    const prevLanguages = get(
      JSON.parse(readFileSync(tmpJson, 'utf8')),
      'languages',
      []
    )

    if (!isEqual(prevLanguages, languages)) {
      const todayLanguages = await getDailyStats()

      writeFileSync(tmpJson, JSON.stringify({ languages }), 'utf8')

      const { data: { updateOrCreateDailyStat } } = await updateDailyStats({
        id: todayLanguages ? todayLanguages.id : '',
        entries: languages,
        timestamp: date.toISOString()
      })

      const { updatedAt, entries } = updateOrCreateDailyStat
      console.log(JSON.stringify({ updatedAt, entries })) // eslint-disable-line
    } else {
      console.info('Skipping, same entries...') // eslint-disable-line
    }
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
})()
