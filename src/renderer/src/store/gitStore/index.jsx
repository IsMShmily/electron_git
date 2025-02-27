import { createSlice } from '@reduxjs/toolkit'
import { gitStoreLocalforage } from '../../localStore'

const gitStore = createSlice({
  name: 'gitStore',

  initialState: {
    repoPaths: [],
    currentTag: null
  },
  reducers: {
    /**
     * 设置全局 git repo 路径 数组
     * @param {*} state
     * @param {*} action
     */
    setRepoPaths(state, action) {
      state.repoPaths = action.payload
      gitStoreLocalforage.setItem('repoPaths', action.payload)
    },

    /**
     * 设置 当前选中的 currentTag
     * @param {*} state
     * @param {*} action
     */
    setCurrentTag(state, action) {
      state.currentTag = action.payload
      gitStoreLocalforage.setItem('currentTag', action.payload)
    }
  }
})

/**
 * 初始化 当前选中的 selectedRepo 和 repoPaths
 * @returns
 */
export const initSelectedTag = () => async (dispatch) => {
  // 获取 当前选中的 currentTag 和 repoPaths
  const [currentTag, repoPaths] = await Promise.all([
    gitStoreLocalforage.getItem('currentTag'),
    gitStoreLocalforage.getItem('repoPaths')
  ])

  dispatch(setCurrentTag(currentTag || null))
  dispatch(setRepoPaths(repoPaths || []))
}

export const { setRepoPaths, setCurrentTag } = gitStore.actions
export default gitStore.reducer
