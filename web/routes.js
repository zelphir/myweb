const staticRoutes = require('./routes.json')
const routes = (module.exports = require('next-routes')())

routes
  .add('blog-post', '/blog/:slug')
  .add('photos', '/photos/:country')
  .add('photo', '/photo/:id')

Object.entries(staticRoutes).map(([id, data]) => routes.add(id, data.path, 'index'))
