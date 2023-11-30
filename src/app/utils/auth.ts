import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import prisma from '@/app/db/prismadb'
import { User } from '@prisma/client'

export async function verifyAuth(req: Request, callback: (user: User) => void) {
  const token = req.headers.get('Authorization')
  if (!token) {
    return NextResponse.json(
      {
        msg: '暂无权限,请重新登录',
      },
      { status: 401 }
    )
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    })
    return callback(user as User)
  } catch (err) {
    return NextResponse.json(
      {
        msg: '无效的凭证,请重新登录',
      },
      { status: 401 }
    )
  }
}
