import { useEffect, useState } from 'react'
import { twoDigitTimeString } from '../utils/dateUtils'

export default function Clock({ timeZone }) {
  const getActualTime = () => {
    const time = new Date((new Date().getTime() / 1000 + timeZone) * 1000)
    // console.log(time.getHours())
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
  }, [timeZone])
  return (
    <div className='clock'>
      <p className='clock-row'>{hours}</p>
      <p className='clock-row'>{minutes}</p>
    </div>
  )
}
