import { Avatar, Input, message } from 'antd'
import { Message, Topic, User } from '@/app/types'
import dayjs from 'dayjs'
import { post } from '@/app/http/request'
import { useReactive } from 'ahooks'
import { localGet } from '@/app/utils/storage'
import { useEffect } from 'react'
import TypeIt from 'typeit-react'

interface Props {
  currentTopicId: number
}

const MessageList: React.FC<Props> = ({ currentTopicId }) => {
  const user = localGet('ai-user') as User
  const state = useReactive<{
    value: string
    currentTopic: Topic | null
    loading: boolean
  }>({
    value: '',
    currentTopic: null,
    loading: false,
  })

  const getTopicDetail = () => {
    post<Topic>('/api/topicDetail', {
      id: currentTopicId,
    }).then(res => {
      state.currentTopic = res.data
      if (state.currentTopic!.messages.length && state.loading) {
        state.currentTopic!.messages[state.currentTopic!.messages.length - 1].typeit = true
        setTimeout(() => {
          state.currentTopic!.messages[state.currentTopic!.messages.length - 1].typeit = false
        }, state.currentTopic!.messages[state.currentTopic!.messages.length - 1].content.length * 200)
      }
    })
  }

  const saveMessage = (val: string) => {
    if (!val) {
      message.warning('发送内容不能为空')
      return
    }
    state.value = ''
    post('/api/message', {
      role: 'user',
      content: val,
      topicId: currentTopicId,
    }).then(() => {
      getTopicDetail()
    })
    post('/api/chat', {
      messages: [
        {
          role: 'user',
          content: val,
        },
      ],
    }).then(res => {
      state.loading = true
      post('/api/message', {
        ...(res.data as any),
        topicId: currentTopicId,
      }).then(() => {
        getTopicDetail()
      })
    })
  }

  useEffect(() => {
    getTopicDetail()
  }, [currentTopicId])

  return state.currentTopic ? (
    <div className='flex flex-col h-full'>
      <div className='relative z-20' style={{ borderBottom: '1px solid #ddd' }}>
        <div className='h-[56px] px-5 flex items-center font-bold'>
          {state.currentTopic.title}{' '}
          {state.currentTopic.messages.length ? `(${state.currentTopic.messages.length})` : ''}
        </div>
      </div>
      <div className='flex-1 overflow-hidden'>
        <div className='relative h-full overflow-hidden overflow-y-auto scroll-smooth p-3'>
          {!state.currentTopic.messages.length ? (
            <div className='flex gap-x-3 mb-5'>
              <Avatar size={32}>GPT</Avatar>
              <div className='flex flex-col gap-y-2 flex-1'>
                <div className='text-xs text-[#b4bbc4]'>
                  {dayjs(state.currentTopic.create_at).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                <div className='text-wrap min-w-[20px] rounded-md px-3 py-2 text-black bg-[#f4f6f8] dark:bg-[#1e1e20] message-reply'>
                  {state.currentTopic.roleInfo ? state.currentTopic.roleInfo.remark : '你好，有什么可以帮您？'}
                </div>
              </div>
            </div>
          ) : (
            <>
              {state.currentTopic.messages.map(item => (
                <div key={item.id} className='mb-5'>
                  <div className={`flex gap-x-3 ${item.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                    {item.role === 'assistant' ? (
                      <div className='flex gap-x-3'>
                        <Avatar size={32}>GPT</Avatar>
                        <div className='flex flex-col gap-y-2 flex-1'>
                          <div className='text-xs text-[#b4bbc4]'>
                            {dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
                          </div>

                          <div className='text-wrap min-w-[20px] rounded-md px-3 py-2 text-black bg-[#f4f6f8] dark:bg-[#1e1e20] message-reply'>
                            {item.typeit && state.loading ? (
                              <TypeIt options={{ speed: 200 }}>{item.content}</TypeIt>
                            ) : (
                              item.content
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='flex gap-x-3'>
                        <div className='flex flex-col items-end gap-y-2 flex-1'>
                          <div className='text-xs text-[#b4bbc4]'>
                            {dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
                          </div>
                          <div className='text-wrap min-w-[20px] w-fit rounded-md px-3 py-2 text-black bg-[#d2f9d1] dark:bg-[#86dfba]'>
                            {item.content}
                          </div>
                        </div>
                        <Avatar
                          size={32}
                          src={
                            user.avatar
                              ? user.avatar
                              : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                          }
                        ></Avatar>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className='w-full py-4 px-4'>
        <div className='flex items-stretch space-x-2'>
          <div className='relative flex-1'>
            <Input
              placeholder='问我任何问题，按Enter发送'
              className='w-full'
              value={state.value}
              onChange={e => {
                state.value = e.target.value
              }}
              onPressEnter={e => saveMessage((e.target as HTMLInputElement).value)}
            ></Input>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default MessageList
