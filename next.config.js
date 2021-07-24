const { apiUrl, apiBuildUrl, apiSearchUrl, googleAnalyticsTag } = process.env

module.exports = {
  env: {
    apiUrl,
    apiSearchUrl,
    apiBuildUrl: apiBuildUrl || apiUrl,
    googleAnalyticsTag,
  },
  images: { domains: ['s4.anilist.co'] },
}
