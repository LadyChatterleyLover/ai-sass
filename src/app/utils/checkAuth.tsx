import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { localGet } from './storage'

const { confirm } = Modal

export function checkAuth(callback: () => void) {
  const user = localGet('ai-user')
  if (!user) {
    confirm({
      title: '您还未登录，请先登录后使用！',
      icon: <ExclamationCircleFilled />,
      onOk() {
        window.location.pathname = '/login'
      },
    })
  } else {
    callback()
  }
}
