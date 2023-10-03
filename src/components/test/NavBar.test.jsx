import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouterAndStoreProvider } from '../../test/utils.jsx'
import NavBar from '../NavBar.jsx'

describe('nav bar test', () => {
  test('nav bar renders correctly', async () => {
    renderWithRouterAndStoreProvider(<NavBar />)
    const navLink = await screen.findByText('<')
    expect(navLink).toBeDefined()
  })
})
