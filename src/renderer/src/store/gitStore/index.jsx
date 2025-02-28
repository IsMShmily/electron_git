import { createSlice } from '@reduxjs/toolkit'
import { gitStoreLocalforage } from '../../localStore'

const gitStore = createSlice({
  name: 'gitStore',

  initialState: {
    repoPaths: [],
    currentRepo: null,
    currentBranch: null,
    currentRepoStatus: []
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
     * 设置 当前选中的 currentRepo
     * @param {*} state
     * @param {*} action
     */
    setCurrentRepo(state, action) {
      state.currentRepo = action.payload
      gitStoreLocalforage.setItem('currentRepo', action.payload)
    },

    /**
     * 设置 当前选中的 currentBranch
     * @param {*} state
     * @param {*} action
     */
    setCurrentBranch(state, action) {
      state.currentBranch = action.payload
      gitStoreLocalforage.setItem('currentBranch', action.payload)
    },

    /**
     * 设置 当前仓库状态
     * @param {*} state
     * @param {*} action
     */
    setCurrentRepoStatus(state, action) {
      state.currentRepoStatus = action.payload
    }
  }
})

/**
 * 初始化 当前选中的 selectedRepo 和 repoPaths
 * @returns
 */
export const initSelectedTag = () => async (dispatch) => {
  // 获取 当前选中的 currentRepo 和 repoPaths
  const [currentRepo, repoPaths] = await Promise.all([
    gitStoreLocalforage.getItem('currentRepo'),
    gitStoreLocalforage.getItem('repoPaths')
  ])

  dispatch(setCurrentRepo(currentRepo || null))
  dispatch(setRepoPaths(repoPaths || []))
}

export const { setRepoPaths, setCurrentRepo, setCurrentBranch, setCurrentRepoStatus } =
  gitStore.actions
export default gitStore.reducer
