import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouterAndStoreProvider } from '../../test/utils.jsx'
import SearchButton from '../SearchButton.jsx'

describe('search button test', () => {
  test('search button renders correctly', async () => {
    renderWithRouterAndStoreProvider(
      <SearchButton visible={true} onClick={() => {}} />
    )
    const button = await screen.findByText('Save')
    expect(button).toBeInTheDocument()
  })

  test('search button renders hidden', async () => {
    renderWithRouterAndStoreProvider(
      <SearchButton visible={false} onClick={() => {}} />
    )
    const button = await screen.findByText('Save')
    expect(button).toBeInTheDocument()
    expect(button.hidden).toBe(true)
  })
})
