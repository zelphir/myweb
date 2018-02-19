const CronJob = require('cron').CronJob
const queue = require('async/queue')

const NUMBER_CONCURRENT_JOBS = 1

const q = queue((task, callback) => {
  task(callback)
}, NUMBER_CONCURRENT_JOBS)

const job = callback => {
  setTimeout(function() {
    console.log('JOB EXECUTED')
    callback()
  }, 1000)
}

new CronJob('*/5 * * * * *', () => q.push(job), null, true, 'Europe/London')
