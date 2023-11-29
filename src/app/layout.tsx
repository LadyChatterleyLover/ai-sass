import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from './components/AntdRegistry'

export const metadata: Metadata = {
  title: 'dudu-ai',
  description: '一个简单好用的智能AI助手',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
