import { FastifyInstance } from 'fastify'
import { register } from './controller/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/members', register)
}
