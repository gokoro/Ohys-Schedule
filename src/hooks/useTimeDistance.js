import { useEffect, useState } from 'react'
import dayjs from '../lib/dayjs'

const useTimeDistance = (distanceTime) => {
  const [distance, setDistance] = useState({
    day: null,
    hour: null,
    minute: null,
    second: null,
  })

  const inputMoment = dayjs.tz(distanceTime, 'HH:mm', 'Asia/Tokyo')

  const calcDistance = () => {
    const duration = dayjs.duration(inputMoment.diff(dayjs.tz()))

    setDistance({
      day: duration.days(),
      hour: duration.hours(),
      minute: duration.minutes(),
      second: duration.seconds(),
    })
  }

  useEffect(() => {
    calcDistance()
    const handleClicker = setInterval(calcDistance, 1000)

    return () => {
      clearInterval(handleClicker)
    }
  }, [])

  return distance
}
export { useTimeDistance }
