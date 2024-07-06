import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to profile', async () => {
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

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
  })
})
