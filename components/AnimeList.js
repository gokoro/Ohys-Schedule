import Link from 'next/link'

import { useContext } from 'react'
import { useSchedule } from '../hooks/useSchedule'

import LanguageContext from '../context/LanguageContext'

import Placeholder from './Placeholder'
import AnimeTimeInfo from './AnimeTimeInfo'

const AnimeList = props => {
    const langContext = useContext(LanguageContext.Original)
    
    const schedule = useSchedule(props.day)
    const data = schedule.data

    if (schedule.isLoading) {
        return (
            <div className="AnimeList">
                <AnimeListItem>
                    <LoadingWrapper />
                </AnimeListItem>
                <AnimeListItem>
                    <LoadingWrapper />
                </AnimeListItem>
                <AnimeListItem>
                    <LoadingWrapper />
                </AnimeListItem>
                <AnimeListItem>
                    <LoadingWrapper />
                </AnimeListItem>
                <AnimeListItem>
                    <LoadingWrapper />
                </AnimeListItem>
            </div>
        )
    }

    return (
        <div className="AnimeList">
            {data.data.map(item => (
                <AnimeListItem key={item._id} id={item._id}>
                    <InfoWrapper 
                        title={item.title[langContext.lang]}
                        time={item.released_time}
                        broadcaster={item.release_broadcaster}
                        latestEpisode={item.items[item.__v - 1].episode}
                    />
                </AnimeListItem>
            ))}
            <style jsx>{`
            `}</style>
        </div>
    )
}

const AnimeListItem = props => {
    return (
        <Link href='/anime/[id]' as={`/anime/${props.id}`}>
            <a className="AnimeListItem">
                <div className="wrapper">
                    {props.children}
                </div>
                <style jsx>{`
                    .AnimeListItem {
                        display: block;
                        margin-bottom: 20px;
                        height: fit-content;
                        min-height: 90%;
                        color: #000000;
                        background: #FFFFFF;
                        box-shadow: var(--shadow-small);
                        transition: box-shadow 0.1s;
                    }
                    .AnimeListItem:hover {
                        box-shadow: var(--shadow-default);
                    }
                    .wrapper {
                        height: 100%;
                        border-left: 8px solid #86d8c9;
                        border-bottom: 1px solid rgba(34,36,38,.15);
                        padding: 16px;
                        transition: all 0.1s;
                    }
                    .wrapper:hover {
                        border-left: 8px solid #75b8ab;
                        background-color: rgb(250, 250, 250);
                    }
                `}</style>
            </a>
        </Link>
    )
}
const InfoWrapper = props => {
    return (
        <div className="infowrapper">
            <AnimeTimeInfo 
                iconSrc='/svg/clock-icon.svg'
                text={`${props.time} | ${props.broadcaster} | Ep. ${props.latestEpisode}`}
            />
            {props.title}
            <style jsx>{`
                .infowrapper :global(.AnimeTimeInfo) {
                    margin-bottom: 0;
                    font-size: 12px;
                }
                .infowrapper :global(.AnimeTimeInfo img) {
                    width: 10px;
                }
                @media screen and (max-width: 568px) {
                    .infowrapper :global(.AnimeTimeInfo) {
                        margin-bottom: 0;
                    }
                }
            `}</style>
        </div>
    )
}
const LoadingWrapper = () => {
    return (
        <Placeholder 
            lineCountFor={2}
        />
    )
}
export default AnimeList