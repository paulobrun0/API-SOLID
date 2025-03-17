import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repositorys'
import { RegisterGymUseCase } from './create-gym'
import { beforeEach, describe, expect, it } from 'vitest'

let gymRepository: InMemoryGymRepository
let sut: RegisterGymUseCase

describe('Register Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new RegisterGymUseCase(gymRepository)
  })

  it('should be able to register a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Code Gym',
      description: null,
      phone: null,
      latitude: -9.746787,
      longitude: -36.666882,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
