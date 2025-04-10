import { useRoutes } from 'react-router-dom'
import GlobalHeadNav from './components/core/globalHeadNav'
import router from './router'
import { Button } from 'antd'
import { CloudOutlined, DatabaseOutlined } from '@ant-design/icons'
import logoImg from '../src/assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { setRepoPaths, setCurrentRepo } from '../src/store/gitStore'

function App() {
  const gitStroe = useSelector((state) => state.gitStore)
  const dispatch = useDispatch()
  const outlet = useRoutes(router)

  const setRepoPath = async () => {
    const repoPath = await window.api.chooseFolder()
    if (!gitStroe.repoPaths.some((item) => item.path === repoPath)) {
      dispatch(
        setRepoPaths([...gitStroe.repoPaths, { path: repoPath, name: repoPath.split('/').pop() }])
      )
      dispatch(setCurrentRepo(repoPath.split('/').pop()))
    }
  }

  return (
    <div className="app-container">
      <div className="app-container__head">
        <GlobalHeadNav />
      </div>

      {gitStroe.repoPaths.length > 0 ? (
        <div className="app-container__main">{outlet}</div>
      ) : (
        <div className="app-container__empty">
          <div className="app-container__empty-title">
            <div className="app-container__empty-title-logo">
              <img src={logoImg} alt="logo" className="app-container__empty-title-logo-img" />
              <h1>Electron Git Desktop</h1>
            </div>
            <div className="app-container__empty-title-text">
              <p>No available repository was found.</p>
              <p>
                There are no uncommitted changes in this repository. Here are some friendly
                suggestions for what to do next.
              </p>
            </div>
          </div>
          <div className="app-container__empty-button">
            <Button icon={<CloudOutlined />} size="large">
              Clone a Repository
            </Button>
            <Button
              icon={<DatabaseOutlined />}
              size="large"
              style={{ marginLeft: 20 }}
              onClick={setRepoPath}
            >
              Add Local Repository
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
