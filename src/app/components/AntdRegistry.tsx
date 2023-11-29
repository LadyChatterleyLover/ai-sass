'use client'

import React from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { useServerInsertedHTML } from 'next/navigation'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), [])
  const isServerInserted = React.useRef<boolean>(false)
  useServerInsertedHTML(() => {
    // 避免 css 重复插入
    if (isServerInserted.current) {
      return
    }
    isServerInserted.current = true
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    )
  })
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: '#18A058FF',
          },
        }}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  )
}

export default StyledComponentsRegistry
