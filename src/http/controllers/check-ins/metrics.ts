import { makeGetUserCheckInsMetricsUseCase } from '@/user-cases/factories/make-get-user-check-ins-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserCheckInsMetrics = makeGetUserCheckInsMetricsUseCase()

  const { checkInsCount } = await getUserCheckInsMetrics.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
