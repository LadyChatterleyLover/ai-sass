import { useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { Button, Input } from 'antd'
import RoleplayList from './RoleplayList'
import { get } from '@/app/http/request'

interface State {
  tagList: { value: string; label: string }[]
  currentTag: string
  keyword: string
}

const TagList = () => {
  const state = useReactive<State>({
    tagList: [],
    currentTag: '',
    keyword: '',
  })

  const getTagList = () => {
    get<{ name: string; id: string }[]>('/api/tag').then(res => {
      const arr = res.data.map(item => ({
        value: item.id,
        label: item.name,
      }))
      state.tagList = [
        {
          label: '全部',
          value: '',
        },
        ...arr,
      ]
    })
  }

  useEffect(() => {
    getTagList()
  }, [])

  return state.tagList.length ? (
    <div className='flex flex-col'>
      <div className='my-5'>
        <Input.Search
          placeholder='搜索prompt提示或关键词...'
          onSearch={val => {
            state.keyword = val
          }}
        ></Input.Search>
      </div>
      <div className='sticky left-0 right-0 top-0 w-full overflow-hidden z-[999] bg-[#f3f4fc] py-2 dark:bg-[#101014]'>
        <div className='flex flex-wrap gap-3 justify-center w-full my-5'>
          {state.tagList.map(item => (
            <Button
              key={item.value}
              className={`dark:bg-[#18181c] dark:text-white ${
                state.currentTag === item.value ? 'dark:bg-[#63e2b7] dark:text-black' : ''
              }`}
              shape='round'
              type={state.currentTag === item.value ? 'primary' : 'default'}
              onClick={() => {
                state.currentTag = item.value
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      <div className=''>
        <RoleplayList tagId={state.currentTag} keyword={state.keyword}></RoleplayList>
      </div>
    </div>
  ) : null
}

export default TagList
