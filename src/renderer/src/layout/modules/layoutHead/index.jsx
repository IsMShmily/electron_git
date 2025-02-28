import styles from './index.module.scss'
import { Layout } from 'antd'
import {
  CaretDownOutlined,
  SyncOutlined,
  BranchesOutlined,
  CloudOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined
} from '@ant-design/icons'
import { Dropdown, Space, Badge } from 'antd'
const { Header } = Layout
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentRepo,
  setCurrentBranch,
  setCurrentRepoStatusType,
  setCurrentRepoStatusCount
} from '../../../store/gitStore'

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

  /** get current branch And current repo status */
  const getCurrentBranch = async () => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentRepo)
    const branch = await window.api.getCurrentBranch(currentItem.path)
    dispatch(setCurrentBranch(branch))

    const status = await window.api.getCurrentRepoStatus(currentItem.path)
    dispatch(setCurrentRepoStatusType(status))

    const count = await window.api.getCurrentRepoStatusCount(currentItem.path, status)
    dispatch(setCurrentRepoStatusCount(count))
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
    dispatch(setCurrentRepo(e.key))
  }

  const onClickHandler = async () => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentRepo)
    const status = await window.api.getCurrentRepoStatus(currentItem.path)
    if (status === 'PUSH') {
      await window.api.pushGit(currentItem.path)
      getCurrentBranch()
    } else if (status === 'FETCH') {
      await window.api.fetchGit(currentItem.path)
    } else if (status === 'UP_TO_DATE') {
      await window.api.fetchGit(currentItem.path)
    } else {
      console.log('unknown')
    }
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

        <div className={styles.head__main__button} onClick={onClickHandler}>
          {/* Fetch */}
          {gitStroe.currentRepoStatusType === 'FETCH' && (
            <div className={styles.head__main__button__fetch}>
              <div>Fetch origin</div>
              <CloudDownloadOutlined className={styles.icon} />
            </div>
          )}

          {/* Push */}
          {gitStroe.currentRepoStatusType === 'PUSH' && (
            <Badge count={gitStroe.currentRepoStatusCount} size="small" offset={[20, 0]}>
              <div className={styles.head__main__button__fetch}>
                <div>Push to origin</div> <CloudUploadOutlined className={styles.icon} />
              </div>
            </Badge>
          )}

          {/* Up to date */}
          {(gitStroe.currentRepoStatusType === 'UP_TO_DATE' ||
            gitStroe.currentRepoStatusType === 'UNKNOWN') && (
            <div className={styles.head__main__button__fetch}>
              <div>Up to date</div>
              <SyncOutlined className={styles.icon} />
            </div>
          )}

          <div className={styles.lastFetch}>Last fetched 24 minutes ago</div>
        </div>
      </div>
    </Header>
  )
}
export default GlobalHead
