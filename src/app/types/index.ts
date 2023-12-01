export interface RoleplayItem {
  content: string
  iconUrl: string
  id: string
  remark: string
  tagId: string
  title: string
}

export interface User {
  avatar: string
  createAt: string
  id: number
  memory: string
  password: string
  remainingMemory: string
  updateAt: string
  username: string
}

export interface Topic {
  create_at: string
  id: number
  isLock: boolean
  roleId: RoleplayItem | null
  title: string
  update_at: string
  userId: number
}
