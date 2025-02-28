import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReactDiffViewer from 'react-diff-viewer'
import Prism from 'prismjs'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import 'prismjs/themes/prism-tomorrow.css'
import styles from './index.module.scss'
import { Empty } from 'antd'

// 语法高亮方法
const highlightSyntax = (str) => (
  <pre
    style={{ display: 'inline' }}
    dangerouslySetInnerHTML={{
      __html: Prism.highlight(str, Prism.languages.javascript, 'javascript')
    }}
  />
)

const Home = () => {
  const gitStore = useSelector((state) => state.gitStore)

  const [oldCode, setOldCode] = useState('')
  const [currentCode, setCurrentCode] = useState('')

  const getOldCode = async () => {
    const currentItem = gitStore.repoPaths.find((item) => item.name === gitStore.currentRepo)
    const content = await window.api.getFileLastCommitContent(
      currentItem.path,
      gitStore.currentFilePath
    )
    setOldCode(content)
  }

  const getCurrentCode = async () => {
    const currentItem = gitStore.repoPaths.find((item) => item.name === gitStore.currentRepo)
    const content = await window.api.readFileContent(
      currentItem.path + '/' + gitStore.currentFilePath
    )
    setCurrentCode(content)
  }

  useEffect(() => {
    if (gitStore.currentFilePath) {
      getOldCode()
      getCurrentCode()
    }
  }, [gitStore.currentFilePath])

  return (
    <div className={styles['homeContainer']}>
      {gitStore?.currentRepoFileStatus?.length > 0 ? (
        <>
          <div className={styles['homeContainer__filePath']}>{gitStore.currentFilePath}</div>
          <div className={styles['homeContainer__diff']}>
            <ReactDiffViewer
              oldValue={oldCode}
              newValue={currentCode}
              splitView={false}
              useDarkTheme={true}
              disableWordDiff={true}
              renderContent={highlightSyntax}
              codeFoldMessageRenderer={(number) => (
                <div className={styles['homeContainer__diff__codeFoldMessageRenderer']}>
                  <span> Spread out {number} lines </span>
                  <VerticalAlignTopOutlined />
                </div>
              )}
              styles={{
                variables: {
                  dark: {
                    diffViewerBackground: '#1c1e21',
                    addedBackground: '#174821',
                    removedBackground: '#501c1b',
                    emptyLineBackground: '#1c1e21',
                    gutterBackground: '#1c1e21',
                    addedGutterBackground: '#1c1e21',
                    removedGutterBackground: '#1c1e21'
                  }
                },
                diffContainer: {
                  fontSize: 11,
                  fontWeight: 'bold'
                },
                gutter: {
                  minWidth: 30
                }
              }}
            />
          </div>
        </>
      ) : (
        <div className={styles['homeContainer__noDiff']}>
          <Empty description="Local file has no changes" />
        </div>
      )}
    </div>
  )
}

export default Home
