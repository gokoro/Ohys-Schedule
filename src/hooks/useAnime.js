import useSWR, { cache } from 'swr'
import { api, searchApi } from '../lib/api'

const useAnime = (id, configs = {}) => {
  const baseUrl = `/anime`

  if (configs.initialData) {
    cache.set([baseUrl, id], configs.initialData)
  }

  const { data, error } = useSWR(
    [baseUrl, id],
    (url, id) => fetcher(url, { id }),
    configs
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

const useAnimeName = (name, configs = {}) => {
  const baseUrl = `/anime`

  if (configs.initialData) {
    cache.set([baseUrl, name], configs.initialData)
  }

  const { data, error } = useSWR(
    [baseUrl, name],
    (url, name) => fetcher(url, { name }),
    configs
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

const useAnimeSearch = (title) => {
  const baseUrl = `/search`

  const { data, error } = useSWR([baseUrl, title], searchFetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

const fetcher = (url, params) =>
  api.get(url, { params }).then((res) => res.data)

const searchFetcher = (url, title) =>
  searchApi
    .get(url, {
      params: {
        title,
      },
    })
    .then((res) => res.data)

export { useAnime, useAnimeName, useAnimeSearch }
