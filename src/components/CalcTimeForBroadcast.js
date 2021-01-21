const CalcTimeForBroadcast = ({ time }) => {
  return (
    <span className="remainedTime">
      {!time.day || time.day < 0
        ? ''
        : `${time.day < 0 ? -time.day : time.day}d `}
      {!time.hour ? '' : `${time.hour < 0 ? -time.hour : time.hour}h `}
      {!time.minute ? '' : `${time.minute < 0 ? -time.minute : time.minute}m `}
      {!time.second ? '' : `${time.second < 0 ? -time.second : time.second}s `}
    </span>
  )
}
export default CalcTimeForBroadcast
