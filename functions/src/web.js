import next from 'next'

const app = next({
  conf: {
    assetPrefix: process.env.LOCAL
      ? `/${process.env.GCP_PROJECT}/us-central1/${process.env.FUNCTION_NAME}`
      : ''
  }
})
const handle = app.getRequestHandler()

export const web = (req, res) => app.prepare().then(() => handle(req, res))
