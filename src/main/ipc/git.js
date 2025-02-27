// src/main/git.js
import { execSync } from 'child_process'
import { ipcMain } from 'electron'

// /Users/shmily/Documents/my/github/syGit

/**
 * 获取git日志
 * @param {*} repoPath
 * @returns
 */
export const getGitLog = (repoPath) => {
  /**
   * execSync 执行一个脚本代码 返回的是 buffer 对象
   * 需要通过 toString转换
   * /Users/shmily/Documents/my/github/syGit
   */
  const logs = execSync(`git -C ${repoPath} log --pretty=format:"%h|%s|%an|%ad" --date=iso`)
  return logs
    .toString()
    .split('\n')
    .map((line) => {
      const [hash, msg, author, date] = line.split('|')
      return { hash, msg, author, date }
    })
}

/**
 * 获取 git diff
 * @param {*} repoPath
 * @returns
 */
export const getDiff = (repoPath) => {
  const diff = execSync(`git -C ${repoPath} diff --staged`).toString()

  const detectChangeType = () => {
    if (diff.includes('+feat:')) return 'feat'
    if (diff.includes('+fix:')) return 'fix'
    return 'chore'
  }

  return detectChangeType(diff)
}

/**
 * 获取 git 分支
 * @param {*} repoPath
 * @returns
 */
export const getGitBranch = (repoPath) => {
  const branches = execSync(`git -C ${repoPath} branch -a`).toString()
  return branches
    .split('\n')
    .filter(Boolean) // 去除空行
    .map((branch) => branch.trim()) // 去除空格
}

const setupGitIPC = () => {
  ipcMain.handle('getGitLog', (event, repoPath) => {
    return getGitLog(repoPath)
  })
  ipcMain.handle('getDiff', (event, repoPath) => {
    return getDiff(repoPath)
  })
  ipcMain.handle('getGitBranch', (event, repoPath) => {
    return getGitBranch(repoPath)
  })
}

export default setupGitIPC
