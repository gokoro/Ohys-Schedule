import { BsClockFill } from 'react-icons/bs'
import Link from 'next/link'
import { urlFilter } from '../lib/urlFilter'

import { useRecoilValue } from 'recoil'
import { useSchedule } from '../hooks/useSchedule'

import { PreferredLanguageState } from '../states/preferredLanguage'

import Placeholder from './Placeholder'
import AnimeTimeInfo from './AnimeTimeInfo'

const AnimeList = props => {
    const lang = useRecoilValue(PreferredLanguageState)
    
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
                <AnimeListItem key={item._id} href={`/anime/${item._id}/${urlFilter(item.name)}`}>
                    <InfoWrapper 
                        title={item.title[lang] || item.title.romaji}
                        time={item.released_time}
                        broadcaster={item.release_broadcaster}
                        latestEpisode={item.items[item.items.length - 1]?.episode || 0}
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
        <Link href={props.href}>
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
                iconSrc={<BsClockFill />}
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