'use client'

import NavSide from '../components/navSide/NavSide'

interface Props {
  children: React.ReactNode
}

const ViewLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-full h-full flex  bg-[#f3f4fc] dark:bg-[#101014]'>
      <div className='w-[72px]'>
        <NavSide></NavSide>
      </div>
      <div className='mx-auto max-w-screen-3xl p-4 lg:p-6'>{children}</div>
    </div>
  )
}

export default ViewLayout
