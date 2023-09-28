import { configureStore } from "@reduxjs/toolkit"
import settlementReducer from "./settlementReducer"

const store = configureStore({
  reducer: {
    settlement: settlementReducer,
  },
})

export default store
