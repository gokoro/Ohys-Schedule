import Head from 'next/head'
import { motion } from 'framer-motion'

import Placeholder from './Placeholder'
import { AnimeEpisodeListItem } from './AnimeEpisodeList'

import LanguageContext from '../context/LanguageContext'

import { useAnime } from '../hooks/useAnime'
import { useContext } from 'react'

const AnimeDetails = props => {
    const lang = useContext(LanguageContext.Original)

    const res = useAnime(props.animeId)

    const animated = {
        hidden: {
            opacity: 0.2,
        },
        visible: {
            opacity: 1,
        },
    }
    const epAnimated = {
        hidden: {
            opacity: 0,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            scale: 1,
        },
    }
    return (
        <motion.div initial='hidden' animate="visible" transition={{duration: 0.5}} variants={animated}>
        <div className="animedetails">
            {!res.isLoading &&
            <Head>
                <title>{`${res.data.data.name || ''} `}| Ohys-Schedule</title>
            </Head>
            }
            <div className="container">
                <div className="img item">
                    {res.isLoading ? 
                        <div className="ui placeholder">
                            <div className="image"/>
                        </div> : 
                        <div className="wrapper">
                            <img src={res.data.data.smallImageUrl} alt={res.data.data.name} className="rounded" />
                            <div className="epNumber bold">{'Ep. ' + res.data.data.items[res.data.data.items.length - 1].episode}</div>
                        </div>
                    }
                </div>
                <div className="divider" />
                <div className="main item">
                    {res.isLoading ? <Placeholder lineCountFor={9}/> : <>
                        <div className="info-section">
                            <div className="subtitle item">
                                {res.data.data.name}
                            </div>
                            <div className="title item size-24 bold">
                                {res.data.data.title[lang.lang] || res.data.data.name}
                            </div>
                        </div>
                        <div className="addition-section">
                            <div className="des item">
                                <div className="content">
                                    {res.data.data.episode_info.slice(0, 3).map(item => (
                                        <motion.div key={item._id} className="content" initial='hidden' animate="visible" transition={{ duration: 0.2, delay: 0.15 }} variants={epAnimated}>
                                            <AnimeEpisodeListItem 
                                                imageUrl={item.thumbnail}
                                                episodeName={item.title}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
            <style jsx>{`
                .animedetails {
                    margin: ${props.margin || '0'};
                    border: 1px solid var(--border-color-gray);
                    box-shadow: var(--shadow-small);
                }
                .container {
                    display: flex;
                    flex-direction: row-reverse;
                    background: #FFFFFF;
                    padding: 18px;
                }
                .container > .img.item {
                    flex: 0 0 auto;
                }
                .container > .img.item .placeholder {
                    margin-top: -90px;
                    margin-bottom: 50px;
                }
                .container > .img.item .placeholder .image {
                    min-width: 200px;
                    width: 100%;
                    height: 282px;
                }
                .container > .img.item .wrapper {
                    position: relative;
                    width: 200px;
                    margin-top: -90px;
                    margin-bottom: 50px;
                }
                .container > .img.item .wrapper img {
                    width: 200px;
                    min-height: 282px;
                    box-shadow: var(--shadow-medium);
                    border: 1px solid #ecf0f1;
                }
                .container > .img.item .wrapper .epNumber {
                    font-size: 12px;
                    letter-spacing: 0.5px;
                    display: flex;
                    padding: 1.5px 8px;
                    position: absolute;
                    right: 10px;
                    bottom: 18px;
                    color: #FFFFFF;
                    background-color: rgb(0, 0, 0, 0.7);
                    backdrop-filter: blur(6px);
                    border-radius: 7px;
                    width: auto;
                    white-space: nowrap;
                }
                .container > .divider {
                    flex: none;
                    margin: 16px 22px;
                    border-left: 1px solid #ecf0f1;
                }
                .container > .main.item {
                    flex: 1 1 0;
                }
                .container > .main.item .info-section {
                    margin: 18px 0 40px;
                }
                .container > .main.item .info-section > .title {
                    line-height: 28px;
                }
                .container > .main.item .info-section > .subtitle {
                    color: var(--sub-text-color);
                    margin-bottom: 6px;
                }
                .container > .main.item .addition-section {
                    display: flex;
                }
                .container > .main.item .addition-section > .item {
                    flex: 1 1 0;
                }
                .container > .main.item .addition-section .item .header {
                    margin-bottom: 8px;
                }
                .container > .main.item .addition-section > .about {
                    border-left: 4px solid #000000;
                }
                .container > .main.item .addition-section > .des .content {
                    display: flex;
                }
                @media screen and (max-width: 568px) {
                    .animedetails {
                        margin: ${props.mobileMargin || '0'};
                    }
                    .container {
                        flex-direction: column;
                    }
                    .container > .img.item .wrapper {
                        margin: -90px auto 18px;
                    }
                    .container > .divider {
                        display: none;
                    }
                }
            `}</style>
        </div>
        </motion.div>
    )
}
export default AnimeDetails