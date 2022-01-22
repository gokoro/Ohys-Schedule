import { prismaClient } from '../libs/prisma'
import type {
  Prisma,
  Anime as DatabaseAnime,
  AnimeTorrent as DatabaseAnimeTorrent,
  AnimeTitle as DatabaseAnimeTitle,
  AnimeDescription as DatabaseAnimeDescription,
} from '@ohys/prisma-client'
import type {
  IAnimeTitle,
  IAnimeDescription,
  IAnimeRetrieveMetadata,
} from './interfaces'
import * as tmdb from './libs/get-tmdb-metadata'

type BatchPayload = Prisma.BatchPayload

export async function create(
  data: Prisma.AnimeCreateInput
): Promise<DatabaseAnime> {
  return await prismaClient.anime.create({ data })
}

export async function createMany(
  data: Prisma.AnimeCreateManyInput
): Promise<BatchPayload> {
  return await prismaClient.anime.createMany({ data, skipDuplicates: true })
}

export async function createTorrent(
  data: Prisma.AnimeTorrentCreateInput
): Promise<DatabaseAnimeTorrent> {
  return await prismaClient.animeTorrent.create({
    data,
  })
}

export async function createManyTorrent(
  data: Prisma.AnimeTorrentCreateManyInput[]
): Promise<BatchPayload> {
  return await prismaClient.animeTorrent.createMany({
    data,
    skipDuplicates: true,
  })
}

// export async function createTitle(
//   data: Prisma.AnimeTitleCreateInput | Prisma.AnimeTitleCreateManyInput
// ): Promise<DatabaseAnimeTitle | BatchPayload> {
//   return Array.isArray(data)
//     ? await prismaClient.animeTitle.createMany({ data, skipDuplicates: true })
//     : await prismaClient.animeTitle.create({
//         data,
//       })
// }

type TitleOrTitleArray<
  T extends Prisma.AnimeTitleCreateInput | Prisma.AnimeTitleCreateManyInput[]
> = T extends Prisma.AnimeTitleCreateInput
  ? Promise<DatabaseAnimeTitle>
  : Promise<BatchPayload>

export async function createTitle<
  T extends Prisma.AnimeTitleCreateInput | Prisma.AnimeTitleCreateManyInput[]
>(data: T): Promise<TitleOrTitleArray<T>> {
  return Array.isArray(data)
    ? await prismaClient.animeTitle.createMany({ data, skipDuplicates: true })
    : await prismaClient.animeTitle.create({
        data,
      })
}

export async function createDescription(
  data:
    | Prisma.AnimeDescriptionCreateInput
    | Prisma.AnimeDescriptionCreateManyInput
): Promise<DatabaseAnimeDescription | BatchPayload> {
  return Array.isArray(data)
    ? await prismaClient.animeDescription.createMany({
        data,
        skipDuplicates: true,
      })
    : await prismaClient.animeDescription.create({
        data,
      })
}

export async function getUnique(
  options: Prisma.AnimeFindUniqueArgs
): Promise<DatabaseAnime | null> {
  return await prismaClient.anime.findUnique(options)
}

export async function getFirst(
  options: Prisma.AnimeFindFirstArgs
): Promise<DatabaseAnime | null> {
  return await prismaClient.anime.findFirst(options)
}

export async function getTorrentUnique(
  options: Prisma.AnimeTorrentFindUniqueArgs
): Promise<DatabaseAnimeTorrent | null> {
  return await prismaClient.animeTorrent.findUnique(options)
}

export async function getTorrentFisrt(
  options: Prisma.AnimeTorrentFindFirstArgs
): Promise<DatabaseAnimeTorrent | null> {
  return await prismaClient.animeTorrent.findFirst(options)
}

export function inferSearsonNumber(
  title: string,
  counter = 1,
  initialNumbers?: RegExpMatchArray
): number {
  const numbers = initialNumbers ?? title.match(/\d/g)

  if (numbers === null) {
    return 1
  }

  if (numbers.length < counter) {
    return 1
  }

  const currentNumber = numbers[numbers.length - counter]

  // If It's considered that It's not a season number but something else like year.
  if (currentNumber.toString().length >= 2) {
    return inferSearsonNumber(title, counter + 1, numbers)
  }

  return parseInt(currentNumber)
}

export async function retrieveMetadata(
  name: string
): Promise<IAnimeRetrieveMetadata> {
  let season = 1

  const titles: IAnimeTitle[] = []
  const descriptions: IAnimeDescription[] = []

  const searchedItem = await tmdb.searchTVShow(name)
  const { id: seriesId } = searchedItem[0]

  const [details, translation] = await Promise.allSettled([
    tmdb.getTVShow(seriesId),
    tmdb.getTVShowTranslation(seriesId),
  ])

  if (details.status === 'rejected' || translation.status === 'rejected') {
    throw new Error('Metadata retrieiving failed.')
  }

  const {
    backdrop_path: bannerImage,
    poster_path: initPosterImage,
    seasons,
  } = details.value
  const { translations: rawTranslations } = translation.value

  /*
    Get poster image by extracting season number from the title.
  */

  const inferredSeasons = inferSearsonNumber(name)

  let posterImage = initPosterImage

  if (inferredSeasons !== 1) {
    seasons.some(({ season_number, poster_path }) => {
      if (season_number === inferredSeasons) {
        season = inferredSeasons
        posterImage = poster_path
        return true
      }
    })
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
    posterImage,
    bannerImage,
  }
}
