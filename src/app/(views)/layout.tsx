'use client'

import NavSide from '../components/navSide/NavSide'

interface Props {
  children: React.ReactNode
}

const ViewLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-full h-full flex'>
      <div className='w-[72px] fixed top-0 bottom-0 left-0'>
        <NavSide></NavSide>
      </div>
      <div className='ml-[72px]' style={{ width: 'calc(100% - 72px)' }}>
        {children}
      </div>
    </div>
  )
}

export default ViewLayout
