import { CronJob } from 'cron'
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
    if (FetchingStatus.get(options.provider)) {
      return
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
