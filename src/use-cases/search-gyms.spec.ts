import { expect, it, describe, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to fetch search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript',
      latitude: 0,
      longitude: 0,
      phone: '',
      description: null,
    })

    await gymsRepository.create({
      title: 'Typescript',
      latitude: 0,
      longitude: 0,
      phone: '',
      description: null,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript: ${i}`,
        latitude: 0,
        longitude: 0,
        phone: '',
        description: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript: 21' }),
      expect.objectContaining({ title: 'Javascript: 22' }),
    ])
  })
})
