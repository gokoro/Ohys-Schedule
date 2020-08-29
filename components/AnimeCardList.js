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

    const sliceSize = lang.lang === 'korean' || lang.lang === 'japanese' ? 13 : 20 

    return (
        <Form>
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
                row-gap: 40px;
            }
            @media screen and (max-width: 768px) {
                .animecardlist {
                    grid-template-columns: repeat(3, 1fr);
                }
            }
            @media screen and (max-width: 568px) {
                .animecardlist {
                    grid-template-columns: repeat(2, 1fr);
                    column-gap: 2rem;
                }
            }
        `}</style>
    </div>
)
export default AnimeCardList