import { doFetch } from './fetch'
import config from '../assets/config.json'

/**
 * gets the actual weather conditions from a third party service for the given capital and sets the result/error in an asynchronous manner
 * @param {AbortController} abortController
 * @param {function} setResponse
 * @param {function} setError
 * @param {Object{capital:string}} params
 */
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
