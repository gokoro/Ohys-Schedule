import { prisma } from '../libs/prisma'
import { Prisma, Anime } from '@ohys/prisma-client'
import type {
  IAnimeTitle,
  IAnimeDescription,
  IAnimePosterImage,
  IAnimeBannerImage,
  IAnimeRetrieveMetadata,
  IUpdateTorrentProps,
  ITorrentHashCache,
  IAnimeCreateSeries,
} from './interfaces'
import * as tmdb from './libs/get-tmdb-metadata'
import * as anilist from './libs/get-anilist-metadata'
import { getRetried } from './libs/retry'
import { encodeImageToBlurhash } from '../libs/blurhash'

const TMDB_IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/original'

export async function getProperSeasonNumber(
  name: string,
  tmdbID: number
): Promise<number | undefined> {
  const { seasons: rawTMDBSeasons } = await tmdb.getTVShow(tmdbID)

  const tmdbSeasons = rawTMDBSeasons.map((season) => {
    const [year, month] = (season.air_date || '').split('-')

    return {
      number: season.season_number,
      airDate: {
        year: parseInt(year),
        month: parseInt(month),
      },
    }
  })

  const anilistData = await anilist.handledFetchdate(name)

  if (!anilistData) {
    return
  }

  const { year: ALYear, month: ALMonth } = anilistData.Media.startDate

  const currentSeason = tmdbSeasons.find(
    ({ airDate }) => airDate.year === ALYear && airDate.month === ALMonth
  )

  return currentSeason?.number
}

export async function retrieveMetadata(
  name: string
): Promise<IAnimeRetrieveMetadata> {
  let season: number | undefined

  const titles: IAnimeTitle[] = []
  const descriptions: IAnimeDescription[] = []
  const posterImages: IAnimePosterImage[] = []
  const bannerImages: IAnimeBannerImage[] = []

  const searchedItem = await getRetried(
    name,
    tmdb.searchTVShow,
    (data) => data.length > 0
  )

  if (!searchedItem) {
    return {
      titles,
      descriptions,
      season,
      posterImages,
      bannerImages,
      isManualNeeded: true,
    }
  }

  const { id: seriesId } = searchedItem[0]

  const [details, translation] = await Promise.allSettled([
    tmdb.getTVShow(seriesId),
    tmdb.getTVShowTranslation(seriesId),
  ])

  if (details.status === 'rejected' || translation.status === 'rejected') {
    throw new Error('Metadata retrieiving failed.')
  }

  const {
    backdrop_path: tmdbBannerImage,
    poster_path: initTmdbPosterImage,
    seasons,
  } = details.value
  const { translations: rawTranslations } = translation.value

  /*
    Get poster image by extracting season number from the title.
  */

  const inferredSeasons = await getProperSeasonNumber(name, seriesId)

  if (!inferredSeasons) {
    return {
      titles,
      descriptions,
      season,
      posterImages,
      bannerImages,
      isManualNeeded: true,
    }
  }

  let tmdbPosterImage = initTmdbPosterImage

  seasons.some(({ season_number, poster_path }) => {
    if (season_number === inferredSeasons) {
      season = inferredSeasons
      tmdbPosterImage = poster_path
      return true
    }
  })

  if (tmdbPosterImage) {
    posterImages.push({
      provider: 'tmdb',
      path: TMDB_IMAGE_BASE_URL + tmdbPosterImage,
      blurHash: await encodeImageToBlurhash(
        TMDB_IMAGE_BASE_URL + tmdbPosterImage
      ),
    })
  }

  if (tmdbBannerImage) {
    bannerImages.push({
      provider: 'tmdb',
      path: TMDB_IMAGE_BASE_URL + tmdbBannerImage,
    })
  }

  /*
    Get images from Anilist
  */

  const anilistImageData = await anilist.handledFetchImage(name)

  if (anilistImageData) {
    const {
      coverImage: { extraLarge: coverImage },
      bannerImage,
    } = anilistImageData.Media

    if (coverImage) {
      posterImages.push({
        provider: 'anilist',
        path: coverImage,
        blurHash: await encodeImageToBlurhash(coverImage),
      })
    }

    if (bannerImage) {
      bannerImages.push({ provider: 'anilist', path: bannerImage })
    }
  }

  /*
    Set translations.
  */

  rawTranslations.forEach(
    ({ iso_639_1: language, data: { name: title, overview: description } }) => {
      titles.push({ language, title })
      descriptions.push({ language, description })
    }
  )

  return {
    titles,
    descriptions,
    season,
    posterImages,
    bannerImages,
  }
}

export class LatestTorrentCache {
  private providerhash: ITorrentHashCache

  constructor() {
    this.providerhash = {}
  }

  getHash(provider: string): string {
    return this.providerhash[provider]
  }

  setHash({
    provider,
    hash,
  }: {
    provider: string
    hash: string
  }): ITorrentHashCache {
    this.providerhash[provider] = hash
    return this.providerhash
  }
}

export async function filterUnparsedItem(
  hashList: string[]
): Promise<[number, number]> {
  for (let i = 0; i < hashList.length; i++) {
    const existingItem = await prisma.animeTorrent.findUnique({
      where: { hash: hashList[i] },
    })
    const isExist = existingItem !== null

    // If the first item matches with the hash.
    if (isExist && i === 0) {
      return [-1, -1]
    }

    // If the first or later item doesn't exist.
    if (!isExist && i >= 0) {
      continue
    }

    // If the second or later one exists.
    if (isExist && i > 0) {
      return [0, i - 1]
    }
  }

  return [0, hashList.length - 1]
}

export async function createSeries({
  name,
  titles,
  descriptions,
  posterImages,
  bannerImages,
  season,
  isManualNeeded,
}: IAnimeCreateSeries): Promise<Anime> {
  return await prisma.anime.create({
    data: {
      name,
      titles: {
        createMany: {
          data: titles,
        },
      },
      descriptions: {
        createMany: {
          data: descriptions,
        },
      },
      posterImages: {
        createMany: {
          data: posterImages,
        },
      },
      bannerImages: {
        createMany: {
          data: bannerImages,
        },
      },
      season,
      isManualNeeded,
    },
  })
}

export async function updateTorrent({
  provider,
  fetcher,
  cache,
}: IUpdateTorrentProps): Promise<void> {
  /*
    Get torrents from the sources.
  */

  const fetchedTorrent = await fetcher()
  const [firstItem] = fetchedTorrent

  /*
    Return if there's a matching item with the existing item.
  */

  if (cache && cache.getHash(provider) === firstItem.hash) {
    return
  }

  const [firstRange, lastRange] = await filterUnparsedItem(
    fetchedTorrent.map(({ hash }) => hash)
  )

  if (firstRange === lastRange) {
    return
  }

  const data: Prisma.AnimeTorrentCreateManyInput[] = []

  for (let i = lastRange; i >= firstRange; i--) {
    let seriesId: number

    /*
      Check if there's a series that matches with a new item.
    */

    const item = fetchedTorrent[i]
    const existingSeries = await prisma.anime.findUnique({
      where: { name: item.fileName },
    })

    if (existingSeries === null) {
      const metadata = await retrieveMetadata(item.fileName)

      const { id: createdId } = await createSeries({
        name: item.fileName,
        ...metadata,
      })

      seriesId = createdId
    } else {
      seriesId = existingSeries.id
    }

    /*
      Loop for each torrent from the end.
    */

    data.push({
      fileProvider: provider,
      ...fetchedTorrent[i],
      animeId: seriesId,
    })
  }

  await prisma.animeTorrent.createMany({ data })
}
