import { Document, webpack, getRoutes } from './config'

export default {
  siteRoot: 'https://robertomanzella.com',
  bundleAnalyzer: process.env.ANALYZE || false,
  getSiteData: () => ({ title: 'robertomanzella.com' }),
  getRoutes,
  webpack,
  Document
}
