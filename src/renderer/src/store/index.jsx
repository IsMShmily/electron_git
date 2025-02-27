import { configureStore } from '@reduxjs/toolkit'
import IsQueryOrder from './IsQueryOrder'
import gitStore from './gitStore'

const store = configureStore({
  reducer: {
    IsQueryOrder,
    gitStore
  }
})

export default store
