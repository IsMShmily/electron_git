import { useState } from 'react'
import styles from './index.module.scss'

const Home = () => {
  const [repoPath, setRepoPath] = useState('')
  const [commits, setCommits] = useState([])

  const loadHistory = async () => {
    const commits = await window.api.getGitLog(repoPath)
    console.log('commits', commits)
    setCommits(commits)
  }

  const loadDiff = async (commit) => {
    const diff = await window.api.getDiff(repoPath)
    console.log('diff', diff)
  }
  return (
    <div className={styles['homeContainer']}>
      <input
        value={repoPath}
        onChange={(e) => setRepoPath(e.target.value)}
        placeholder="输入Git仓库路径"
      />
      <button onClick={loadHistory}>加载记录</button>
      <ul>
        {commits.map((commit, index) => (
          <li key={index}>
            {commit.msg}
            <button onClick={() => copyMessage(commit.msg)}>复制</button>
            <button onClick={() => loadDiff(commit)}>查看diff</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Home
