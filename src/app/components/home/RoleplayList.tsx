'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useReactive, useEventListener } from 'ahooks'
import { Card, Spin, Button } from 'antd'
import { RoleplayItem, User } from '@/app/types'
import { post } from '@/app/http/request'
import { localGet } from '@/app/utils/storage'

interface Props {
  tagId: string
  keyword: string
}

const RoleplayList: React.FC<Props> = ({ tagId, keyword }) => {
  const router = useRouter()
  const state = useReactive<{
    roleplayList: RoleplayItem[]
    page: number
  }>({
    roleplayList: [],
    page: 1,
  })
  const user = localGet('ai-user') as User

  const getRoleplay = (tagId: string) => {
    post<RoleplayItem[]>('/api/roleplay', {
      tagId,
      keyword,
      page: state.page,
    }).then(res => {
      state.roleplayList = [...state.roleplayList, ...res.data]
    })
  }

  const searchRoleplay = (tagId: string) => {
    post<RoleplayItem[]>('/api/roleplay', {
      tagId,
      keyword,
      page: state.page,
    }).then(res => {
      state.roleplayList = []
      state.roleplayList = res.data
    })
  }

  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop
    const bodyHeight = document.body.scrollHeight
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const reachedBottom = scrollY + windowHeight >= bodyHeight
    if (reachedBottom) {
      state.page++
      getRoleplay(tagId)
    }
  }

  useEventListener('scroll', handleScroll, { target: window })

  useEffect(() => {
    searchRoleplay(tagId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagId])

  useEffect(() => {
    searchRoleplay(tagId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return state.roleplayList.length ? (
    <>
      <div className='role-list grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {state.roleplayList.map(item => (
          <Card key={item.id} hoverable className='cursor-pointer dark:bg-[#18181c] dark:text-white'>
            <div className='css-0 mb-2 line-clamp-1 break-all text-xl font-semibold tracking-wide'>{item.title}</div>
            <div className='line-clamp-3 w-full break-all text-sm text-gray-400'>{item.remark}</div>
            <div
              className='flex justify-end mt-4'
              onClick={() => {
                post<RoleplayItem>('/api/roleplayDetail', {
                  id: item.id,
                }).then(res => {
                  post('/api/topic', {
                    title: res.data.title,
                    isLock: false,
                    userId: user.id,
                    roleId: res.data.id,
                  }).then(() => {
                    router.push(`/chat?id=${item.id}`)
                  })
                })
              }}
            >
              <Button type='primary' size='small' shape='round' className='dark:bg-[#243834] dark:text-[#18A058FF]'>
                使用
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  ) : (
    <Spin></Spin>
  )
}

export default RoleplayList
