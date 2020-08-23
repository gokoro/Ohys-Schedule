import AnimeTimeInfo from './AnimeTimeInfo'
import CalcTimeForBroadcast from './CalcTimeForBroadcast'

const AnimeRemainTimeSection = props => {
    return (
        <div className="AnimeRemainTimeSection">
            <AnimeTimeInfo 
                iconSrc="/svg/timer-icon.svg"
                text={props.isOnAir ? 'On Air' : 'Will Start After'}
            />
            <CalcTimeForBroadcast
                isOnAir={props.isOnAir}
                time={props.airingTime}
            />
        </div>
    )
}
export default AnimeRemainTimeSection