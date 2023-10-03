import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouterAndStoreProvider } from '../../test/utils.jsx'
import Clock from '../Clock.jsx'

describe('nav bar test', () => {
  test('nav bar renders correctly', async () => {
    renderWithRouterAndStoreProvider(<Clock />)
    const clockRows = await screen.findAllByText((content, element) => {
      return element.tagName.toLowerCase() === 'p'
    })
    expect(clockRows.length).toBe(2)
  })
})
