export const doFetch = async (abortController, url, options = {}) => {
  let response = null
  let error = null
  try {
    const signal = abortController.signal
    const res = await fetch(url, { ...options, signal })
    response = await res.json()
  } catch (problem) {
    abortController.abort()
    error = problem
  }
  return { response, error }
}

export const query = async (signal, url, options = {}) => {
  let response = null
  let error = null
  try {
    const res = await fetch(url, { ...options, signal })
    response = await res.json()
  } catch (problem) {
    abortController.abort()
    error = problem
  }
  return { response, error }
}
