import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCapitals } from '../services/capitalService'
import { FeatureState } from './featureState'

const initialState = {
  capitals: [],
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
    },
  },
  extraReducers(builder) {
    builder
      .addCase(capitalList.pending, (state) => {
        state.status = FeatureState.LOADING
      })
      .addCase(capitalList.fulfilled, (state, action) => {
        state.status = FeatureState.SUCCEEDED
        state.capitals = action.payload.response.map((item) => item.capital[0])
      })
      .addCase(capitalList.rejected, (state, action) => {
        state.status = FeatureState.REJECTED
        state.error.push(action.payload.error)
      })
  },
})

export const { setCapitals, capitalSelected } = capitalSlice.actions
export default capitalSlice.reducer
