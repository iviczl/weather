import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import SearchButton from '../components/SearchButton'
import store from '../stores/store.js'
import { capitalSelected } from '../stores/capitalReducer'
import { listOnlySearchedCapitals } from '../assets/config.json'
import { useQuery } from '@tanstack/react-query'
import { queryCapitals } from '../services/capitalService'

export default function Search() {
  const capitalStore = store.getState().capital
  const [isCapitalSelected, setIsCapitalSelected] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchList, setSearchList] = useState([])
  const navigate = useNavigate()

  // using react-query to load capitals
  const { data } = useQuery({
    queryKey: ['capitals'],
    queryFn: async ({ signal }) =>
      (await queryCapitals(signal))
        .map((item) => item.capital.filter((capital) => capital)[0])
        .filter((item) => item),
  })

  // // effect for loading all the capitals into store
  // useFetchToStore(capitalList)

  const setCapital = () => {
    store.dispatch(
      capitalSelected(searchText.charAt(0).toUpperCase() + searchText.slice(1))
    )
    navigate('/')
  }

  const itemSelected = (event) => {
    setSearchText(event.detail)
    setIsCapitalSelected(true)
  }

  useEffect(() => {
    // subscription to a custom event of the SearchInput
    document.addEventListener('item-selected', itemSelected)

    return () => {
      document.removeEventListener('item-selected', itemSelected)
    }
  }, [])

  useEffect(() => {
    const refreshList = async () => {
      const allCapitals = listOnlySearchedCapitals
        ? capitalStore.searchedCapitals
        : data
      const list =
        searchText.length > 0
          ? new Array(
              ...new Set( // creating a set to avoid duplication
                allCapitals.filter(
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
    <div className='search-container'>
      <NavBar />
      <SearchInput
        filterText={searchText}
        filterList={searchList}
        onChange={(event) => {
          setSearchText(event.target.value)
          setIsCapitalSelected(
            // only real capitals can be selected
            data?.some(
              (capital) =>
                capital.toLowerCase() === event.target.value.toLowerCase()
            )
              ? true
              : false
          )
        }}
        listVisible={!isCapitalSelected}
      />
      <SearchButton onClick={setCapital} visible={isCapitalSelected} />
    </div>
  )
}
