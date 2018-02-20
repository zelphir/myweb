const { CronJob } = require('cron')
const queue = require('async/queue')
const querystring = require('querystring')
const format = require('date-fns/format')
const fetch = require('node-fetch')
const get = require('lodash.get')
const isEqual = require('lodash.isequal')

// const serviceAccount = require('./serviceAccountKey.json')

let prevLanguages = []

const { API_KEY: api_key, API_URL: apiUrl } = process.env
const today = format(new Date(), 'YYYY-MM-DD')
const params = querystring.stringify({ api_key, start: today, end: today })

const q = queue((task, done) => task(done), 1)

// const db = admin.firestore()
// const todayRef = db.collection('languages').doc(today)

const job = async done => {
  try {
    // const res = await fetch(`${apiUrl}api/v1/users/current/summaries?${params}`)
    // const json = await res.json()
    // const languages = get(json, 'data[0].languages', [])

    // if (!isEqual(prevLanguages, languages)) {
    //   prevLanguages = languages
    //   return todayRef.set({ languages }, { merge: true })
    // }

    return
  } catch (err) {
    console.error(err)
  }

  done()
}

new CronJob('*/5 * * * * *', () => q.push(job), null, true, 'Europe/London')
