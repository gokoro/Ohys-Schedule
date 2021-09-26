import * as React from 'react'
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

  const combineTime = (time, lang) =>
    time === 0 ? '' : time > 0 ? time + lang : -time + lang

  const day = combineTime(time.day, dayLang)
  const hour = combineTime(time.hour, hourLang)
  const minute = combineTime(time.minute, minuteLang)
  const second = combineTime(time.second, secondLang)

  return (
    <span className="remainedTime">
      {day} {hour} {minute} {second}
    </span>
  )
}
export default CalcTimeForBroadcast
