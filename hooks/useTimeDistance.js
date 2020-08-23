import moment from 'moment-timezone'

import { useState, useEffect } from 'react'

const useTimeDistance = distanceTime => {
    const [distance, setdistance] = useState({
        day: null,
        hour: null,
        minute: null,
        second: null
    })
    
    const paramTime = moment(distanceTime, 'hh:mm')
    
    const calcDistance = () => {
        const jpMoment = moment().tz('Asia/Tokyo')
        const duration = moment.duration(paramTime.diff(jpMoment))
        setdistance(state => ({
            ...state,
            day: duration.days(),
            hour: duration.hours(),
            minute: duration.minutes(),
            second: duration.seconds()
        }))
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
export {
    useTimeDistance
}