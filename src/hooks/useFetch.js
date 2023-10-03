import { useState, useEffect } from 'react'
import store from '../stores/store'

/**
 * creates a run once effect for calling a store function
 * @param {function} storeMethod
 * @param {Object} params
 */
export function useFetchToStore(storeMethod, params = {}) {
  useEffect(() => {
    const abortController = new AbortController()
    store.dispatch(storeMethod(params, abortController))
    return () => abortController.abort()
  }, [])
}

/**
 * creates a run once effect for calling a service function and passing setters to it
 * @param {function} serviceMethod
 * @param {Object} params
 * @returns {Object{response, error}}
 */
export function useFetch(serviceMethod, params = {}) {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    serviceMethod(abortController, setResponse, setError, params)
    return () => abortController.abort()
  }, [])

  return { response, error }
}
