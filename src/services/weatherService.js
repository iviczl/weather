import { doFetch } from './fetch'
import config from '../assets/config.json'

export async function getWeather(
  abortController,
  setResponse,
  setError,
  params
) {
  const apiKey = config.weatherService.apiKey
  let uri = config.weatherService.uri
  uri = uri.replace('${apiKey}', apiKey)
  uri = uri.replace('${capital}', params.capital)
  const { response, error } = await doFetch(abortController, uri)
  setResponse(response)
  setError(error)
}
