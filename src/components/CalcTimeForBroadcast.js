const CalcTimeForBroadcast = ({ time }) => {
  const hMinus = 24 - 1 + time.hour
  const mMinus = 60 - 1 + time.minute
  const sMinus = 60 - 1 + time.second

  return (
    <span className="remainedTime">
      {!time.day || time.day < 0
        ? ''
        : `${time.day < 0 ? -time.day : time.day}d `}
      {!time.hour
        ? ''
        : `${
            time.hour < 0 && time.day >= 0
              ? `${hMinus === 0 ? '' : `${hMinus}h`}`
              : `${-time.hour}h`
          } `}
      {!time.minute
        ? ''
        : `${
            time.minute < 0 && time.day >= 0
              ? `${mMinus === 0 ? '' : `${mMinus}m`}`
              : `${-time.minute}m`
          } `}
      {!time.second
        ? ''
        : `${
            time.second < 0 && time.day >= 0
              ? `${sMinus === 0 ? '' : `${sMinus}s`}`
              : `${-time.second}s`
          } `}
    </span>
  )
}
export default CalcTimeForBroadcast
