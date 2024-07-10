import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to refresh  a token', async () => {
    await request(app.server).post('/members').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: 'password123',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies as string[])
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
