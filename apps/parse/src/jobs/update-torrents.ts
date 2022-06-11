import { CronJob } from 'cron'
import { prisma } from '../libs/prisma'
import { torrentCron } from '../configs'
import * as anime from '../animes'
import { getRaws, getNyaa } from '../animes/libs/get-torrents'
import type { IUpdateTorrentProps } from '../animes/interfaces'

interface IFetchingStatus {
  [provider: string]: boolean
}

export class FetchingStatus {
  private static isFetching: IFetchingStatus = {}

  static get(provider: string): boolean | undefined {
    return FetchingStatus.isFetching[provider]
  }

  static change(provider: string): boolean {
    const toChange = !FetchingStatus.isFetching[provider]
    FetchingStatus.isFetching[provider] = toChange

    return toChange
  }
}

export async function executeFetching(
  cache: anime.LatestTorrentCache
): Promise<void> {
  const fetcherList: IUpdateTorrentProps[] = [
    { provider: 'raws', fetcher: () => getRaws(1), cache },
    { provider: 'nyaa', fetcher: () => getNyaa(1), cache },
  ]

  for (const options of fetcherList) {
    const { provider } = options

    if (FetchingStatus.get(provider)) {
      return
    }

    /* 
      Generate hash if there's not.
    */

    if (cache && cache.getHash(provider)) {
      const checkingItem = await prisma.animeTorrent.findFirst({
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

    FetchingStatus.change(options.provider)

    await anime.updateTorrent(options)

    FetchingStatus.change(options.provider)
  }
}

export function createCron(): CronJob {
  const cache = new anime.LatestTorrentCache()

  return new CronJob(torrentCron, () => executeFetching(cache), null, false)
}
