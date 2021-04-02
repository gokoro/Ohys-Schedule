import { useRecoilValue } from 'recoil'
import { LocaleMessageState } from '../states/preferredLanguage'

const CalcTimeForBroadcast = ({ time }) => {
  const {
    common: {
      time: {
        day: dayLang,
        hour: hourLang,
        minute: minuteLang,
        second: secondLang,
      },
    },
  } = useRecoilValue(LocaleMessageState)

  const hMinus = 24 - 1 + time.hour
  const mMinus = 60 - 1 + time.minute
  const sMinus = 60 - 1 + time.second
  return (
    <span className="remainedTime">
      {!time.day || time.day < 0
        ? ''
        : `${time.day < 0 ? -time.day : time.day}${dayLang} `}
      {!time.hour
        ? ''
        : `${
            time.hour < 0 && time.day >= 0
              ? `${hMinus === 0 ? '' : `${hMinus}${hourLang}`}`
              : `${-time.hour}${hourLang}`
          } `}
      {!time.minute
        ? ''
        : `${
            time.minute < 0 && time.day >= 0
              ? `${mMinus === 0 ? '' : `${mMinus}${minuteLang}`}`
              : `${-time.minute}${minuteLang}`
          } `}
      {!time.second
        ? ''
        : `${
            time.second < 0 && time.day >= 0
              ? `${sMinus === 0 ? '' : `${sMinus}${secondLang}`}`
              : `${-time.second}${secondLang}`
          } `}
    </span>
  )
}
export default CalcTimeForBroadcast
