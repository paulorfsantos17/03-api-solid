import { FastifyInstance } from 'fastify'
import { register } from './controller/register'
import { authenticate } from './controller/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/members', register)
  app.post('/sessions', authenticate)
}
