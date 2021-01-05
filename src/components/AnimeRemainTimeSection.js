import { BsFillStopwatchFill } from 'react-icons/bs'

import { useContext } from 'react'
import LanguageContext from '../context/LanguageContext'

import AnimeTimeInfo from './AnimeTimeInfo'
import CalcTimeForBroadcast from './CalcTimeForBroadcast'

const AnimeRemainTimeSection = props => {
    const { locale } = useContext(LanguageContext.Original)
    const { animeRemainTimeSection: translated } = locale.components

    return (
        <div className="AnimeRemainTimeSection">
            <AnimeTimeInfo 
                iconSrc={<BsFillStopwatchFill />}
                text={props.isOnAir ? translated.isAir : translated.soonAir}
            />
            <CalcTimeForBroadcast
                isOnAir={props.isOnAir}
                time={props.airingTime}
            />
        </div>
    )
}
export default AnimeRemainTimeSection