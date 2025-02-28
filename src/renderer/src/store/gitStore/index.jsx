import { createSlice } from '@reduxjs/toolkit'
import { gitStoreLocalforage } from '../../localStore'

const gitStore = createSlice({
  name: 'gitStore',

  initialState: {
    repoPaths: [],
    currentRepo: null,
    currentBranch: null,
    currentRepoStatus: [],
    currentRepoStatusType: 'UNKNOWN',
    currentRepoStatusCount: 0,
    currentFilePath: null
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
     * 设置 当前仓库文件状态
     * @param {*} state
     * @param {*} action
     */
    setCurrentRepoFileStatus(state, action) {
      state.currentRepoStatus = action.payload
      gitStoreLocalforage.setItem('currentRepoFileStatus', action.payload)
    },

    /**
     * 设置 当前仓库状态类型
     * @param {*} state
     * @param {*} action
     */
    setCurrentRepoStatusType(state, action) {
      state.currentRepoStatusType = action.payload
      gitStoreLocalforage.setItem('currentRepoStatusType', action.payload)
    },

    /**
     * 设置 当前仓库状态数量
     * @param {*} state
     * @param {*} action
     */
    setCurrentRepoStatusCount(state, action) {
      state.currentRepoStatusCount = action.payload
      gitStoreLocalforage.setItem('currentRepoStatusCount', action.payload)
    },

    /**
     * 设置 当前选中的 currentFilePath
     * @param {*} state
     * @param {*} action
     */
    setCurrentFilePath(state, action) {
      state.currentFilePath = action.payload
      gitStoreLocalforage.setItem('currentFilePath', action.payload)
    }
  }
})

/**
 * 初始化 缓存数据
 * @returns
 */
export const initSelectedTag = () => async (dispatch) => {
  // 获取 当前选中的 currentRepo 和 repoPaths
  const [currentRepo, repoPaths, currentBranch, currentFilePath] = await Promise.all([
    gitStoreLocalforage.getItem('currentRepo'),
    gitStoreLocalforage.getItem('repoPaths'),
    gitStoreLocalforage.getItem('currentBranch'),
    gitStoreLocalforage.getItem('currentFilePath')
  ])

  dispatch(setCurrentRepo(currentRepo || null))
  dispatch(setRepoPaths(repoPaths || []))
  dispatch(setCurrentBranch(currentBranch || null))
  dispatch(setCurrentFilePath(currentFilePath || null))
}

export const {
  setRepoPaths,
  setCurrentRepo,
  setCurrentBranch,
  setCurrentRepoFileStatus,
  setCurrentRepoStatusType,
  setCurrentRepoStatusCount,
  setCurrentFilePath
} = gitStore.actions
export default gitStore.reducer
