const { apiUrl, apiBuildUrl, googleAnalyticsTag } = process.env

module.exports = {
  env: {
    apiUrl,
    apiBuildUrl: apiBuildUrl || apiUrl,
    googleAnalyticsTag,
  },
  images: { domains: ['s4.anilist.co'] },
}
