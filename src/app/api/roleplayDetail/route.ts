import { NextResponse } from 'next/server'
import prisma from '@/app/db/prismadb'

export async function POST(req: Request) {
  const data = await req.json()
  const { id } = data
  const res = await prisma.roleplay.findMany({
    where: {
      id,
    },
  })
  if (res) {
    return NextResponse.json({
      code: 200,
      message: '查询成功',
      data: res,
    })
  } else {
    return NextResponse.json({
      code: 500,
      message: '查询失败',
    })
  }
}
