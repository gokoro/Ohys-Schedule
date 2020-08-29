import ShadowWhiteBox from './ShadowWhiteBox'
import Placeholder from './Placeholder'

import LanguageContext from '../context/LanguageContext'

import { useAnime } from '../hooks/useAnime'
import { useState, useContext } from 'react'

const AnimeDescriptionSection = props => {
    const [ desSlice, setDesSlice ] = useState(150)

    const { locale } = useContext(LanguageContext.Original)

    const res = useAnime(props.animeId)
    const data = res.data

    return (
        <ShadowWhiteBox>
            <div className="header bold size-16">{locale.components.animeDescriptionSection.story}</div>
            <div className="content">
                {res.isLoading ? <Placeholder lineCountFor={10}/> : <>
                    <p>{data.data.description.slice(0, desSlice)}...</p>
                    <a className={`moreBtn bold${!desSlice ? ' clicked' : ''}`} onClick={() => setDesSlice(undefined)}>{locale.components.animeDescriptionSection.more}</a>
                </>}
            </div>
            <style jsx>{`
                .header {
                    margin-bottom: 16px;
                }
                .content {
                    font-size: 12px;
                    letter-spacing: 0;
                }
                .moreBtn {
                    cursor: pointer;
                    color: #000000;
                }
                .moreBtn:hover {
                    text-decoration: underline;
                }
                .moreBtn.clicked {
                    display: none;
                }
            `}</style>
        </ShadowWhiteBox>
    )
}
export default AnimeDescriptionSection