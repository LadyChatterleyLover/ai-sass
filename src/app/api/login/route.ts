import prisma from '@/app/db/prismadb'
import { checkPassword, createPassword } from '@/app/utils/crypto'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const data = await req.json()
  const { username, password } = data
  const existUser = await prisma.user.findFirst({
    where: {
      username,
    },
  })
  if (!existUser) {
    return NextResponse.json({
      msg: '用户不存在',
      code: 500,
    })
  }
  const flag = await checkPassword(password, existUser.password)
  if (!flag) {
    return NextResponse.json({
      msg: '密码不正确',
      code: 500,
    })
  }
  const user = await prisma.user.findUnique({
    where: {
      username,
      password: createPassword(password),
    },
  })
  if (!user) {
    return NextResponse.json({
      msg: '登录失败',
      code: 500,
    })
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '8h',
  })
  return NextResponse.json({
    msg: '登录成功',
    code: 200,
    data: {
      user,
      token,
    },
  })
}
