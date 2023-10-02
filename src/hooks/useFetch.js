import { useState, useEffect } from 'react'
import store from '../stores/store'

export function useFetchToStore(storeMethod, params = {}) {
  useEffect(() => {
    const abortController = new AbortController()
    store.dispatch(storeMethod(params, abortController))
    return () => abortController.abort()
  }, [])
}

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
