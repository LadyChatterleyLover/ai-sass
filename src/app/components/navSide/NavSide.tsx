import { AiOutlineHome, AiOutlineMessage, AiOutlineFileImage } from 'react-icons/ai'
import { BsChatRightDots } from 'react-icons/bs'
import { TbEdit } from 'react-icons/tb'
import { RiMindMap } from 'react-icons/ri'
import { IoMdClipboard } from 'react-icons/io'
import { FaRegMoon, FaRegBell } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

const NavSide = () => {
  const pathname = usePathname()
  const menuList = [
    {
      name: '主页',
      path: '/',
      icon: <AiOutlineHome></AiOutlineHome>,
    },
    {
      name: '对话',
      path: '/chat',
      icon: <BsChatRightDots></BsChatRightDots>,
    },
    {
      name: '绘画',
      path: '/draw',
      icon: <AiOutlineMessage></AiOutlineMessage>,
    },
    {
      name: '画廊',
      path: '/gallery',
      icon: <AiOutlineFileImage></AiOutlineFileImage>,
    },
    {
      name: '写作',
      path: '/composition',
      icon: <TbEdit></TbEdit>,
    },
    {
      name: '思维导图',
      path: '/mind',
      icon: <RiMindMap></RiMindMap>,
    },
    {
      name: '白板',
      path: '/whiteboard',
      icon: <IoMdClipboard></IoMdClipboard>,
    },
  ]

  return (
    <div className='f-ull flex flex-col h-full items-center bg-[#e8eaf1] dark:bg-[#25272d] py-5 px-3'>
      <div className='flex flex-col items-center space-y-3 overflow-x-hidden overflow-y-auto'>
        {menuList.map(item => (
          <div key={item.path}>
            <div className='group h-12 w-12 flex items-center justify-center bg-white rounded-xl cursor-pointer'>
              <div
                className={`
                transition group-hover:scale-110 group-hover:text-[#18A058FF] dark:group-hover:text-[#18A058FF]
                ${pathname === item.path && 'text-[#18A058FF]'}
              `}
              >
                {item.icon}
              </div>
            </div>
            <div
              className={`menu-title mt-1 line-clamp-1 text-center text-xs
              ${pathname === item.path && 'text-[#18A058FF]'}
              `}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col  items-center mt-5'>
        <div className='mb-4 text-xl cursor-pointer'>
          <FaRegMoon></FaRegMoon>
        </div>
        <div className='mb-4 text-xl cursor-pointer'>
          <FaRegBell></FaRegBell>
        </div>
      </div>
    </div>
  )
}

export default NavSide
