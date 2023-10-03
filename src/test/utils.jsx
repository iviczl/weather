import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import capitalReducer from '../stores/capitalReducer'

/**
 * renders a react component wrapped in BrowserRouter and store Provider
 * @param {Object} ui
 * @param {Object{preloadedState, store, ...renderOptions}} additiveParams
 * @returns rendered component
 */
export function renderWithRouterAndStoreProvider(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        capital: capitalReducer,
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
