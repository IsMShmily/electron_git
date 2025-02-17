import './styles/index.scss'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import { ConfigProvider } from 'antd'
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter basename="/">
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#D44459',
            borderRadius: 2
          },
          components: {
            Layout: {
              siderBg: '#fff'
            }
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </HashRouter>
)
