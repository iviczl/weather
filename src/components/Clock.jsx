import { useEffect, useState } from 'react'
import {
  getTimeZoneOffsetForPlace,
  twoDigitTimeString,
} from '../utils/dateUtils'

export default function Clock({ place }) {
  const timezoneOffset = place ? getTimeZoneOffsetForPlace(place) : 0
  const getActualTime = () => {
    let time = new Date()
    time.setMinutes(time.getMinutes() + timezoneOffset)
    return {
      hours: twoDigitTimeString(time.getHours()),
      minutes: twoDigitTimeString(time.getMinutes()),
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
    <div>
      <p>{hours}</p>
      <p>{minutes}</p>
    </div>
  )
}
