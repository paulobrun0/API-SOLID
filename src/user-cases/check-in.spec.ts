import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repositorys'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUserCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUserCase
describe('Register Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymRepository()
    sut = new CheckInUserCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-9.746787),
      longitude: new Decimal(-36.666882),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -9.746787,
      userLongitude: -36.666882,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should  not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -9.746787,
      userLongitude: -36.666882,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -9.746787,
        userLongitude: -36.666882,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should  not be able to check in twice but in differents days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -9.746787,
      userLongitude: -36.666882,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -9.746787,
      userLongitude: -36.666882,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should  not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Asa gym',
      description: '',
      phone: '',
      latitude: new Decimal(-9.758643),
      longitude: new Decimal(-36.672404),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -9.746787,
        userLongitude: -36.666882,
      }),
    )
  })
})
