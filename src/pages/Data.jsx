import { useEffect, useState } from 'react'
import Clock from '../components/Clock'
import NavBar from '../components/NavBar'
import { useFetch } from '../hooks/useFetch'
import {
  getLocalTimeFromEpoch,
  timeStringFromTimeObject,
} from '../utils/dateUtils'
import { getWeather } from '../services/weatherService'
import temperature from '../assets/icons/temperature_weather_icon.svg'
import sunrise from '../assets/icons/sunrise_weather_icon.svg'
import sunset from '../assets/icons/sunset_weather_icon.svg'
import { useSelector } from 'react-redux'

export default function Data() {
  const selectedCapital = useSelector((state) => state.capital.selectedCapital)
  const [weatherIcon, setWeatherIcon] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')
  const [weatherTemp, setWeatherTemp] = useState('')
  const [weatherSunrise, setWeatherSunrise] = useState('')
  const [weatherSunset, setWeatherSunset] = useState('')
  const [clockTimeZone, setClockTimeZone] = useState(0)

  const { response } = useFetch(getWeather, { capital: selectedCapital })

  useEffect(() => {
    if (!response) {
      return
    }

    const { weather, main, sys, timezone } = response
    const { icon, description } = weather[0]
    const { temp } = main
    const { sunrise, sunset } = sys

    setClockTimeZone(timezone)
    setWeatherIcon(icon)
    setWeatherDescription(description)
    setWeatherTemp(String(Math.round(temp)))
    setWeatherSunrise(
      timeStringFromTimeObject(getLocalTimeFromEpoch(sunrise, timezone))
    )
    setWeatherSunset(
      timeStringFromTimeObject(getLocalTimeFromEpoch(sunset, timezone))
    )
  }, [response])

  return (
    <div>
      <NavBar />
      <Clock timeZone={clockTimeZone} />
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
