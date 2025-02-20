import { useRoutes } from 'react-router-dom'
import GlobalHeadNav from './components/core/globalHeadNav'
import router from './router'

function App() {
  const outlet = useRoutes(router)
  return (
    <div className="app-container">
      <div className="app-container__head">
        <GlobalHeadNav />
      </div>
      <div className="app-container__main">{outlet}</div>
    </div>
  )
}

export default App
