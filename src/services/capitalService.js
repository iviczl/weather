import { doFetch } from './fetch'

export function getCapitals(abortController) {
  return doFetch(
    abortController,
    'https://restcountries.com/v3.1/all?fields=capital'
  )
}
