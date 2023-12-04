import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/db/prismadb'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const res = await prisma.message.create({
    data,
  })
  if (res) {
    return NextResponse.json({
      msg: '操作成功',
      code: 200,
      data: res,
    })
  } else {
    return NextResponse.json({
      msg: '操作失败',
      code: 500,
    })
  }
}
