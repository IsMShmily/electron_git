// src/main/git.js
import { execSync } from 'child_process'
import { ipcMain } from 'electron'

export const getGitLog = (repoPath) => {
  const log = execSync(`git -C ${repoPath} log --pretty=format:"%h|%s|%an|%ad" --date=iso`)
  return log
    .toString()
    .split('\n')
    .map((line) => {
      const [hash, msg, author, date] = line.split('|')
      return { hash, msg, author, date }
    })
}

const setupGitIPC = () => {
  ipcMain.handle('getGitLog', (event, repoPath) => {
    return getGitLog(repoPath)
  })
}

export default setupGitIPC
