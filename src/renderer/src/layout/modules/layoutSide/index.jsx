import { Layout } from 'antd'
import styles from './index.module.scss'
const { Sider } = Layout
import { Checkbox, Avatar, Input, Button, Tooltip } from 'antd'
import { useState, useEffect } from 'react'
const { TextArea } = Input
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentRepoFileStatus,
  setCurrentRepoStatusType,
  setCurrentRepoStatusCount,
  setCurrentFilePath
} from '../../../store/gitStore'

const CheckboxGroup = Checkbox.Group

const LayoutSide = () => {
  const gitStroe = useSelector((state) => state.gitStore)
  const dispatch = useDispatch()
  const [checkedList, setCheckedList] = useState([])

  /** check all */
  const checkAll = gitStroe.currentRepoFileStatus.length === checkedList.length
  const indeterminate =
    checkedList.length > 0 && checkedList.length < gitStroe.currentRepoFileStatus.length

  const onChange = (list) => {
    setCheckedList(list)
  }
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? gitStroe.currentRepoFileStatus : [])
  }

  /** get current repo status */
  const getCurrentRepoFileStatus = async () => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentRepo)
    const status = await window.api.getCurrentRepoFileStatus(currentItem.path)
    dispatch(setCurrentRepoFileStatus(status))
    setCheckedList(status)
  }
  useEffect(() => {
    if (gitStroe.repoPaths.length > 0) {
      getCurrentRepoFileStatus()
    }
  }, [gitStroe.repoPaths])

  /** get git user info */
  const [gitUserInfo, setGitUserInfo] = useState({})
  const getGitUserInfo = async () => {
    const userInfo = await window.api.getGitUserInfo()
    setGitUserInfo(userInfo)
  }
  useEffect(() => {
    getGitUserInfo()
  }, [])

  /** summary */
  const [summary, setSummary] = useState('')
  const onSummaryChange = (e) => {
    setSummary(e.target.value)
  }

  /** desc */
  const [desc, setDesc] = useState('')
  const onDescChange = (e) => {
    setDesc(e.target.value)
  }

  /** commit */
  const onCommit = async () => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentRepo)
    await window.api.commitGit(currentItem.path, checkedList, summary, desc)
    getCurrentRepoFileStatus()
    clearCommit()
    onCheckAndChangeRepoStatus()
  }

  const onCheckAndChangeRepoStatus = async () => {
    const currentItem = gitStroe.repoPaths.find((item) => item.name === gitStroe.currentRepo)
    const res = await window.api.getCurrentRepoStatus(currentItem.path)
    dispatch(setCurrentRepoStatusType(res))
    const count = await window.api.getCurrentRepoStatusCount(currentItem.path, res)
    dispatch(setCurrentRepoStatusCount(count))
  }

  const clearCommit = () => {
    setSummary('')
    setDesc('')
  }

  const onFileClick = (item) => {
    dispatch(setCurrentFilePath(item))
  }
  return (
    <Sider width="100%" style={{ height: '100%' }}>
      <div className={styles['side__main']}>
        <div className={styles['side__main__headerGroup']}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
            className={styles['side__main__headerGroup__header']}
          >
            {gitStroe.currentRepoFileStatus.length} changed files
          </Checkbox>
          <CheckboxGroup
            value={checkedList}
            onChange={onChange}
            className={styles['side__main__headerGroup__checkboxGroup']}
          >
            {gitStroe.currentRepoFileStatus.map((item) => (
              <div
                className={styles['side__main__headerGroup__checkboxGroup__item']}
                key={item}
                style={{
                  backgroundColor: gitStroe?.currentFilePath === item ? '#1b1c1e' : 'transparent'
                }}
                onClick={() => onFileClick(item)}
              >
                <Checkbox
                  value={item}
                  className={styles['side__main__headerGroup__checkboxGroup__item__checkbox']}
                  large="small"
                ></Checkbox>
                <div className={styles['side__main__headerGroup__checkboxGroup__item__text']}>
                  {item}
                </div>
              </div>
            ))}
          </CheckboxGroup>
        </div>
        <div className={styles['side__main__footerGroup']}>
          <div className={styles['side__main__footerGroup__inputGroup']}>
            <Tooltip
              placement="topRight"
              title={
                <div>
                  <div>name: {gitUserInfo?.user}</div>
                  <div>email: {gitUserInfo?.email}</div>
                </div>
              }
            >
              <Avatar
                style={{
                  cursor: 'pointer'
                }}
              >
                {gitUserInfo?.user?.split('')[0]}
              </Avatar>
            </Tooltip>

            <Input placeholder="Summary of changes" value={summary} onChange={onSummaryChange} />
          </div>
          <div className={styles['side__main__footerGroup__desc']}>
            <TextArea
              placeholder="Enter your description"
              autoSize={{ minRows: 4, maxRows: 4 }}
              value={desc}
              onChange={onDescChange}
            />
          </div>
          <div className={styles['side__main__footerGroup__button']}>
            <Button type="primary" onClick={onCommit}>
              Commint to main
            </Button>
          </div>
        </div>
      </div>
    </Sider>
  )
}

export default LayoutSide
