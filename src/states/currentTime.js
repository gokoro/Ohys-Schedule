import { useEffect } from 'react'
import { atom, useSetRecoilState } from 'recoil'
import dayjs from '../lib/dayjs'

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const getJPMoment = () => {
  const now = dayjs()

  const [hours, seconds] = now.format('HH:mm').split(':')
  const currentSecond = dayjs.duration({ hours, seconds }).asSeconds()

  const currentDayNumber = now.day()
  const currentDay = days[currentDayNumber]

  return {
    currentSecond,
    currentDay,
    currentDayNumber,
  }
}

export const currentSecondState = atom({
  key: 'currentSecondState',
  default: getJPMoment().currentSecond,
})

export const currentDayState = atom({
  key: 'currentDayState',
  default: getJPMoment().currentDay,
})

export const RefreshCurrentTimeComponent = () => {
  const setSecondState = useSetRecoilState(currentSecondState)
  const setDayState = useSetRecoilState(currentDayState)

  const refreshTimes = () => {
    const { currentSecond, currentDay } = getJPMoment()

    setSecondState(currentSecond)
    setDayState(currentDay)
  }

  useEffect(() => {
    const interval = setInterval(refreshTimes, 1000 * 60)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return null
}
