import { doFetch } from './fetch'
import config from '../assets/config.json'

export function getCapitals(abortController) {
  return doFetch(abortController, config.capitalService.uri)
}
