'use client'

import NavSide from '../components/navSide/NavSide'

interface Props {
  children: React.ReactNode
}

const ViewLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-full h-full flex  bg-[#f3f4fc] dark:bg-[#101014]'>
      <div className='w-[72px] fixed top-0 bottom-0 left-0'>
        <NavSide></NavSide>
      </div>
      <div className='mx-auto max-w-screen-2xl p-4 lg:p-6 h-full'>{children}</div>
    </div>
  )
}

export default ViewLayout
