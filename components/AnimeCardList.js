import { motion } from 'framer-motion'

import { AnimeCard, AnimeCardPlaceholder } from './AnimeCard'

import { useContext } from 'react'
import { useSchedule } from '../hooks/useSchedule'

import LanguageContext from '../context/LanguageContext'

const AnimeCardList = props => {
    const lang = useContext(LanguageContext.Original)

    const schedule = useSchedule(props.day)
    const data = schedule.data

    if (schedule.isLoading) {
        return (
            <div className="animecardlist">
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <style jsx>{`
                    .animecardlist {
                        display: flex;
                        flex-flow: row wrap;
                    }
                    .animecardlist :global(.animecard) {
                        flex: none;
                    }
                `}</style>
            </div>
        )
    }

    const sliceSize = lang.lang === 'korean' || lang.lang === 'japanese' ? 13 : 20 

    return (
        <div className="animecardlist">
            {data.data.map(item => (
                <AnimeCard
                    key={item._id}
                    id={item._id}
                    name={item.title[lang.lang].length > sliceSize ? item.title[lang.lang].slice(0, sliceSize) + '...' : item.title[lang.lang]}
                    day={props.day}
                    time={item.released_time}
                    imageUrl={item.smallImageUrl}
                    placeholderColor={item.color}
                />
            ))}
            <style jsx>{`
                .animecardlist {
                    display: flex;
                    flex-flow: row wrap;
                }
                .animecardlist :global(.animecard) {
                    flex: none;
                }
                @media screen and (max-width: 568px) {
                    .animecardlist {
                        justify-content: space-between;
                    }
                }
            `}</style>
        </div>
    )
}
export default AnimeCardList