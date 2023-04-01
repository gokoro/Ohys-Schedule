const { apiUrl, apiBuildUrl, apiSearchUrl, googleAnalyticsTag } = process.env

const PLAUSIBLE_URL = process.env.PLAUSIBLE_URL || 'https://plausible.io'

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  env: {
    apiUrl,
    apiSearchUrl,
    apiBuildUrl: apiBuildUrl || apiUrl,
    googleAnalyticsTag,
  },

  experimental: {
    nextScriptWorkers: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
