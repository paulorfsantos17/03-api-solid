import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to nearby Gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript gyms',
        description: 'JavaScript gyms in the city',
        phone: '+1 123 456 7890',
        latitude: -22.2290811,
        longitude: -45.9435047,
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript gyms',
        description: 'JavaScript gyms in the city',
        phone: '+1 123 456 7890',
        latitude: -22.3523954,
        longitude: -45.777459,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -22.3517596,
        longitude: -45.7751066,
      })
      .send()

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    // expect(response.body.gyms).toEqual([
    //   expect.objectContaining({
    //     title: 'JavaScript gyms',
    //     description: 'JavaScript gyms in the city',
    //     phone: '+1 123 456 7890',
    //   }),
    // ])
  })
})
