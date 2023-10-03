import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouterAndStoreProvider } from '../../test/utils.jsx'
import SearchInput from '../SearchInput.jsx'

describe('search input test', () => {
  test('search input renders correctly', async () => {
    const text = 'filter'
    renderWithRouterAndStoreProvider(
      <SearchInput
        filterText={text}
        filterList={['a', 'b', '3']}
        onChange={() => {}}
        listVisible={true}
      />
    )
    const input = await screen.findByText((content, element) => {
      return element.tagName.toLowerCase() === 'input'
    })
    expect(input).toBeInTheDocument()
    const items = await screen.findAllByText((content, element) => {
      return element.tagName.toLowerCase() === 'li'
    })
    expect(items.length).toBe(3)
  })

  test('search input renders empty list', () => {
    const text = 'filter'
    renderWithRouterAndStoreProvider(
      <SearchInput
        filterText={text}
        filterList={['a', 'b', '3']}
        onChange={() => {}}
        listVisible={false}
      />
    )
    const items = screen.queryAllByText((content, element) => {
      return element.tagName.toLowerCase() === 'li'
    })
    expect(items.length).toBe(0)
  })
})
