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
import { Dropdown, Space, Badge, Tag } from 'antd'
const { Header } = Layout
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentRepo,
  setCurrentBranch,
  setCurrentRepoStatusType,
  setCurrentRepoStatusCount,
  updateCurrentFilePathAndCurrentRepoFileStatus,
  initGitBranch
} from '../../../store/gitStore'
import GlobalModal from '../../../components/core/GlobalModal'

const GlobalHead = () => {
  const dispatch = useDispatch()
  const gitStroe = useSelector((state) => state.gitStore)

  /** get git branch */
  const [branchRecords, setBranchRecords] = useState('')
  const getGitBranch = async () => {
    const [branch] = await dispatch(initGitBranch())
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
  }, [gitStroe.currentRepo])

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

  /** change branch */
  const modalRef = useRef(null)
  const [switchBranchErrorMap, setSwitchBranchErrorMap] = useState([
    {
      key: '1',
      title: 'Bring my changes to feat/head',
      description: 'Your in-progress work will follow you to the new branch'
    },
    {
      key: '2',
      title: 'Leave my changes on main',
      description: 'Your in-progress work will be stashed on this branch for you to return to later'
    }
  ])
  const [selectedTags, setSelectedTags] = useState('1')
  const handleChange = (key, checked) => {
    setSelectedTags(checked ? key : '')
  }
  const changeBranch = async ({ key }) => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentRepo)
    const error = await window.api.switchBranch(currentItem.path, key)
    if (error) {
      console.log('error', error)
      modalRef.current.open()
    } else {
      dispatch(setCurrentBranch(key))
    }
  }

  useEffect(() => {
    if (gitStroe.repoPaths.length > 0) {
      getCurrentBranch()
    }
  }, [gitStroe.currentRepo])

  window.api.onWindowFocus(() => {
    if (gitStroe.repoPaths.length > 0) {
      getCurrentBranch()
    }
  })

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
  }, [gitStroe.currentRepo])

  const changeRepository = (e) => {
    dispatch(setCurrentRepo(e.key))
    dispatch(updateCurrentFilePathAndCurrentRepoFileStatus())
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
            defaultSelectedKeys: [gitStroe.currentRepo],
            selectedKeys: [gitStroe.currentRepo],
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
            defaultSelectedKeys: [gitStroe.currentBranch],
            selectedKeys: [gitStroe.currentBranch],
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

      <GlobalModal
        ref={modalRef}
        title="Switch branch"
        onOk={() => {
          console.log('切换分支')
        }}
        okText="Switch Branch"
      >
        <div className={styles.modal__title}>
          You have changes on this branch. What would you like to do with them?
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {switchBranchErrorMap.map((item) => (
            <Tag.CheckableTag
              className={styles.tag}
              key={item.key}
              checked={selectedTags.includes(item.key)}
              onChange={(checked) => handleChange(item.key, checked)}
            >
              <div className={styles.tag__content}>
                <div className={styles.tag__content__title}>{item.title}</div>
                <div className={styles.tag__content__description}>{item.description}</div>
              </div>
            </Tag.CheckableTag>
          ))}
        </div>
      </GlobalModal>
    </Header>
  )
}
export default GlobalHead
