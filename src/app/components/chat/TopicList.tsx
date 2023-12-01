'use client'

import { useEffect } from 'react'
import { get, post } from '@/app/http/request'
import { useReactive } from 'ahooks'
import { Button, Empty, message } from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { localGet } from '@/app/utils/storage'
import { BsChatRightDots } from 'react-icons/bs'
import { PiPushPinSimpleSlash, PiPushPinSimpleLight } from 'react-icons/pi'
import { Topic } from '@/app/types'

const TopicList = () => {
  const user = localGet('ai-user')
  const state = useReactive<{
    topicList: Topic[]
    currentId: number
  }>({
    topicList: [],
    currentId: -1,
  })

  const getTopicList = () => {
    get<Topic[]>('/api/topic').then(res => {
      state.topicList = res.data
      state.currentId = res.data[0].id
      console.log('res', res.data)
    })
  }

  useEffect(() => {
    getTopicList()
  }, [])

  return (
    <div>
      <div className='flex items-center gap-x-2 mb-5'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          className='flex-1'
          onClick={() => {
            post<Topic>('/api/topic', {
              title: '新对话',
              isLock: false,
              userId: user.id,
            }).then(res => {
              if (res.code === 200) {
                message.success('创建成功')
                getTopicList()
              }
            })
          }}
        >
          新对话
        </Button>
        <Button icon={<SearchOutlined />}></Button>
      </div>
      {state.topicList.length ? (
        <div>
          {state.topicList.map(item => {
            return (
              <div
                key={item.id}
                className='flex justify-between items-center px-2 py-3 mb-4 cursor-pointer'
                style={{
                  border: state.currentId === item.id ? '1px solid #18A058FF' : '1px solid #e5e7eb',
                }}
                onClick={() => {
                  state.currentId = item.id
                }}
              >
                <div className='flex items-center gap-x-2'>
                  <BsChatRightDots
                    className={`${state.currentId === item.id ? 'text-[#18A058FF]' : ''} text-sm`}
                  ></BsChatRightDots>
                  <div className={`${state.currentId === item.id ? 'text-[#18A058FF]' : ''} text-sm`}>{item.title}</div>
                </div>
                {state.currentId === item.id ? (
                  <div className='flex items-center gap-x-2'>
                    {item.isLock ? (
                      <PiPushPinSimpleSlash className='text-[#18A058FF] cursor-pointer' />
                    ) : (
                      <PiPushPinSimpleLight className='text-[#18A058FF] cursor-pointer' />
                    )}
                    <EditOutlined className='text-[#18A058FF] cursor-pointer' />
                    <DeleteOutlined className='text-[#18A058FF] cursor-pointer' />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default TopicList