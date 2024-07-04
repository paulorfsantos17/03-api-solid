import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should hash user  password upon registration', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Academia',
      description: null,
      latitude: -22.3685618,
      longitude: -45.7762134,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
