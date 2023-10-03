import { useEffect, useState } from 'react'
import {
  getTimeZoneOffsetForPlace,
  twoDigitTimeString,
} from '../utils/dateUtils'

export default function Clock({ place }) {
  const timezoneOffset = place ? getTimeZoneOffsetForPlace(place) : 0
  const getActualTime = () => {
    let time = new Date()
    time.setTime(time.getTime() - timezoneOffset * 60000)
    return {
      hours: twoDigitTimeString(time.getUTCHours()),
      minutes: twoDigitTimeString(time.getUTCMinutes()),
    }
  }

  const [hours, setHours] = useState(getActualTime().hours)
  const [minutes, setMinutes] = useState(getActualTime().minutes)

  useEffect(() => {
    const timeout = setInterval(() => {
      const time = getActualTime()
      setHours(time.hours)
      setMinutes(time.minutes)
    }, 1000)
    return () => clearInterval(timeout)
  }, [])
  return (
    <div className='clock'>
      <p className='clock-row'>{hours}</p>
      <p className='clock-row'>{minutes}</p>
    </div>
  )
}
