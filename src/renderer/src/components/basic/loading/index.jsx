import { LoadingOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
const Loading = () => {
  return (
    <div className={styles['socket']}>
      <LoadingOutlined />
    </div>
  )
}

export default Loading
