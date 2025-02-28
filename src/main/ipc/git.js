// src/main/git.js
import { execSync } from 'child_process'
import { ipcMain } from 'electron'

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
    .map((branch) => branch.replace('*', '').trim()) // 去除 '*' 标记和多余空格
}

/**
 * 获取当前分支
 * @param {*} repoPath
 * @returns
 */
export const getCurrentBranch = (repoPath) => {
  const branch = execSync(`git -C ${repoPath} branch --show-current`).toString()
  return branch.split('\n')[0]
}

/**
 * 获取当前仓库状态-文件列表
 * @param {*} repoPath
 * @returns
 */
export const getCurrentRepoFileStatus = (repoPath) => {
  // 执行 git status 命令，获取状态信息
  const status = execSync(`git -C ${repoPath} status --porcelain`).toString()

  // 按行拆分，返回的每一行代表一个文件的状态
  const files = status
    .split('\n')
    .filter(Boolean) // 去除空行
    .map((line) => line.slice(3)) // 获取文件路径（去掉前面的状态信息）

  return files
}

/**
 * 获取当前仓库状态
 * @param {*} repoPath
 * @returns
 */
export const getCurrentRepoStatus = (repoPath) => {
  const status = execSync(`git -C ${repoPath} status`).toString()
  if (status.includes('Your branch is ahead of')) {
    return 'PUSH'
  } else if (status.includes('Your branch is behind')) {
    return 'FETCH'
  } else if (status.includes('Your branch is up to date')) {
    return 'UP_TO_DATE'
  }
  return 'UNKNOWN'
}

/**
 * 获取文件上一次提交的全部内容
 * @param {*} repoPath
 * @param {*} filePath
 * @returns
 */
export const getFileLastCommitContent = (repoPath, filePath) => {
  const content = execSync(`git -C ${repoPath} show HEAD^:${filePath}`).toString()
  return content
}

/** 读取文件中的内容 */
export const readFileContent = (filePath) => {
  const content = execSync(`cat ${filePath}`).toString()
  return content
}

/**
 * 获取当前仓库状态数量
 * @param {*} repoPath
 * @param {*} status
 * @returns
 */
export const getCurrentRepoStatusCount = (repoPath, status) => {
  if (status === 'PUSH') {
    const count = execSync(`git -C ${repoPath} rev-list --count origin/main..HEAD`).toString()
    return count.split('\n')[0]
  }
  if (status === 'FETCH') {
    const count = execSync(`git -C ${repoPath} rev-list --count HEAD..origin/main`).toString()
    return count.split('\n')[0]
  }
}

/**
 * 获取 git 用户信息
 * @returns
 */
export const getGitUserInfo = () => {
  const user = execSync(`git config user.name`).toString().split('\n')[0]
  const email = execSync(`git config user.email`).toString().split('\n')[0]
  return { user, email }
}

/**
 * 提交暂存区的文件
 * @param {*} repoPath
 * @param {*} files 文件列表
 * @param {*} summary 提交信息
 * @param {*} desc 提交描述
 */
export const commitGit = (repoPath, files, summary, desc) => {
  // 遍历文件列表，执行 git add 命令
  files.forEach((file) => {
    execSync(`git -C ${repoPath} add ${file}`)
  })
  // 执行 git commit 命令
  execSync(`git -C ${repoPath} commit -m "${summary}" -m "${desc}"`)
}

/**
 * 推送 git
 * @param {*} repoPath
 */
export const pushGit = (repoPath) => {
  execSync(`git -C ${repoPath} push`)
}

/**
 * 拉取 git
 * @param {*} repoPath
 */
export const fetchGit = (repoPath) => {
  execSync(`git -C ${repoPath} fetch`)
}

/**
 * 设置 git ipc
 */
const setupGitIPC = () => {
  ipcMain.handle('getGitLog', (event, repoPath) => {
    return getGitLog(repoPath)
  })
  ipcMain.handle('getGitBranch', (event, repoPath) => {
    return getGitBranch(repoPath)
  })
  ipcMain.handle('getCurrentBranch', (event, repoPath) => {
    return getCurrentBranch(repoPath)
  })
  ipcMain.handle('getCurrentRepoFileStatus', (event, repoPath) => {
    return getCurrentRepoFileStatus(repoPath)
  })
  ipcMain.handle('getGitUserInfo', (event) => {
    return getGitUserInfo()
  })
  ipcMain.handle('commitGit', (event, repoPath, files, summary, desc) => {
    return commitGit(repoPath, files, summary, desc)
  })
  ipcMain.handle('getCurrentRepoStatus', (event, repoPath) => {
    return getCurrentRepoStatus(repoPath)
  })
  ipcMain.handle('getCurrentRepoStatusCount', (event, repoPath, status) => {
    return getCurrentRepoStatusCount(repoPath, status)
  })
  ipcMain.handle('pushGit', (event, repoPath) => {
    return pushGit(repoPath)
  })
  ipcMain.handle('fetchGit', (event, repoPath) => {
    return fetchGit(repoPath)
  })
  ipcMain.handle('getFileLastCommitContent', (event, repoPath, filePath) => {
    return getFileLastCommitContent(repoPath, filePath)
  })
  ipcMain.handle('readFileContent', (event, filePath) => {
    return readFileContent(filePath)
  })
}

export default setupGitIPC
