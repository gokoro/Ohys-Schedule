import { createContext, useState, useEffect } from 'react'
import locale from '../locale'

const Context = createContext()

const LanguageProvider = props => {
    const [lang, setLang] = useState()
    
    const setupLang = lang => {
        setLang(lang)
        localStorage.setItem('lang', lang)
    }

    useEffect(() => {
        const storageLang = localStorage.getItem('lang')

        if (storageLang === null) {
            switch (navigator.language.toLowerCase().substr(0,2)) {
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
            setLang(storageLang)
        }
    }, [])

    return (
        <Context.Provider value={{
            lang,
            setLang: setupLang,
            locale: locale[lang || 'romaji']
        }}>
            {props.children}
        </Context.Provider>
    )
}
export default {
    Provider: LanguageProvider,
    Consumer: Context.Consumer,
    Original: Context
}