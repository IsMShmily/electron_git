import styles from './index.module.scss'
import { Layout } from 'antd'
const { Header } = Layout

const GlobalHead = () => {
  return (
    <Header className={styles.head}>
      <div className={styles.head__main}>1312321</div>
    </Header>
  )
}
export default GlobalHead
