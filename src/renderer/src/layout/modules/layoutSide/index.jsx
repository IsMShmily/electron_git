import { Layout } from 'antd'
import styles from './index.module.scss'
const { Sider } = Layout
import { Checkbox, Avatar, Input, Button } from 'antd'
import { useState } from 'react'
const { TextArea } = Input

const plainOptions = [
  'src/renderer/src/layout/modules/layoutHead/index.module.scss',
  'src/renderer/src/layout/modules/layoutMenu/index.jsx',
  'src/renderer/src/layout/index.jsx'
]
const defaultCheckedList = ['Apple', 'Orange']
const CheckboxGroup = Checkbox.Group

const LayoutSide = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const checkAll = plainOptions.length === checkedList.length
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length
  const onChange = (list) => {
    setCheckedList(list)
  }
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : [])
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
            6 changed files
          </Checkbox>
          <CheckboxGroup
            value={checkedList}
            onChange={onChange}
            className={styles['side__main__headerGroup__checkboxGroup']}
          >
            {plainOptions.map((item) => (
              <div className={styles['side__main__headerGroup__checkboxGroup__item']} key={item}>
                <Checkbox
                  value={item}
                  className={styles['side__main__headerGroup__checkboxGroup__item__checkbox']}
                  large="small"
                >
                  <div className={styles['side__main__headerGroup__checkboxGroup__item__text']}>
                    {item}
                  </div>
                </Checkbox>
              </div>
            ))}
          </CheckboxGroup>
        </div>
        <div className={styles['side__main__footerGroup']}>
          <div className={styles['side__main__footerGroup__inputGroup']}>
            <Avatar>U</Avatar>
            <Input placeholder="Summary of changes" />
          </div>
          <div className={styles['side__main__footerGroup__desc']}>
            <TextArea
              placeholder="Enter your description"
            
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </div>
          <div className={styles['side__main__footerGroup__button']}>
            <Button>Commint to main</Button>
          </div>
        </div>
      </div>
    </Sider>
  )
}

export default LayoutSide
