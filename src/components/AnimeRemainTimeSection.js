import { BsFillStopwatchFill } from 'react-icons/bs'

import { useRecoilValue } from 'recoil'
import { LocaleMessageState } from '../states/preferredLanguage'

import AnimeTimeInfo from './AnimeTimeInfo'
import CalcTimeForBroadcast from './CalcTimeForBroadcast'

const AnimeRemainTimeSection = (props) => {
  const locale = useRecoilValue(LocaleMessageState)
  const { animeRemainTimeSection: translated } = locale.components

  return (
    <div className="AnimeRemainTimeSection">
      <AnimeTimeInfo
        iconSrc={<BsFillStopwatchFill />}
        text={props.isOnAir ? translated.isAir : translated.soonAir}
      />
      <CalcTimeForBroadcast isOnAir={props.isOnAir} time={props.airingTime} />
    </div>
  )
}
export default AnimeRemainTimeSection
