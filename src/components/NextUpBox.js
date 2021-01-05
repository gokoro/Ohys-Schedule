import { BsArrowRight } from 'react-icons/bs'
import { urlFilter } from '../lib/urlFilter'

import Link from 'next/link'

import { useContext } from 'react'
import { useTimeDistance } from '../hooks/useTimeDistance'

import LanguageContext from '../context/LanguageContext'

import AnimeInfoSection from './AnimeInfoSection'
import AnimeRemainTimeSection from './AnimeRemainTimeSection'

const NextUpBox = props => {
    const langContext = useContext(LanguageContext.Original)
    const { nextUpAnime } = props

    const distance = useTimeDistance(nextUpAnime.released_time || null)

    const isOnAir = distance.day < 0 || distance.hour < 0 || distance.minute < 0 || distance.second < 0

    return (
        <>
            <Link href={`/anime/${nextUpAnime._id}/${urlFilter(nextUpAnime.name)}`}>
                <a className="link">
                    <div className="container">
                        <div className="left item">
                            <img src={nextUpAnime.imageUrl} alt={nextUpAnime.name}/>
                        </div>
                        <div className="right item">
                            <AnimeInfoSection 
                                day={props.dayOfWeek}
                                time={nextUpAnime.released_time}
                                broadcaster={nextUpAnime.release_broadcaster}
                                title={nextUpAnime.title[langContext.lang]}
                                isOnAir={isOnAir}
                                margin='22px 0'
                            />
                            <AnimeRemainTimeSection 
                                isOnAir={isOnAir}
                                airingTime={distance}
                            />
                            <div className="seeDetails bold">
                                <BsArrowRight 
                                    size={24}
                                    style={{ marginRight: '4px' }}
                                />
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            <style jsx>{`
                .link {
                    color: #000000;
                }
                .container {
                    display: flex;
                    position: relative;
                    box-shadow: var(--shadow-medium);
                    transition: box-shadow 0.1s;
                    min-height: 250px;
                }
                .container:hover {
                    box-shadow: var(--shadow-big);
                }
                .container .item {
                    flex: none;
                }
                .container .left.item img {
                    width: 180px;
                    height: 100%;
                    filter: contrast(90%);
                    transition: filter 0.3s;
                }
                .container:hover .left.item img {
                    filter: contrast(110%);
                }
                .container .right.item {
                    margin-left: 26px;
                    padding: 14px 0;
                    flex: 1 1 0;
                }
                .container .right.item :global(.remainedTime) {
                    font-size: 20px;
                    font-weight: bold;
                }
                .container .seeDetails {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    right: 18px;
                    bottom: 23px;
                    font-size: 16px;
                }
                @media screen and (max-width: 568px) {
                    .container {
                        flex-direction: column-reverse;
                        min-height: initial;
                    }
                    .container .left.item {
                        padding: 0;
                    }
                    .container .left.item img {
                        width: 100%;
                    }
                    .container .right.item {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        margin: 0;
                        padding: 20px 26px 24px;
                        background-color: #FFFFFF;
                        box-shadow: 0px -50px 30px rgba(0,0,0, 0.20);
                    }
                    .container .right.item :global(.remainedTime) {
                        font-size: 18px;
                    }
                    .container .right.item :global(.AnimeInfoSection) {
                        margin: 0 0 14px;
                    }
                }
            `}</style>
        </>
    )
}
export default NextUpBox