import { createSlice } from '@reduxjs/toolkit'

const IsQueryOrder = createSlice({
  name: 'is_query',

  initialState: {
    is_query: false
  },
  reducers: {
    set_false(state) {
      state.is_query = false
    },
    set_true(state) {
      state.is_query = true
    }
  }
})

export const { set_false, set_true } = IsQueryOrder.actions
export default IsQueryOrder.reducer
