'use client'

import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const getMessage = () => {
    axios.post('/api/code').then(res => {
      console.log('res', res.data)
    })
  }

  useEffect(() => {
    getMessage()
  }, [])
  return <div>app</div>
}
