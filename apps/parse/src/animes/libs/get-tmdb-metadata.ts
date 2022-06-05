import got from 'got'
import { tmdbUrl, tmdbApiKey } from '../../configs'
import type {
  ITMDBSearchData,
  ITMDBSearchDataResponse,
  ITMDBTVShowResponse,
  ITMDBTVShowImageResponse,
  ITMDBTVShowTranslationResponse,
  ITMDBTVShowSeasonTranslationResponse,
} from '../interfaces'

const client = got.extend({
  prefixUrl: tmdbUrl,
  searchParams: {
    api_key: tmdbApiKey,
    language: 'ja',
  },
})

export async function searchTVShow(text: string): Promise<ITMDBSearchData[]> {
  const data = await client
    .get('search/tv', {
      searchParams: { query: text },
    })
    .json<ITMDBSearchDataResponse>()

  return data.results
}

export async function getTVShow(id: number): Promise<ITMDBTVShowResponse> {
  const data = await client.get(`tv/${id}`).json<ITMDBTVShowResponse>()

  return data
}

export async function getTVShowImage(
  id: number
): Promise<ITMDBTVShowImageResponse> {
  const data = await client
    .get(`tv/${id}/images`)
    .json<ITMDBTVShowImageResponse>()

  return data
}

export async function getTVShowTranslation(
  id: number
): Promise<ITMDBTVShowTranslationResponse> {
  const data = await client
    .get(`tv/${id}/translations`)
    .json<ITMDBTVShowTranslationResponse>()

  return data
}

export async function getTVShowSeasonTranslation(
  id: number,
  season: number
): Promise<ITMDBTVShowSeasonTranslationResponse> {
  const data = await client
    .get(`tv/${id}/season/${season}/translations`)
    .json<ITMDBTVShowSeasonTranslationResponse>()

  return data
}
