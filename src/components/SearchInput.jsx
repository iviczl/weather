export default function SearchInput({ filterText, filterList, onChange }) {
  function list() {
    if (filterList.length > 0) {
      return filterList.map((item) => <li>{item}</li>)
    }
  }
  return (
    <div>
      <input type='text' value={filterText} onChange={onChange} />
      <ul>{list()}</ul>
    </div>
  )
}
