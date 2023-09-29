import { configureStore } from '@reduxjs/toolkit'
import capitalReducer from './capitalReducer'

const store = configureStore({
  reducer: {
    capital: capitalReducer,
  },
})

export default store
