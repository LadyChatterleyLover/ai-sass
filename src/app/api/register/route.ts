import prisma from '@/app/db/prismadb'
import { createPassword } from '@/app/utils/crypto'
import { NextResponse } from 'next/server'
import dayjs from 'dayjs'

export async function POST(req: Request) {
  const data = await req.json()
  const { username, password } = data
  const existUser = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (existUser) {
    return NextResponse.json({
      msg: '用户已存在',
      code: 500,
    })
  } else {
    const hashPassword = await createPassword(password)
    const user = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
        update_at: dayjs().toISOString(),
      },
    })
    if (user) {
      return NextResponse.json({
        msg: '注册成功',
        code: 200,
        data: user,
      })
    } else {
      return NextResponse.json({
        msg: '注册失败',
        code: 500,
      })
    }
  }
}
