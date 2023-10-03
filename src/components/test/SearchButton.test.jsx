import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouterAndStoreProvider } from '../../test/utils.jsx'
import SearchButton from '../SearchButton.jsx'

describe('nav bar test', () => {
  test('nav bar renders correctly', async () => {
    renderWithRouterAndStoreProvider(<SearchButton />)
    const navLink = await screen.findByText('Save')
    expect(navLink).toBeDefined()
  })
})
