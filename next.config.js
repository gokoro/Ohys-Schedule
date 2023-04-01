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
    return {
      // afterFiles: [
      //   {
      //     source: '/404',
      //     destination: '/api/404',
      //   },
      // ],
      //     {
      //       source: '/js/script.js',
      //       destination: `${PLAUSIBLE_URL}/js/plausible.js`,
      //     },
      //     {
      //       source: '/api/event',
      //       destination: `${PLAUSIBLE_URL}/api/event`,
      //     },
    }
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/file/anilistcdn/media/anime/cover/medium/:slug',
  //       destination:
  //         'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/:slug',
  //       permanent: false,
  //     },
  //   ]
  // },
}
