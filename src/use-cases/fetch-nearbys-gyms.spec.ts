import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearbys-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch search nearby for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -22.3535117,
      longitude: -45.777781,
      phone: '',
      description: null,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -22.2290811,
      longitude: -45.9435047,
      phone: '',
      description: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.3517596,
      userLongitude: -45.7751066,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
