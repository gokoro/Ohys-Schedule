import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.apiUrl,
})

export const buildApi = axios.create({
  baseURL: process.env.apiBuildUrl,
})

export const searchApi = axios.create({
  baseURL: process.env.apiSearchUrl,
})
