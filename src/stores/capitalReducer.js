import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  capitals: [],
  selectedCapital: '',
}

const capitalSlice = createSlice({
  name: 'capital',
  initialState,
  reducers: {
    capitalSelected(state, action) {
      state.selectedCapital = action.payload
    },
    setCapitals(state, action) {
      state.capitals = action.payload
    },
  },
})

export const { setCapitals, capitalSelected } = capitalSlice.actions
export default capitalSlice.reducer
