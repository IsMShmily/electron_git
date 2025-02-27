import styles from './index.module.scss'
import { Layout } from 'antd'
import { CaretDownOutlined, SyncOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
const { Header } = Layout
import { useEffect, useState } from 'react'
import { gitStoreLocalforage } from '../../../localStore'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTag } from '../../../store/gitStore'
const GlobalHead = () => {
  const dispatch = useDispatch()
  const gitStroe = useSelector((state) => state.gitStore)

  const [branch, setBranch] = useState('')

  const getGitBranch = async () => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentTag)
    const branch = await window.api.getGitBranch(currentItem.path)
    console.log('branch', branch)
    // setBranch(branch)
  }
  useEffect(() => {
    if (gitStroe.repoPaths.length > 0) {
      getGitBranch()
    }
  }, [gitStroe.repoPaths])

  /** Repository &&  Current Repository*/
  const [repositoryRecords, setRepositoryRecords] = useState([])
  const getRepoPaths = async () => {
    const repoPaths = gitStroe.repoPaths
    const records = repoPaths.map((item) => {
      return {
        label: item.name,
        key: item.name
      }
    })
    setRepositoryRecords(records)
  }
  useEffect(() => {
    getRepoPaths()
  }, [gitStroe.repoPaths])

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('')
  const onClick = ({ key }) => {
    dispatch(setCurrentTag(key))
  }

  useEffect(() => {
    setDefaultSelectedKeys(gitStroe.currentTag)
  }, [gitStroe.currentTag])
  return (
    <Header className={styles.head}>
      <div className={styles.head__main}>
        <Dropdown
          menu={{
            items: repositoryRecords,
            selectable: true,
            onClick,
            defaultSelectedKeys: defaultSelectedKeys
          }}
          trigger={['click']}
        >
          <div onClick={(e) => e.preventDefault()} className={styles.head__main__repository}>
            <div className={styles.title}>Current Repository</div>
            <Space>
              <span>{gitStroe.currentTag}</span>
              <CaretDownOutlined className={styles.caretDown} />
            </Space>
          </div>
        </Dropdown>

        <Dropdown menu={{ items: repositoryRecords }} trigger={['click']}>
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
