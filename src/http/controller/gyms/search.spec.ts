import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to search a Gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript gyms',
        description: 'JavaScript gyms in the city',
        phone: '+1 123 456 7890',
        latitude: -22.3685618,
        longitude: -45.7762134,
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript gyms',
        description: 'JavaScript gyms in the city',
        phone: '+1 123 456 7890',
        latitude: -22.3685618,
        longitude: -45.7762134,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        q: 'JavaScript',
      })
      .send()

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript gyms',
        description: 'JavaScript gyms in the city',
        phone: '+1 123 456 7890',
      }),
    ])
  })
})
