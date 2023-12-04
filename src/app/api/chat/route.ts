import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { messages } = data
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
      data: res.choices[0].message,
    })
  } catch (err) {
    console.log('err', err)
    return NextResponse.json({
      code: 500,
      data: err,
    })
  }
}
