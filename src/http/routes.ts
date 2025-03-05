import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { getUserById } from './controllers/getUser'

export async function appRouter(app: FastifyInstance) {
  app.post('/users', register)
  app.get('/users/:id', getUserById)
}
