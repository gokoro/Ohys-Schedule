const { apiUrl, apiBuildUrl, apiSearchUrl, googleAnalyticsTag } = process.env

const PLAUSIBLE_URL = process.env.PLAUSIBLE_URL || 'https://plausible.io'

module.exports = {
  env: {
    apiUrl,
    apiSearchUrl,
    apiBuildUrl: apiBuildUrl || apiUrl,
    googleAnalyticsTag,
  },

  images: { domains: ['s4.anilist.co'] },

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

  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: `https://www.google-analytics.com/analytics.js`,
      },
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/js/script.js',
  //       destination: `${PLAUSIBLE_URL}/js/plausible.js`,
  //     },
  //     {
  //       source: '/api/event',
  //       destination: `${PLAUSIBLE_URL}/api/event`,
  //     },
  //   ]
  // },
}
