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
            colorPrimary: '#282a30',
            borderRadius: 2,
            colorBgContainer: '#3b3f48',
            colorText: '#fff'
          },
          components: {
            Layout: {
              siderBg: '#282a30'
            }
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </HashRouter>
)
