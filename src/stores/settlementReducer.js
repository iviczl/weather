import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllSettlements } from "../services/settlementService"

export const settlementList = createAsyncThunk("settlement/list", () =>
  getAllSettlements()
)

const initialState = {
  settlements: [],
  selectedSettlement: "",
}

const settlementSlice = createSlice({
  name: "settlement",
  initialState,
  reducers: {
    settlementSelected(state, action) {
      state.selectedSettlement = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(settlementList.pending, (state) => {
        // do nothing
      })
      .addCase(settlementList.fulfilled, (state, action) => {
        state.settlements = action.payload
      })
      .addCase(settlementList.rejected, (state) => {
        // do nothing
      })
  },
})

export const { settlementSelected } = settlementSlice.actions
export default settlementSlice.reducer
