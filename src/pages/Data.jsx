import { useEffect, useState } from 'react'
import Clock from '../components/Clock'
import NavBar from '../components/NavBar'
import { useFetch } from '../hooks/useFetch'
import store from '../stores/store'
import { timeStringFromEpoch } from '../utils/dateUtils'
import { getWeather } from '../services/weatherService'
import temperature from '../assets/icons/temperature_weather_icon.svg'
import sunrise from '../assets/icons/sunrise_weather_icon.svg'
import sunset from '../assets/icons/sunset_weather_icon.svg'

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
    setWeatherTemp(String(Math.round(temp)))
    setWeatherSunrise(timeStringFromEpoch(sunrise))
    setWeatherSunset(timeStringFromEpoch(sunset))
  }, [response])

  return (
    <div>
      <NavBar />
      <Clock place={selectedCapital} />
      <p className='selected-capital'>{selectedCapital}</p>
      <p className='weather-icon'>
        <i className={`owi owi-${weatherIcon}`} />
      </p>
      <p className='description'>{weatherDescription}</p>
      <p className='weather-row'>
        <img className='small-weather-icon' src={temperature} />
        <span className='weather-data'>{weatherTemp} °C</span>
      </p>
      <p className='weather-row'>
        <img className='small-weather-icon' src={sunrise} />
        <span className='weather-data'>{weatherSunrise}</span>
      </p>
      <p className='weather-row'>
        <img className='small-weather-icon' src={sunset} />
        <span className='weather-data'>{weatherSunset}</span>
      </p>
    </div>
  )
}
