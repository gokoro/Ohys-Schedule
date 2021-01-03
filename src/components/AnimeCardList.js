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
            <Form>
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
                <AnimeCardPlaceholder />
            </Form>
        )
    }

    return (
        <Form>
            {data.data.map(item => (
                <AnimeCard
                    key={item._id}
                    id={item._id}
                    name={item.title[lang.lang] || item.title.romaji}
                    day={props.day}
                    time={item.released_time}
                    imageUrl={item.smallImageUrl}
                    placeholderColor={item.color}
                    href={`/anime/${item.name}`}
                />
            ))}
        </Form>
    )
}
const Form = ({children}) => (
    <div className="animecardlist">
        {children}
        <style jsx>{`
            .animecardlist {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                column-gap: 48px;
                row-gap: 36px;
            }
            @media screen and (max-width: 768px) {
                .animecardlist {
                    grid-template-columns: repeat(3, 1fr);
                }
            }
            @media screen and (max-width: 568px) {
                .animecardlist {
                    grid-template-columns: repeat(2, 1fr);
                    column-gap: 1rem;
                }
            }
        `}</style>
    </div>
)
export default AnimeCardList