import { useEffect, useState } from 'react'
import Clock from '../components/Clock'
import NavBar from '../components/NavBar'
import { useFetch } from '../hooks/useFetch'
import store from '../stores/store'
import { timeStringFromEpoch } from '../utils/dateUtils'
import { getWeather } from '../services/weatherService'

export default function Data() {
  const selectedCapital = store.getState().capital.selectedCapital
  const [weatherIcon, setWeatherIcon] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')
  const [weatherTemp, setWeatherTemp] = useState('')
  const [weatherSunrise, setWeatherSunrise] = useState('')
  const [weatherSunset, setWeatherSunset] = useState('')

  const { response } = useFetch(getWeather, { capital: selectedCapital })

  useEffect(() => {
    if (!response) {
      return
    }

    const { weather, main, sys } = response
    const { icon, description } = weather[0]
    const { temp } = main
    const { sunrise, sunset } = sys

    setWeatherIcon(icon)
    setWeatherDescription(description)
    setWeatherTemp(String(temp))
    setWeatherSunrise(timeStringFromEpoch(sunrise))
    setWeatherSunset(timeStringFromEpoch(sunset))
  }, [response])

  return (
    <div>
      <NavBar />
      <Clock />
      <p>{selectedCapital}</p>
      <p>
        <i className={`owi owi-${weatherIcon}`} />
      </p>
      <p>{weatherDescription}</p>
      <p>{weatherTemp}°C</p>
      <p>{weatherSunrise}</p>
      <p>{weatherSunset}</p>
    </div>
  )
}
