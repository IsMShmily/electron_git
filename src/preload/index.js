import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getGitLog: (repoPath) => {
    return ipcRenderer.invoke('getGitLog', repoPath)
  },
  getDiff: (repoPath) => {
    return ipcRenderer.invoke('getDiff', repoPath)
  },
  getGitBranch: (repoPath) => {
    return ipcRenderer.invoke('getGitBranch', repoPath)
  },
  chooseFolder: () => {
    return ipcRenderer.invoke('chooseFolder')
  },
  getCurrentBranch: (repoPath) => {
    return ipcRenderer.invoke('getCurrentBranch', repoPath)
  },
  getCurrentRepoFileStatus: (repoPath) => {
    return ipcRenderer.invoke('getCurrentRepoFileStatus', repoPath)
  },
  getCurrentRepoStatus: (repoPath) => {
    return ipcRenderer.invoke('getCurrentRepoStatus', repoPath)
  },
  getGitUserInfo: () => {
    return ipcRenderer.invoke('getGitUserInfo')
  },
  commitGit: (repoPath, files, summary, desc) => {
    return ipcRenderer.invoke('commitGit', repoPath, files, summary, desc)
  },
  getCurrentRepoStatusCount: (repoPath, status) => {
    return ipcRenderer.invoke('getCurrentRepoStatusCount', repoPath, status)
  },
  pushGit: (repoPath) => {
    return ipcRenderer.invoke('pushGit', repoPath)
  },
  fetchGit: (repoPath) => {
    return ipcRenderer.invoke('fetchGit', repoPath)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
