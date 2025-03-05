import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserNotFoundError } from '@/user-cases/errors/user-not-found-error'
import { GetUserByIdUseCase } from '@/user-cases/getUserById'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserByIdRequestSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getUserByIdRequestSchema.parse(request.params)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserById = new GetUserByIdUseCase(prismaUsersRepository)

    const user = await getUserById.execute(id)

    return reply.send(user)
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }
    throw err
  }
}
