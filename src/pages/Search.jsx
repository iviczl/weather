import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import SearchButton from '../components/SearchButton'
import store from '../stores/store.js'
import { setCapitals, capitalSelected } from '../stores/capitalReducer'
import { useFetch } from '../hooks/useFetch'

export default function Search() {
  const [isCapitalSelected, setIsCapitalSelected] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchList, setSearchList] = useState([])
  const url = 'https://restcountries.com/v3.1/all?fields=capital'
  const result = useFetch(url)
  const navigate = useNavigate()

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
    if (!result.response) {
      return
    }
    store.dispatch(setCapitals(result.response.map((item) => item.capital[0])))
  }, [result.response])

  useEffect(() => {
    const refreshList = async () => {
      const list = store
        .getState()
        .capital.capitals.filter(
          (capital) =>
            capital && capital.toLowerCase().includes(searchText.toLowerCase())
        )
        .slice(0, 8)
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
      />
      <SearchButton onClick={setCapital} visible={isCapitalSelected} />
    </div>
  )
}
