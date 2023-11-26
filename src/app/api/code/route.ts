import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const apiKey = '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'

const openai = new OpenAI({
  apiKey, // defaults to process.env["OPENAI_API_KEY"]
})

export async function POST() {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: '你好,介绍一下你自己' }],
      model: 'gpt-3.5-turbo',
    })
    return NextResponse.json({
      code: 200,
      data: chatCompletion.choices[0].message,
    })
  } catch (err) {
    console.log('err', err)
    return NextResponse.json({
      code: 500,
      data: err,
    })
  }
}
