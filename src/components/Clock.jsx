import { useEffect, useState } from 'react'
import { twoDigitTimeString } from '../utils/dateUtils'

export default function Clock() {
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())

  useEffect(() => {
    const timeout = setInterval(() => {
      const time = new Date()
      setHours(twoDigitTimeString(time.getHours()))
      setMinutes(twoDigitTimeString(time.getMinutes()))
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
