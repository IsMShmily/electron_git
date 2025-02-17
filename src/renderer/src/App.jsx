import { useRoutes } from 'react-router-dom'
import router from './router'

function App() {
  const outlet = useRoutes(router)
  return (
    <div className="app-container">
      <div className="app-container__head"></div>
      <div className="app-container__main">{outlet}</div>
    </div>
  )
}

export default App
