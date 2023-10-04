import { doFetch } from './fetch'
import config from '../assets/config.json'

/**
 * gets real capitals from a third party web API
 * @param {AbortController} abortController
 * @returns a fetch Promise
 */
export function getCapitals(abortController) {
  return doFetch(abortController, config.capitalService.uri)
}
