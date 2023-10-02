import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import SearchButton from '../components/SearchButton'
import store from '../stores/store.js'
import { capitalSelected } from '../stores/capitalReducer'
import { useFetchToStore } from '../hooks/useFetch'
import { capitalList } from '../stores/capitalReducer'

export default function Search() {
  const [isCapitalSelected, setIsCapitalSelected] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchList, setSearchList] = useState([])
  const navigate = useNavigate()

  useFetchToStore(capitalList)

  const setCapital = () => {
    store.dispatch(capitalSelected(searchText))
    navigate('/')
  }

  const itemSelected = (event) => {
    setSearchText(event.detail)
    setIsCapitalSelected(true)
  }

  useEffect(() => {
    document.addEventListener('item-selected', itemSelected)

    return () => {
      document.removeEventListener('item-selected', itemSelected)
    }
  }, [])

  useEffect(() => {
    const refreshList = async () => {
      const list =
        searchText.length > 0
          ? new Array(
              ...new Set(
                store
                  .getState()
                  .capital.capitals.filter(
                    (capital) =>
                      capital &&
                      capital.toLowerCase().includes(searchText.toLowerCase())
                  )
              )
            ).slice(0, 8)
          : []
      setSearchList(list)
    }
    refreshList()
  }, [searchText])

  return (
    <div>
      <NavBar />
      <SearchInput
        filterText={searchText}
        filterList={searchList}
        onChange={(event) => {
          setSearchText(event.target.value)
          setIsCapitalSelected(false)
        }}
        listVisible={!isCapitalSelected}
      />
      <SearchButton onClick={setCapital} visible={isCapitalSelected} />
    </div>
  )
}
