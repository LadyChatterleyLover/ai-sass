'use client'

import { useRouter } from 'next/navigation'
import TypeIt from 'typeit-react'
import { Button } from 'antd'

const Header = () => {
  const router = useRouter()
  const list = [
    {
      path: '/chat',
      name: 'AI对话',
    },
    {
      path: '/draw',
      name: 'AI绘画',
    },
    {
      path: '/composition',
      name: 'AI写作',
    },
  ]
  return (
    <>
      <div className='flex justify-center w-full mb-8 text-center text-3xl font-extrabold text-[#18A058FF] dark:text-[#18A058FF] lg:text-4xl'>
        嘟嘟AI
      </div>
      <div className='flex justify-center w-full mb-8 text-lg dark:text-white'>
        <TypeIt
          options={{ loop: true }}
          getBeforeInit={instance => {
            instance
              .type('面对AI焦虑，你没必要跟汽车赛跑，而是应该考个驾照！')
              .pause(1200)
              .delete(26)
              .type('智能对话')
              .pause(1200)
              .delete(4)
              .type('智能写作')
              .pause(1200)
              .delete(4)
              .type('与AI一起，打破界限，创造无限可能!')
              .pause(1000)
            return instance
          }}
        />
      </div>
      <div className='flex justify-center w-full gap-x-4 mb-5'>
        {list.map((item, index) => {
          return (
            <Button key={index} type='primary' shape='round' size='large' onClick={() => router.push(item.path)}>
              {item.name}
            </Button>
          )
        })}
      </div>
    </>
  )
}

export default Header
