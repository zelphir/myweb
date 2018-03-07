import path from 'path'
import { writeFileSync, readFileSync } from 'fs'
import querystring from 'querystring'
import { format } from 'date-fns'
import fetch from 'node-fetch'
import get from 'lodash.get'
import isEqual from 'lodash.isequal'
import { getTodayLanguages, addLanguages } from 'shared/apollo'

const apiKey = process.env.STATS_API_KEY
const apiUrl = process.env.STATS_API_URL
const today = format(new Date(), 'YYYY-MM-DD')
const options = { headers: { Authorization: `Basic ${new Buffer(apiKey).toString('base64')}` } }
const params = querystring.stringify({ start: today, end: today })
const tmpJson = path.join(__dirname, 'tmp.json')

// Fetch stats and send them to graphcool
;(async () => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/users/current/summaries?${params}`, options)
    const json = await res.json()
    const languages = get(json, 'data[0].languages', [])
    const prevLanguages = get(JSON.parse(readFileSync(tmpJson, 'utf8')), 'languages', [])

    if (!isEqual(prevLanguages, languages)) {
      const todayLanguages = await getTodayLanguages()

      writeFileSync(tmpJson, JSON.stringify({ languages }), 'utf8')

      const { data: { updateOrCreateLanguage } } = await addLanguages({
        id: todayLanguages ? todayLanguages.id : '',
        entries: languages
      })

      const { updatedAt, entries } = updateOrCreateLanguage
      console.log(JSON.stringify({ updatedAt, entries })) // eslint-disable-line
    } else {
      console.info('Skipping, same entries...') // eslint-disable-line
    }
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
})()
