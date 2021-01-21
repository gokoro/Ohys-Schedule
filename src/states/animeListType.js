import { useEffect } from 'react'
import { atom, useSetRecoilState } from 'recoil'

export const animeListTypeState = atom({
  key: 'animeListTypeState',
  default: 'card',
})

export const SetAnimeListTypeComponent = () => {
  const setAnimeListType = useSetRecoilState(animeListTypeState)

  const setupType = (type) => {
    setAnimeListType(type)
    localStorage.setItem('listType', type)
  }

  useEffect(() => {
    const localListType = localStorage.getItem('listType')

    if (localListType === null) {
      setupType('card')
    } else {
      setupType(localListType)
    }
  }, [])

  return null
}
