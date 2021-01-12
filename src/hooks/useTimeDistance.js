import moment from 'moment-timezone'

import { useState, useEffect } from 'react'

const useTimeDistance = distanceTime => {
    const [distance, setDistance] = useState({
        day: null,
        hour: null,
        minute: null,
        second: null
    })
    
    const inputMoment = moment.tz(distanceTime, 'hh:mm', 'Asia/Tokyo')
    
    const calcDistance = () => {
        const jpMoment = moment().tz('Asia/Tokyo')
        const duration = moment.duration(jpMoment.diff(inputMoment))

        setDistance({
            ...distance,
            day: duration.days(),
            hour: duration.hours(),
            minute: duration.minutes(),
            second: duration.seconds()
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
export {
    useTimeDistance
}