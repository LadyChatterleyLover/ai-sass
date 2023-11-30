import { useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { Button, Input } from 'antd'

interface State {
  tagList: { value: string; label: string }[]
  currentTag: string
}

const TagList = () => {
  const state = useReactive<State>({
    tagList: [],
    currentTag: '',
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
        <Input.Search placeholder='搜索prompt提示或关键词...' onSearch={val => {}}></Input.Search>
      </div>
      <div className='flex flex-wrap gap-4 justify-center w-full mt-4'>
        {state.tagList.map(item => (
          <Button
            key={item.value}
            type={state.currentTag === item.value ? 'primary' : 'default'}
            onClick={() => {
              state.currentTag = item.value
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </>
  ) : null
}

export default TagList
