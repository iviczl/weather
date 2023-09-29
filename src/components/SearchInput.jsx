export default function SearchInput({ filterText, filterList, onChange }) {
  const selectItem = (item) => {
    const itemSelected = new CustomEvent('item-selected', { detail: item })
    document.dispatchEvent(itemSelected)
  }
  function list() {
    if (filterList.length > 0) {
      return filterList.map((item) => (
        <li key={item} onClick={() => selectItem(item)}>
          {item}
        </li>
      ))
    }
  }
  return (
    <div>
      <input type='text' value={filterText} onChange={onChange} />
      <ul>{list()}</ul>
    </div>
  )
}
