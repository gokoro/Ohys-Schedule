import Link from 'next/link'
import { motion } from 'framer-motion'

import Placeholder from './Placeholder'

import { useContext } from 'react'

import LanguageContext from '../context/LanguageContext'

const animated = {
    hidden: {
        opacity: 0.2,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        scale: 1
    },
}
const AnimeCardForm = props => {
    return (
        <Link href="/anime/[id]" as={`/anime/${props.id}`}>
            <motion.a className='animecard' initial='hidden' animate="visible" transition={{duration: 0.3}} variants={animated}>
                <div className="top">
                    {props.top}
                </div>
                <div className="bottom">
                    {props.bottom}
                </div>
                <style jsx>{`
                    :global(.animecard) {
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        transition: box-shadow 0.15s;
                        cursor: pointer;
                    }
                    :global(.animecard:hover) .top :global(.img) {
                        box-shadow: 4px 8px 16px rgba(0,0,0,0.12);
                        filter: contrast(110%) brightness(100%);
                    }
                    .bottom {
                        margin-top: 10px;
                        background-color: transparent;
                        width: 100%;
                        border-radius: 4px 4px 5px 5px;
                    }
                `}</style>
            </motion.a>
        </Link>
    )
}
const AnimeCard = props => {
    const { locale } = useContext(LanguageContext.Original)
    return (
        <AnimeCardForm
            id={props.id}
            top={<>
                    <motion.div className="imgLoader" initial='hidden' animate="visible" transition={{duration: 0.3, delay: 0.1}} variants={{
                        hidden: {
                            opacity: 0
                        },
                        visible: {
                            opacity: 1
                        }
                    }}>
                        <div className="rounded img" />
                    </motion.div>
                    <style jsx>{`
                        :global(.imgLoader) {
                            min-width: 100%;
                            height: 15.8vw;
                        }
                        .img {
                            width: 100%;
                            height: 100%;
                            background-image: url('${props.imageUrl}');
                            background-size: cover;
                            box-shadow: var(--shadow-small);
                            filter: contrast(98%) brightness(98%);
                            transition: filter 0.1s, box-shadow 0.3s;
                        }
                        @media screen and (max-width: 1080px) {
                            :global(.imgLoader) {
                                height: 22.5vw;
                            }
                        }   
                        @media screen and (max-width: 768px) {
                            :global(.imgLoader) {
                                height: 29.3vw;
                            }
                        }   
                        @media screen and (max-width: 568px) {
                            :global(.imgLoader) {
                                height: 50.6vw;
                            }
                        }   
                    `}</style>
            </>}
            bottom={<>
                <div className="sub bold">{locale.common.day[props.day]} {props.time}</div>
                <div className="title bold">{props.name}</div>
                <style jsx>{`
                    .title {
                        font-size: 14px;
                        color: #000000;
                    }
                    .sub {
                        color: var(--sub-text-color);
                        font-size: 12px;
                        letter-spacing: 0;
                        line-height: 16px;
                    }
                    @media screen and (max-width: 568px) {
                        .title {
                            font-size: 14px;
                        }
                        .sub {
                            font-size: 10px;
                        }
                    }
                `}</style>
            </>}
        />
    )
}
const AnimeCardPlaceholder = () => {
    return (
        <AnimeCardForm 
            top={<>
                <div className="ui placeholder">
                    <div className="image"></div>
                </div>
                <style jsx>{`
                    .image {
                        width: 100%;
                        min-height: 230px;
                    }
                `}</style>
            </>}
            bottom={<>
                <Placeholder lineCountFor={2}/>
            </>}
        />
    )
}
export {
    AnimeCard,
    AnimeCardPlaceholder
}