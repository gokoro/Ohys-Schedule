const { apiUrl, apiBuildUrl } = process.env

module.exports = {
  env: {
    apiUrl,
    apiBuildUrl: apiBuildUrl || apiUrl,
  },
}
