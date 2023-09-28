import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import SearchButton from '../components/SearchButton'
import store from '../stores/store.js'
import { settlementSelected } from '../stores/settlementReducer'
import debounce from 'lodash.debounce'
import { getAllSettlements } from '../services/settlementService'

export default function Search() {
  const [searchText, setSearchText] = useState('')
  const [searchList, setSearchList] = useState([])
  const navigate = useNavigate()

  const setSettlement = () => {
    store.dispatch(settlementSelected(searchText))
    navigate('/')
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  useEffect(
    debounce(() => {
      if (searchText.length < 2) {
        return
      }
      const refreshList = async () => {
        const list = await getAllSettlements(searchText)
        setSearchList(list.map((item) => item.name))
      }
      refreshList()
    }, 1000),
    [searchText]
  )

  return (
    <div>
      <NavBar />
      <SearchInput
        filterText={searchText}
        filterList={searchList}
        onChange={(event) => handleChange(event)}
      />
      <SearchButton onClick={setSettlement} />
    </div>
  )
}
