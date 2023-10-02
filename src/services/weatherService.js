import { doFetch } from './fetch'

export async function getWeather(
  abortController,
  setResponse,
  setError,
  params
) {
  const apiKey = '7c7471bd537f0fca341ce9b058c2b225'
  const { response, error } = await doFetch(
    abortController,
    `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${params.capital}`
  )
  setResponse(response)
  setError(error)
}
