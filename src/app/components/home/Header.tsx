import { Button } from 'antd'
import TypeIt from 'typeit-react'

const Header = () => {
  return (
    <>
      <div className='flex justify-center w-full mb-8 text-center text-3xl font-extrabold text-[#18A058FF] dark:text-[#18A058FF] lg:text-4xl'>
        嘟嘟AI
      </div>
      <div className='flex justify-center w-full mb-8 text-lg'>
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
        <Button type='primary' size='large' shape='round'>
          AI对话
        </Button>
        <Button type='primary' size='large' shape='round'>
          AI绘画
        </Button>
        <Button type='primary' size='large' shape='round'>
          AI写作
        </Button>
      </div>
    </>
  )
}

export default Header
