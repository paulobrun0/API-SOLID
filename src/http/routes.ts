import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './controllers/middleware/verify-jwt'

export async function appRouter(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Authenticate */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
