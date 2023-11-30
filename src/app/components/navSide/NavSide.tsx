import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineHome, AiOutlineMessage, AiOutlineFileImage } from 'react-icons/ai'
import { BsChatRightDots } from 'react-icons/bs'
import { TbEdit } from 'react-icons/tb'
import { RiMindMap } from 'react-icons/ri'
import { IoMdClipboard } from 'react-icons/io'
import { FaRegMoon, FaRegBell } from 'react-icons/fa'
import { LuSun } from 'react-icons/lu'
import { useThemeStore } from '../../store/theme'

const NavSide = () => {
  const router = useRouter()
  const pathname = usePathname()
  const themeStore = useThemeStore()
  const mode = useThemeStore(state => state.mode)
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

  const setHtmlDark = () => {
    const html = document.querySelector('html')
    const classList = html?.classList
    if (classList?.contains('dark')) {
      classList.remove('dark')
    } else {
      classList?.add('dark')
    }
  }

  const setMode = () => {
    setHtmlDark()
    themeStore.setMode(mode === 'light' ? 'dark' : 'light')
    localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (!localStorage.getItem('mode')) {
      localStorage.setItem('mode', 'light')
      themeStore.setMode('light')
    } else {
      const mode = localStorage.getItem('mode') as 'light' | 'dark'
      themeStore.setMode(mode)
      if (mode === 'dark') {
        const html = document.querySelector('html')
        const classList = html?.classList
        classList?.add('dark')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='f-ull flex flex-col h-full items-center bg-[#e8eaf1] dark:bg-[#25272d] py-5 px-3'>
      <div className='flex flex-col items-center space-y-3 overflow-x-hidden overflow-y-auto'>
        {menuList.map(item => (
          <div
            key={item.path}
            onClick={() => {
              router.push(item.path)
            }}
          >
            <div className='group h-12 w-12 flex items-center justify-center bg-white rounded-xl cursor-pointer'>
              <div
                className={`
                transition group-hover:scale-110 group-hover:text-[#18A058FF] dark:group-hover:text-[#18A058FF] text-xl
                ${pathname === item.path && 'text-[#18A058FF]'}
              `}
              >
                {item.icon}
              </div>
            </div>
            <div
              className={`menu-title mt-1 line-clamp-1 text-center text-xs dark:text-white
              ${pathname === item.path && 'text-[#18A058FF]'}
              `}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col  items-center mt-5'>
        <div
          className={`
          mb-4 text-xl cursor-pointer
          ${mode === 'dark' ? 'text-white' : ''}
          `}
          onClick={setMode}
        >
          {mode === 'light' ? <LuSun></LuSun> : <FaRegMoon></FaRegMoon>}
        </div>
        <div
          className={`
          mb-4 text-xl cursor-pointer
          ${mode === 'dark' ? 'text-white' : ''}
          `}
        >
          <FaRegBell></FaRegBell>
        </div>
      </div>
    </div>
  )
}

export default NavSide
