import { useEffect } from 'react'
import { atom, selector, useSetRecoilState } from 'recoil'

import locale from '../locale'

export const PreferredLanguageState = atom({
  key: 'PreferredLanguageState',
  default: '',
})

export const LocaleMessageState = selector({
  key: 'LocaleMessageState',
  get: ({ get }) => {
    const currentLanguage = get(PreferredLanguageState)

    return locale[currentLanguage || 'romaji']
  },
})

export const SetPreferredLanguageComponent = () => {
  const setCurrentLanguage = useSetRecoilState(PreferredLanguageState)

  const setupLang = (lang) => {
    setCurrentLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  useEffect(() => {
    const storageLang = localStorage.getItem('lang')

    if (storageLang === null) {
      switch (navigator.language.toLowerCase().substr(0, 2)) {
        case 'ko':
          setupLang('korean')
          break
        case 'ja':
          setupLang('english')
          break
        case 'jp':
          setupLang('japanese')
          break
        default:
          setupLang('romaji')
          break
      }
    } else {
      setCurrentLanguage(storageLang)
    }
  }, [])

  return null
}
