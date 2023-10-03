import { expect, test, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouterAndStoreProvider } from '../../test/utils.jsx'
import Home from '../Home.jsx'

describe('home page test', () => {
  test('home page renders correctly', async () => {
    renderWithRouterAndStoreProvider(<Home />)
    const capital = await screen.findByText('Budapest')
    expect(capital).toBeInTheDocument()
    const button = await screen.findByText('+')
    expect(button).toBeInTheDocument()
  })
})
