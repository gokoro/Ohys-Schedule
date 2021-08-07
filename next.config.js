const { apiUrl, apiBuildUrl, apiSearchUrl, googleAnalyticsTag } = process.env

module.exports = {
  env: {
    apiUrl,
    apiSearchUrl,
    apiBuildUrl: apiBuildUrl || apiUrl,
    googleAnalyticsTag,
  },

  images: { domains: ['s4.anilist.co'] },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
