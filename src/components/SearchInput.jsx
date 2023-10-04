import { useRef, useEffect } from 'react'
export default function SearchInput({
  filterText,
  filterList,
  onChange,
  listVisible,
}) {
  const selectItem = (item) => {
    const itemSelected = new CustomEvent('item-selected', { detail: item })
    document.dispatchEvent(itemSelected)
  }
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  function list() {
    // should not create any item if the list is not visible
    if (!listVisible) {
      return
    }
    return filterList.map((item) => {
      const index = item.toLowerCase().indexOf(filterText.toLowerCase())
      const pre = item.substring(0, index)
      const filter = item.substring(index, index + filterText.length)
      const post = item.substring(index + filterText.length)
      return (
        <li className='list-item' key={item} onClick={() => selectItem(item)}>
          <span>{pre}</span>
          <span className='list-item-text-filter'>{filter}</span>
          <span>{post}</span>
        </li>
      )
    })
  }
  return (
    <div className='search-input-container'>
      <input
        type='text'
        className='search-input'
        value={filterText}
        onChange={onChange}
        ref={inputRef}
      />
      <ul className='search-list'>{list()}</ul>
    </div>
  )
}
