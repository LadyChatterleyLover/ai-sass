'use client'
import MessageList from '@/app/components/chat/MessageList'
import TopicList from '@/app/components/chat/TopicList'
import { Topic } from '@/app/types'
import { useState } from 'react'

const Chat = () => {
  const [currentTopic, setCurrentTopic] = useState<Topic>()
  return (
    <div className='h-full flex'>
      <div className='w-[300px] bg-[#fafbfc] p-5' style={{ borderRight: '1px solid #ddd' }}>
        <TopicList setCurrentTopic={setCurrentTopic}></TopicList>
      </div>
      <div className='flex-1'>
        <MessageList currentTopic={currentTopic!}></MessageList>
      </div>
    </div>
  )
}

export default Chat
