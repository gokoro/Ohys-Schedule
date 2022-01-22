import { CronJob } from 'cron'
import { torrentCron } from '../configs'
import * as anime from '../animes'
import { getRaws, getNyaa } from '../animes/libs/get-torrents'
import type { IAnimeTorrent } from '../animes/interfaces'
import type { Prisma } from '@ohys/prisma-client'

type Fetcher = () => Promise<IAnimeTorrent[]>

interface IUpdateTorrentProps {
  provider: string
  fetcher: Fetcher
  cache: Cache
}

interface ITorrentHashCache {
  [provider: string]: string
}

interface IFetchingStatus {
  [provider: string]: boolean
}

const isFetching: IFetchingStatus = {}

class Cache {
  private providerhash: ITorrentHashCache

  constructor() {
    this.providerhash = {}
  }

  getHash(provider: string) {
    return this.providerhash[provider]
  }

  setHash({ provider, hash }: { provider: string; hash: string }) {
    this.providerhash[provider] = hash
    return this.providerhash
  }
}

async function getUnparsedItem(hashList: string[]): Promise<[number, number]> {
  for (let i = 0; i < hashList.length; i++) {
    const existingItem = await anime.getTorrentUnique({
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

export async function updateTorrent({
  provider,
  fetcher,
  cache,
}: IUpdateTorrentProps): Promise<void> {
  /* 
    Generate hash if there's not.
  */

  // if (!cache.getHash(provider)) {
  if (cache.getHash(provider)) {
    const checkingItem = await anime.getTorrentFisrt({
      where: { fileProvider: provider },
    })

    if (checkingItem === null) {
      throw new Error(
        'No torrent file detected. You should run the initializing script first.'
      )
    }

    const { hash } = checkingItem

    cache.setHash({ provider, hash })
  }

  /*
    Get torrents from the sources.
  */

  const fetchedTorrent = await fetcher()
  const firstItem = fetchedTorrent[0]

  /*
    Return if there's a matching item with the existing item.
  */

  if (cache.getHash(provider) === firstItem.hash) {
    return
  }

  const [firstRange, lastRange] = await getUnparsedItem(
    fetchedTorrent.map(({ hash }) => hash)
  )

  const itemsToInsert: Prisma.AnimeTorrentCreateManyInput[] = []

  for (let i = lastRange; i >= firstRange; i--) {
    let seriesId: number

    /*
      Check if there's a series that matches with a new item.
    */

    const item = fetchedTorrent[i]
    const existingSeries = await anime.getUnique({
      where: { name: item.fileName },
    })

    if (existingSeries === null) {
      const { titles, descriptions, season, posterImage, bannerImage } =
        await anime.retrieveMetadata(item.fileName)

      const { id: createdid } = await anime.create({
        name: item.fileName,
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
        season,
        posterImage,
        bannerImage,
      })

      seriesId = createdid
    } else {
      seriesId ??= existingSeries.id
    }

    /*
      Loop for each torrent from the end.
    */

    itemsToInsert.push({
      fileProvider: provider,
      ...fetchedTorrent[i],
      animeId: seriesId,
    })
  }

  await anime.createManyTorrent(itemsToInsert)
}

export function getFetchingStatus(provider: string): boolean | undefined {
  return isFetching[provider]
}

export function changeFetchingStatus(provider: string): void {
  isFetching[provider] = !isFetching[provider]
}

export async function runForEachProvider(): Promise<void> {
  const cache = new Cache()

  const fetcherList: IUpdateTorrentProps[] = [
    { provider: 'raws', fetcher: () => getRaws(1), cache },
    { provider: 'nyaa', fetcher: () => getNyaa(1), cache },
  ]

  for (const options of fetcherList) {
    if (getFetchingStatus(options.provider)) {
      return
    }

    changeFetchingStatus(options.provider)

    await updateTorrent(options)

    changeFetchingStatus(options.provider)
  }
}

export function createCron(): CronJob {
  return new CronJob(torrentCron, runForEachProvider, null, false)
}
