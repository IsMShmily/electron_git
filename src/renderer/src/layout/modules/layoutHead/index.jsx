import styles from './index.module.scss'
import { Layout } from 'antd'
import { CaretDownOutlined, SyncOutlined } from '@ant-design/icons'
import { Dropdown, Space, Button } from 'antd'
const { Header } = Layout
const items = [
  {
    label: '3rd menu item',
    key: '1'
  }
]

const GlobalHead = () => {
  return (
    <Header className={styles.head}>
      <div className={styles.head__main}>
        <Dropdown menu={{ items }} trigger={['click']}>
          <div onClick={(e) => e.preventDefault()} className={styles.head__main__repository}>
            <div className={styles.title}>Current Repository</div>
            <Space>
              <span>syGit</span>
              <CaretDownOutlined className={styles.caretDown} />
            </Space>
          </div>
        </Dropdown>

        <Dropdown menu={{ items }} trigger={['click']}>
          <div onClick={(e) => e.preventDefault()} className={styles.head__main__repository}>
            <div className={styles.title}>Current Branch</div>
            <Space>
              <span>main</span>
              <CaretDownOutlined className={styles.caretDown} />
            </Space>
          </div>
        </Dropdown>

        <div className={styles.head__main__button}>
          <div className={styles.head__main__button__fetch}>
            <div>Fetch origin</div>
            <SyncOutlined className={styles.icon} />
          </div>
          <div className={styles.lastFetch}>Last fetched 24 minutes ago</div>
        </div>
      </div>
    </Header>
  )
}
export default GlobalHead
