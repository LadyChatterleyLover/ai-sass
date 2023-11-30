'use client'

import { Button, Modal, Form, Input, Image, message, Carousel } from 'antd'
import { useState } from 'react'
import { localSet } from '@/app/utils/storage'
import { useRouter } from 'next/navigation'
import { post } from '@/app/http/request'
import { User } from '@/app/types'

type FieldType = {
  username?: string
  password?: string
}

const Login = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [type, setType] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)

  const swiperList = [
    {
      src: 'https://bot.tgmeng.com/banner/banner-1.png',
      title: '工作助手',
      desc: '工作遇到麻烦？来问一问吧',
    },
    {
      src: 'https://bot.tgmeng.com/banner/banner-2.png',
      title: 'AI绘画',
      desc: '一键生成你的设计内容',
    },
    {
      src: 'https://bot.tgmeng.com/banner/banner-3.png',
      title: '问答百科',
      desc: '不管你是什么问题，都能快速获得答案',
    },
    {
      src: 'https://bot.tgmeng.com/banner/banner-4.png',
      title: '代码问题',
      desc: '提供个性化的编程辅助服务，提高编程效率',
    },
  ]

  const submit = () => {
    const values = form.getFieldsValue()
    setLoading(true)
    form
      .validateFields()
      .then(() => {
        if (type === 'login') {
          post<{ user: User; token: string }>('/api/login', values)
            .then(res => {
              if (res.code === 200) {
                message.success(res.msg)
                localSet('ai-user', res.data.user)
                localSet('ai-token', res.data.token)
                router.push('/')
              } else {
                message.error(res.msg)
              }
            })
            .catch(err => {
              console.log('err', err)
            })
            .finally(() => {
              setLoading(false)
            })
        } else {
          post('/api/register', values)
            .then(res => {
              if (res.code === 200) {
                message.success(res.msg)
                setType('login')
              } else {
                message.error(res.msg)
              }
            })
            .catch(err => {
              console.log('err', err)
            })
            .finally(() => {
              setLoading(false)
            })
        }
      })
      .catch(() => {
        message.error('表单填写有误,请检查')
      })
  }

  return (
    <div className='flex h-full login bg-[#e8eaf1]'>
      <div className='m-auto flex items-stretch overflow-hidden rounded-md bg-white dark:bg-[#18181c] max-w-[840px]'>
        <div className=' w-[420px] bg-[#f8f9fa] dark:bg-[#25272c]'>
          <Carousel autoplay>
            {swiperList.map((item, index) => (
              <div key={index}>
                <div className='flex justify-center'>
                  <Image
                    src={item.src}
                    preview={false}
                    width={260}
                    height={260}
                    alt='img'
                    style={{ objectFit: 'cover' }}
                  ></Image>
                </div>
                <div className='flex justify-center mb-2 mt-2 text-xl font-bold'>{item.title}</div>
                <div className='flex justify-center text-slate-500 text-sm'>{item.desc}</div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className='relative min-h-[420px] pb-0 w-[420px] p-6'>
          <div className='text-3xl font-bold mb-3'>登录嘟嘟AI</div>
          <div className='flex items-center gap-x-2 mb-4'>
            <div>新用户?</div>
            <div
              className='text-[#18A058FF] cursor-pointer'
              onClick={() => {
                setType(type === 'login' ? 'register' : 'login')
              }}
            >
              {type === 'login' ? '去注册' : '去登录'}
            </div>
          </div>
          <Form form={form} autoComplete='off'>
            <Form.Item<FieldType>
              name='username'
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 2, max: 10, message: '用户名在2-10位之间' },
              ]}
            >
              <Input placeholder='邮箱或手机号'></Input>
            </Form.Item>
            <Form.Item<FieldType>
              name='password'
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, max: 15, message: '密码在6-15位之间' },
              ]}
            >
              <Input.Password placeholder='密码'></Input.Password>
            </Form.Item>
            <Form.Item>
              <Button type='primary' block loading={loading} onClick={submit}>
                {type === 'login' ? '立即登录' : '立即注册'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
