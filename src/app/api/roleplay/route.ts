import { NextResponse } from 'next/server'
import prisma from '@/app/db/prismadb'

export async function POST(req: Request) {
  const data = await req.json()
  const { tagId, keyword, page = 1, pageSize = 32 } = data
  let query: any = {}
  if (tagId) {
    query.tagId = tagId
  }
  const res = await prisma.roleplay.findMany({
    where: {
      ...query,
      OR: [
        {
          title: {
            contains: keyword,
          },
        },
        {
          remark: {
            contains: keyword,
          },
        },
      ],
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  })
  return NextResponse.json({
    code: 200,
    message: '查询成功',
    data: res,
  })
}
