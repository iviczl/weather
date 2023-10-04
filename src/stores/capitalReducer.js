import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCapitals } from '../services/capitalService'
import { FeatureState } from './featureState'
import { listOnlySearchedCapitals } from '../assets/config.json'

/**
 * initial state for capitals store
 */
const initialState = {
  capitals: [],
  // if the setting says we must only use the already searched capitals in the list
  searchedCapitals: listOnlySearchedCapitals
    ? JSON.parse(localStorage.getItem('searchedCapitals') || '[]')
    : [],
  selectedCapital: 'Budapest',
  state: FeatureState.IDLE,
  error: [],
}

export const capitalList = createAsyncThunk(
  'capitals/list',
  (abortController) => getCapitals(abortController)
)

const capitalSlice = createSlice({
  name: 'capital',
  initialState,
  reducers: {
    capitalSelected(state, action) {
      state.selectedCapital = action.payload
      // if the setting says we must only use the already searched capitals in the list
      if (
        listOnlySearchedCapitals &&
        !state.searchedCapitals.some((capital) => capital === action.payload)
      ) {
        state.searchedCapitals.push(action.payload)
        localStorage.setItem(
          'searchedCapitals',
          JSON.stringify(state.searchedCapitals)
        )
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(capitalList.pending, (state) => {
        state.status = FeatureState.LOADING
      })
      .addCase(capitalList.fulfilled, (state, action) => {
        state.status = FeatureState.SUCCEEDED
        state.capitals = action.payload.response
          .map((item) => item.capital.filter((capital) => capital)[0])
          .filter((item) => item)
      })
      .addCase(capitalList.rejected, (state, action) => {
        state.status = FeatureState.REJECTED
        state.error.push(action.error)
      })
  },
})

export const { setCapitals, capitalSelected } = capitalSlice.actions
export default capitalSlice.reducer
