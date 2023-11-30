import { NextResponse } from 'next/server'
import prisma from '@/app/db/prismadb'

export async function POST(req: Request) {
  const data = await req.json()
  const res = await prisma.roleplay.create({
    data,
  })
  if (res) {
    return NextResponse.json({
      code: 200,
      message: '创建成功',
      data: res,
    })
  } else {
    return NextResponse.json({
      code: 500,
      message: '创建失败',
    })
  }
}
