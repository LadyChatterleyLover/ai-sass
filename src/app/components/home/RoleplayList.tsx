'use client'

import { RoleplayItem } from '@/app/types'
import { useReactive } from 'ahooks'
import { Card, Spin, Button } from 'antd'
import axios from 'axios'
import { useEffect } from 'react'

const { Meta } = Card

interface Props {
  tagId: string
}

const RoleplayList: React.FC<Props> = ({ tagId }) => {
  const state = useReactive<{
    roleplayList: RoleplayItem[]
    page: number
    pageSize: number
  }>({
    roleplayList: [],
    page: 1,
    pageSize: 20,
  })

  const getRoleplay = (tagId: string) => {
    axios
      .post('/api/roleplay', {
        tagId,
      })
      .then(res => {
        state.roleplayList = res.data.data
      })
  }

  useEffect(() => {
    getRoleplay(tagId)
  }, [tagId])

  return state.roleplayList.length ? (
    <>
      <div className='role-list grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {state.roleplayList.map(item => (
          <Card
            key={item.id}
            hoverable
            className='cursor-pointer'
            actions={[
              <Button key='use' type='primary' size='small' shape='round'>
                使用
              </Button>,
            ]}
          >
            <Meta title={item.title} description={item.remark} />
          </Card>
        ))}
      </div>
    </>
  ) : (
    <Spin></Spin>
  )
}

export default RoleplayList
