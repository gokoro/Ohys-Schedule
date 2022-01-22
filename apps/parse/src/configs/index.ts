export const databaseUrl = process.env.DATABASE_URL ?? ''

export const tmdbUrl = process.env.TMDB_URL ?? 'https://api.themoviedb.org/3/'
export const tmdbApiKey = process.env.TMDB_API_KEY ?? ''

export const anilistUrl =
  process.env.ANILIST_URL ?? 'https://graphql.anilist.co'

export const torrentCron = process.env.TORRENT_CRON ?? '*/10 * * * * *' // Every 10 second
