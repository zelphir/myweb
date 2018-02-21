import queue from 'async/queue'
import { CronJob } from 'cron'
// import querystring from 'querystring'
// import format from 'date-fns/format'
// import fetch from 'node-fetch'
// import get from 'lodash.get'
import isEqual from 'lodash.isequal'

let prevLanguages = []

// const { API_KEY: api_key, API_URL: apiUrl } = process.env
// const today = format(new Date(), 'YYYY-MM-DD')
// const params = querystring.stringify({ api_key, start: today, end: today })

const q = queue((task, done) => task(done), 1)

// const db = admin.firestore()
// const todayRef = db.collection('languages').doc(today)

const job = async done => {
  try {
    // const res = await fetch(`${apiUrl}api/v1/users/current/summaries?${params}`)
    // const json = await res.json()
    // const languages = get(json, 'data[0].languages', [])
    const languages = []

    if (!isEqual(prevLanguages, languages)) {
      prevLanguages = languages
      // return todayRef.set({ languages }, { merge: true })
    }
  } catch (err) {
    console.error(err)
  }

  console.log('cron running...')
  done()
}

new CronJob('*/5 * * * * *', () => q.push(job), null, true, 'Europe/London')
