import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/members').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
  })

  const { token } = authResponse.body

  return { token }
}
