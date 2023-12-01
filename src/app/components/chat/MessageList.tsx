import { Topic } from '@/app/types'
import React from 'react'

interface Props {
  currentTopic: Topic
}

const MessageList: React.FC<Props> = ({ currentTopic }) => {
  return currentTopic ? (
    <>
      <div className='h-[56px] px-5 flex items-center font-bold' style={{ borderBottom: '1px solid #ddd' }}>
        {currentTopic.title}
      </div>
    </>
  ) : null
}

export default MessageList
