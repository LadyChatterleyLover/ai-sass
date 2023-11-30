'use client'

import TagList from '@/app/components/home/TagList'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../../components/home/Header'), { ssr: false })

export default function Home() {
  return (
    <div className='w-full h-full bg-[#f3f4fc] dark:bg-[#101014]'>
      <div className='mx-auto  max-w-screen-xl p-4 lg:p-6 h-full '>
        <Header></Header>
        <TagList></TagList>
      </div>
    </div>
  )
}
