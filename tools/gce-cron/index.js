import queue from 'async/queue'
import { CronJob } from 'cron'
import querystring from 'querystring'
import format from 'date-fns/format'
import fetch from 'node-fetch'
import get from 'lodash.get'
import isEqual from 'lodash.isequal'
import { getTodayLanguages, addLanguages } from 'shared/apollo'

let prevLanguages = []

const apiKey = process.env.STATS_API_KEY
const apiUrl = process.env.STATS_API_URL
const today = format(new Date(), 'YYYY-MM-DD')
const options = { headers: { Authorization: `Basic ${new Buffer(apiKey).toString('base64')}` } }
const params = querystring.stringify({ start: today, end: today })
const q = queue((task, done) => task(done), 1)

const job = async done => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/users/current/summaries?${params}`, options)
    const json = await res.json()
    const languages = get(json, 'data[0].languages', [])

    if (!isEqual(prevLanguages, languages)) {
      const todayLanguages = await getTodayLanguages()
      prevLanguages = languages

      const { data: { updateOrCreateLanguage } } = await addLanguages({
        id: todayLanguages ? todayLanguages.id : '',
        date: new Date().toISOString(),
        entries: languages
      })
      const { date, entries } = updateOrCreateLanguage
      console.log({ date, entries: entries.length })
    }
  } catch (err) {
    console.error(err)
  }

  done()
}

new CronJob('*/5 * * * * *', () => q.push(job), null, true, 'Europe/London')
