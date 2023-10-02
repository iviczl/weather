export default function SearchButton({ onClick, visible }) {
  return (
    <button hidden={!visible} onClick={onClick} className='save'>
      Save
    </button>
  )
}
