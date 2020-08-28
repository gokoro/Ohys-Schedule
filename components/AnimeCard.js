import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'

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
                        width: 20%;
                        margin: 1rem;
                        position: relative;
                        min-height: 10vh;
                        transition: box-shadow 0.15s;
                        cursor: pointer;
                    }
                    :global(.animecard:hover) .top :global(img) {
                        box-shadow: 4px 8px 16px rgba(0,0,0,0.12);
                        filter: contrast(110%) brightness(100%);
                    }
                    .bottom {
                        margin-top: 8px;
                        background-color: transparent;
                        width: 100%;
                        border-radius: 4px 4px 5px 5px;
                    }
                    @media screen and (max-width: 568px) {
                        :global(.animecard) {
                            margin: 12px 4px;
                            width: 45%;
                        }
                    }
                `}</style>
            </motion.a>
        </Link>
    )
}
const AnimeCard = props => {
    const isImgLoaded = useAnimation()
    const { locale } = useContext(LanguageContext.Original)
    return (
        <AnimeCardForm
            id={props.id}
            top={<>
                    <motion.div className="imgLoader" initial='hidden' animate={isImgLoaded} transition={{duration: 0.3, delay: 0.1}} variants={{
                        hidden: {
                            opacity: 0
                        },
                        visible: {
                            opacity: 1
                        }
                    }}>
                        <img onLoad={() => isImgLoaded.start('visible')} className="rounded img" src={props.imageUrl} alt={props.name}/>
                    </motion.div>
                    <style jsx>{`
                        .img {
                            max-width: 100%;
                            max-height: 250px;
                            width: 100%;
                            box-shadow: var(--shadow-small);
                            filter: contrast(98%) brightness(98%);
                            transition: filter 0.1s, box-shadow 0.3s;
                        }
                        :global(.imgLoader) {
                            width: 100%;
                            height: 100%;
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
                        width: 180px;
                        min-height: 230px;
                    }
                    @media screen and (max-width: 568px) {
                        .image {
                            width: 150px;
                        }
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