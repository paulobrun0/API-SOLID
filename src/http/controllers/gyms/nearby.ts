import { makeSeachGymsUseCase } from '@/user-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = nearbyGymsQuerySchema.parse(request.query)

  const nearbyGymUseCase = makeSeachGymsUseCase()

  const { gyms } = await nearbyGymUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
