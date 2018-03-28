import { Document, webpack, getRoutes } from './config'

const domainName = process.env.DOMAIN

export default {
  siteRoot: `https://${domainName}`,
  // preact: true,
  bundleAnalyzer: process.env.ANALYZE || false,
  getSiteData: () => ({ title: domainName }),
  getRoutes,
  webpack,
  Document
}
