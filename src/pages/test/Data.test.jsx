import { expect, test, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouterAndStoreProvider } from '../../test/utils.jsx'
import Data from '../Data.jsx'

describe('data page test', () => {
  test('data page renders correctly', async () => {
    renderWithRouterAndStoreProvider(<Data />)
    const rows = screen.queryAllByText((content, element) => {
      return element.tagName.toLowerCase() === 'p'
    })

    expect(rows.length).toBeGreaterThanOrEqual(6)
    expect(rows.some((row) => row.className === 'selected-capital')).toBe(true)
    expect(rows.some((row) => row.className === 'weather-icon')).toBe(true)
    expect(rows.some((row) => row.className === 'description')).toBe(true)
    expect(rows.filter((row) => row.className === 'weather-row').length).toBe(3)
  })
})
