import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middleware/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { verifyUserRole } from '../middleware/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)

  const adminRoleMiddleware = verifyUserRole('ADMIN')

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [adminRoleMiddleware] },
    validate,
  )
}
