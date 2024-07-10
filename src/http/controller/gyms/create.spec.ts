import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a Gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript gyms',
        description: 'JavaScript gyms in the city',
        phone: '+1 123 456 7890',
        latitude: -22.3685618,
        longitude: -45.7762134,
      })

    expect(response.status).toBe(201)
  })
})
