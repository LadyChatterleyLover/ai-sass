'use client'

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { RoleplayItem } from '@/app/types'

const Chat = () => {
  const parmas = useSearchParams()
  const id = useMemo(() => {
    return parmas.get('id') as string
  }, [parmas])

  const state = useReactive<{
    detail: RoleplayItem | null
  }>({
    detail: null,
  })

  const getDetail = () => {
    axios
      .post('/api/roleplayDetail', {
        id,
      })
      .then(res => {
        state.detail = res.data.data
        console.log('res', res.data.data)
      })
  }

  useEffect(() => {
    if (id) {
      getDetail()
    }
  }, [id])

  return (
    <div className='h-full flex'>
      <div className='w-[260px] bg-[#fafbfc]' style={{ borderRight: '1px solid #ddd' }}>
        1
      </div>
      <div className='flex-1 p-5'>2</div>
    </div>
  )
}

export default Chat
