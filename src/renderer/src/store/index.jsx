import { configureStore } from '@reduxjs/toolkit'
import IsQueryOrder from './IsQueryOrder'

const store = configureStore({
  reducer: {
    IsQueryOrder
  }
})

export default store
