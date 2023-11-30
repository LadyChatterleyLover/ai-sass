'use client'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../../components/home/Header'), { ssr: false })

export default function Home() {
  return (
    <>
      <Header></Header>
    </>
  )
}
