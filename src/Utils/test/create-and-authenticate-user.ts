import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Paulo Antonio',
      email: 'paulo.bruno12@hotmail.com',
      password_hash: await hash('12345678', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'paulo.bruno12@hotmail.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return { token }
}
