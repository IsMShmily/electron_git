import { useState } from 'react'
import styles from './index.module.scss'


const Home = () => {
  const [repoPath, setRepoPath] = useState('')
  const [commits, setCommits] = useState([])

  const loadHistory = () => {
    const commits = window.api.getGitLog(repoPath)
    setCommits(commits)
  }
  return (
    <div className={styles['homeContainer']}>
      <input v-model="repoPath" placeholder="输入Git仓库路径" />
      <button onClick={loadHistory}>加载记录</button>
      <ul>
        {commits.map((commit, index) => (
          <li key={index}>
            {commit.msg}
            <button onClick={() => copyMessage(commit.msg)}>复制</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Home
