import { NextResponse } from 'next/server'
import prisma from '@/app/db/prismadb'

export async function POST(req: Request) {
  const body = await req.json()
  const { name } = body
  const res = await prisma.tag.create({
    data: {
      name,
    },
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

export async function GET() {
  const res = await prisma.tag.findMany()
  return NextResponse.json({
    code: 200,
    message: '查询成功',
    data: res,
  })
}
