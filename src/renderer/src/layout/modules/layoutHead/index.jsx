import styles from './index.module.scss'
import { Layout } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
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
      </div>
    </Header>
  )
}
export default GlobalHead
