import { NextResponse } from 'next/server'

const messages = [{ role: 'user', content: '你好,世界' }]

export async function POST() {
  const body = JSON.stringify({
    messages,
    model: 'gpt-3.5-turbo',
    stream: false,
  })
  try {
    const response = await fetch((process.env.baseUrl as string) + 'chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.apiKey}`,
      },
      body,
    })
    const res = await response.json()
    return NextResponse.json({
      code: 200,
      data: res.data.choices[0].message,
    })
  } catch (err) {
    console.log('err', err)
    return NextResponse.json({
      code: 500,
      data: err,
    })
  }
}
