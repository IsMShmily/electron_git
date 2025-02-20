import styles from './index.module.scss'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Flex, Tag } from 'antd'
import { gitStore } from '../../../localStore'

const GlobalHeadNav = () => {
  const [tags, setTags] = useState([])

  /** remove select git repo */
  const handleClose = async (removedRepo) => {
    const repoPaths = (await gitStore.getItem('repoPath')) || []
    const newRepoPaths = repoPaths.filter((item) => item.name !== removedRepo)
    gitStore.setItem('repoPath', newRepoPaths)
    setTags(newRepoPaths.map((item) => item.name))
  }

  /** set select git repo */
  const setRepoPath = async () => {
    const repoPath = await window.api.chooseFolder()
    const repoPaths = (await gitStore.getItem('repoPath')) || []
    if (!repoPaths.some((item) => item.path === repoPath)) {
      repoPaths.push({
        path: repoPath,
        name: repoPath.split('/').pop()
      })
      gitStore.setItem('repoPath', repoPaths)
      return setTags(repoPaths.map((item) => item.name))
    }
  }

  const getRepoPaths = async () => {
    const repoPaths = (await gitStore.getItem('repoPath')) || []
    setTags(repoPaths.map((item) => item.name))
  }

  useEffect(() => {
    getRepoPaths()
  }, [])

  return (
    <div className={styles.headNav}>
      <Flex gap="4px 0" wrap className={styles.headNavTags}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable={true}
            icon={<EnvironmentOutlined />}
            bordered={false}
            className={styles.headNavTag}
            onClose={() => handleClose(tag)}
          >
            {tag}
          </Tag>
        ))}
        <Tag className={styles.headNavTagPlus} icon={<PlusOutlined />} onClick={setRepoPath}>
          Add
        </Tag>
      </Flex>
    </div>
  )
}

export default GlobalHeadNav
