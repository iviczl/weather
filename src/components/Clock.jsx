import { useEffect, useState } from 'react'

export default function Clock() {
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())

  useEffect(() => {
    const timeout = setInterval(() => {
      const time = new Date()
      setHours(time.getHours())
      setMinutes(time.getMinutes())
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
