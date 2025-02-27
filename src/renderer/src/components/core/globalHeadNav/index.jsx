import styles from './index.module.scss'
import React, { useEffect } from 'react'
import { PlusOutlined, BranchesOutlined } from '@ant-design/icons'
import { Flex, Tag } from 'antd'
import { gitStoreLocalforage } from '../../../localStore'
import { useDispatch, useSelector } from 'react-redux'
import { initSelectedTag, setRepoPaths, setCurrentTag } from '../../../store/gitStore'

const GlobalHeadNav = () => {
  const dispatch = useDispatch()
  const gitStroe = useSelector((state) => state.gitStore)

  /** remove select git repo */
  const handleClose = async (removedRepo) => {
    const repoPaths = (await gitStoreLocalforage.getItem('repoPath')) || []
    const newRepoPaths = repoPaths.filter((item) => item.name !== removedRepo)
    gitStoreLocalforage.setItem('repoPath', newRepoPaths)
  }

  /** set select git repo */
  const setRepoPath = async () => {
    const repoPath = await window.api.chooseFolder()
    if (!gitStroe.repoPaths.some((item) => item.path === repoPath)) {
      dispatch(
        setRepoPaths([...gitStroe.repoPaths, { path: repoPath, name: repoPath.split('/').pop() }])
      )
      dispatch(setCurrentTag(repoPath.split('/').pop()))
    }
  }

  const handleClick = (name) => {
    dispatch(setCurrentTag(name))
  }

  useEffect(() => {
    dispatch(initSelectedTag())
  }, [dispatch])

  return (
    <div className={styles.headNav}>
      <Flex gap="4px 0" wrap className={styles.headNavTags}>
        {gitStroe.repoPaths.map((itm) => (
          <Tag.CheckableTag
            key={itm.name}
            icon={<BranchesOutlined />}
            className={styles.headNavTag}
            onClose={() => handleClose(itm.name)}
            onClick={() => handleClick(itm.name)}
            checked={gitStroe.currentTag === itm.name}
          >
            {itm.name}
          </Tag.CheckableTag>
        ))}
        <Tag className={styles.headNavTagPlus} icon={<PlusOutlined />} onClick={setRepoPath} />
      </Flex>
    </div>
  )
}

export default GlobalHeadNav
