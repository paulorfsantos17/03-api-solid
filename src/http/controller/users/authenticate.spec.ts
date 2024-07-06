import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
    await request(app.server).post('/members').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
