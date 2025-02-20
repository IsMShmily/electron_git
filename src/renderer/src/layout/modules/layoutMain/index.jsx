import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
const { Content } = Layout
const GlobalMain = () => {
  return (
    <Content
      style={{
        height: '100%'
      }}
    >
      <Outlet />
    </Content>
  )
}
export default GlobalMain
