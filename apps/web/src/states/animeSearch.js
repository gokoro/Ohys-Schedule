import { atom } from 'recoil'

export const animeSearchKeywordState = atom({
  key: 'animeSearchKeywordState',
  default: '',
})

export const animeSearchActiveState = atom({
  key: 'animeSearchActiveState',
  default: false,
})
