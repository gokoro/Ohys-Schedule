import { GraphQLClient, gql, ClientError } from 'graphql-request'
import { anilistUrl } from '../../configs'
import { getShortened } from './retry'
import retry from 'async-retry'

const client = new GraphQLClient(anilistUrl)

async function handleRateLimit<T>(fn: () => Promise<T>) {
  return await retry(fn, { retries: 1, minTimeout: 91 * 1000 })
}

async function handleRetry<T>(
  fn: (name: string) => Promise<T>,
  name: string
): Promise<T | undefined> {
  let data: Awaited<T>

  try {
    data = await fn(name)
  } catch (error) {
    if (error instanceof ClientError) {
      if (error.response.status === 404) {
        const shortenName = getShortened(name)

        if (!shortenName) {
          return
        }

        return await handleRetry(fn, shortenName)
      }

      if (error.response.status === 429) {
        return await handleRateLimit(() => handleRetry(fn, name))
      }
    }

    return await handleRetry(fn, name)
  }

  return data
}

export const PosterImageQuery = gql`
  query ($name: String) {
    Media(search: $name, type: ANIME) {
      bannerImage
      coverImage {
        extraLarge
      }
    }
  }
`

export interface IPostImage {
  Media: {
    bannerImage: string
    coverImage: {
      extraLarge: string
    }
  }
}

export async function fetchImage(
  name: string
): Promise<IPostImage | undefined> {
  return await client.request<IPostImage>(PosterImageQuery, { name })
}

export async function handledFetchImage(
  ...params: Parameters<typeof fetchImage>
): ReturnType<typeof fetchImage> {
  return await handleRetry(fetchImage, ...params)
}

export const DateQuery = gql`
  query ($name: String) {
    Media(search: $name, type: ANIME) {
      startDate {
        year
        month
        day
      }
    }
  }
`

export interface IDate {
  Media: {
    startDate: {
      year: number
      month: number
      day: number
    }
  }
}

export async function fetchDate(name: string): Promise<IDate | undefined> {
  return await client.request<IDate>(DateQuery, { name })
}

export async function handledFetchdate(
  ...params: Parameters<typeof fetchDate>
): ReturnType<typeof fetchDate> {
  return await handleRetry(fetchDate, ...params)
}
