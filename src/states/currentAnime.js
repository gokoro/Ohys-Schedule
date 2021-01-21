import { atom } from 'recoil'

export const currentAnimeState = atom({
  key: 'currentAnimeState',
  default: null,
})

export const currentAnimeIndexState = atom({
  key: 'currentAnimeIndex',
  default: -1,
})
