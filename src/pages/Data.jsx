import { useEffect, useState } from 'react'
import Clock from '../components/Clock'
import NavBar from '../components/NavBar'
import { useFetch } from '../hooks/useFetch'
import store from '../stores/store'

export default function Data() {
  const selectedCapital = store.getState().capital.selectedCapital
  const [weatherIcon, setWeatherIcon] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')
  const [weatherTemp, setWeatherTemp] = useState('')
  const [weatherSunrise, setWeatherSunrise] = useState('')
  const [weatherSunset, setWeatherSunset] = useState('')
  const apiKey = '7c7471bd537f0fca341ce9b058c2b225'
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${selectedCapital}`
  const result = useFetch(url)

  useEffect(() => {
    if (!result.response) {
      return
    }

    const { weather, main, sys } = result.response
    const { icon, description } = weather[0]
    const { temp } = main
    const { sunrise, sunset } = sys

    setWeatherIcon(icon)
    setWeatherDescription(description)
    setWeatherTemp(String(temp))
    const sunriseTime = new Date(sunrise)
    setWeatherSunrise(
      String(sunriseTime.getHours()) + ':' + String(sunriseTime.getMinutes())
    )
    const sunsetTime = new Date(sunset)
    setWeatherSunset(
      String(sunsetTime.getHours()) + ':' + String(sunsetTime.getMinutes())
    )
  }, [result.response])

  return (
    <div>
      <NavBar />
      <Clock />
      <p>{selectedCapital}</p>
      <p>{weatherIcon}</p>
      <p>{weatherDescription}</p>
      <p>{weatherTemp}°C</p>
      <p>{weatherSunrise}</p>
      <p>{weatherSunset}</p>
    </div>
  )
}
