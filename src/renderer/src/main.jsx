import './styles/index.scss'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { theme } from 'antd'

import { ConfigProvider } from 'antd'
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter basename="/">
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 6,
            colorLink: '#d0defc',
            colorPrimaryTextActive: '#ffffff',
            colorPrimary: '#ff7178'
          },
          algorithm: theme.darkAlgorithm,
          components: {
            Layout: {
              siderBg: '#282a30',
              headerBg: '#2d3037'
            }
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </HashRouter>
)
