import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../middleware/verify-jwt'
import { nearby } from './nearby'
import { search } from './search'
import { create } from './create'
import { verifyUserRole } from '../middleware/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  const adminRoleMiddleware = verifyUserRole('ADMIN')
  app.post('/gyms', { onRequest: [adminRoleMiddleware] }, create)
}
