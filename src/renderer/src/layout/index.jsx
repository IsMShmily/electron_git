import styles from './index.module.scss'
import LayoutSide from './modules/layoutSide'
import GlobalMain from './modules/layoutMain'
import GlobalHead from './modules/layoutHead'
import { Layout } from 'antd'
import { Splitter } from 'antd'

const GlobalLayout = () => {
  return (
    <div className={styles['layoutContainer']}>
      <Layout
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%'
        }}
      >
        <GlobalHead />
        <Layout>
          <Splitter style={{ height: '100%' }}>
            <Splitter.Panel
              defaultSize="23%"
              min="23%"
              max="70%"
              style={{
                padding: 0,
                overflow: 'hidden'
              }}
            >
              <LayoutSide />
            </Splitter.Panel>
            <Splitter.Panel
              style={{
                padding: 0,
                backgroundColor: '#1c1e21'
              }}
            >
              <GlobalMain />
            </Splitter.Panel>
          </Splitter>
        </Layout>
      </Layout>
    </div>
  )
}

export default GlobalLayout
