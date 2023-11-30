import { NextResponse } from 'next/server'
import prisma from '@/app/db/prismadb'

export async function POST(req: Request) {
  const data = await req.json()
  const { tagId, title, content, page = 1, pageSize = 30 } = data
  let query = {}
  if (tagId) {
    query = {
      tagId,
    }
  }
  if (title) {
    query = {
      title,
    }
  }
  if (content) {
    query = {
      content,
    }
  }
  const res = await prisma.roleplay.findMany({
    where: query,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })
  return NextResponse.json({
    code: 200,
    message: '查询成功',
    data: res,
  })
}
