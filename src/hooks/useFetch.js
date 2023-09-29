import { useState, useEffect } from 'react'

export function useFetch(url, options = {}) {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        const signal = abortController.signal
        const res = await fetch(url, { ...options, signal })
        const json = await res.json()
        setResponse(json)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
    return () => abortController.abort()
  }, [])

  return { response, error }
}
