import { useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { Button, Input } from 'antd'
import RoleplayList from './RoleplayList'

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
    axios.get('/api/tag').then(res => {
      const arr = res.data.data.map((item: { name: string; id: string }) => ({
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
    <>
      <div className='my-5'>
        <Input.Search
          placeholder='搜索prompt提示或关键词...'
          onSearch={val => {
            state.keyword = val
          }}
        ></Input.Search>
      </div>
      <div className='sticky left-0 right-0 top-0 w-full overflow-hidden'>
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
      <RoleplayList tagId={state.currentTag} keyword={state.keyword}></RoleplayList>
    </>
  ) : null
}

export default TagList
