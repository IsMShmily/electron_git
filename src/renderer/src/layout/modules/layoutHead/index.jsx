import styles from './index.module.scss'
import { Layout } from 'antd'
import { CaretDownOutlined, SyncOutlined, BranchesOutlined, CloudOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
const { Header } = Layout
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentRepo, setCurrentBranch } from '../../../store/gitStore'

const GlobalHead = () => {
  const dispatch = useDispatch()
  const gitStroe = useSelector((state) => state.gitStore)

  /** get git branch */
  const [branchRecords, setBranchRecords] = useState('')
  const getGitBranch = async () => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentRepo)
    const branch = await window.api.getGitBranch(currentItem.path)
    setBranchRecords(
      branch.map((item) => {
        return {
          label: item,
          key: item,
          icon:
            item.split('/')[0] === 'remotes' || item.split('/')[0] === 'origin' ? (
              <CloudOutlined />
            ) : (
              <BranchesOutlined />
            )
        }
      })
    )
  }
  useEffect(() => {
    if (gitStroe.repoPaths.length > 0) {
      getGitBranch()
    }
  }, [gitStroe.repoPaths])

  /** get current branch */
  const getCurrentBranch = async () => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentRepo)
    const branch = await window.api.getCurrentBranch(currentItem.path)
    dispatch(setCurrentBranch(branch))
  }
  const changeBranch = ({ key }) => {
    dispatch(setCurrentBranch(key))
  }
  useEffect(() => {
    if (gitStroe.repoPaths.length > 0) {
      getCurrentBranch()
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

  const changeRepository = (e) => {
    console
    dispatch(setCurrentRepo(e.key))
  }

  return (
    <Header className={styles.head}>
      <div className={styles.head__main}>
        <Dropdown
          menu={{
            items: repositoryRecords,
            selectable: true,
            onClick: changeRepository,
            defaultSelectedKeys: gitStroe.currentRepo,
            style: {
              maxHeight: '40vh',
              overflowY: 'auto'
            }
          }}
          trigger={['click']}
        >
          <div onClick={(e) => e.preventDefault()} className={styles.head__main__repository}>
            <div className={styles.title}>Current Repository</div>
            <Space>
              <span>{gitStroe.currentRepo}</span>
              <CaretDownOutlined className={styles.caretDown} />
            </Space>
          </div>
        </Dropdown>

        <Dropdown
          menu={{
            items: branchRecords,
            onClick: changeBranch,
            selectable: true,
            defaultSelectedKeys: gitStroe.currentBranch,
            style: {
              maxHeight: '40vh',
              overflowY: 'auto'
            }
          }}
          trigger={['click']}
        >
          <div onClick={(e) => e.preventDefault()} className={styles.head__main__repository}>
            <div className={styles.title}>Current Branch</div>
            <Space>
              <span>{gitStroe.currentBranch}</span>
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
