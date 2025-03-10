import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ValidateCheckInUserCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUserCase
describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUserCase(checkInsRepository)

    // await gymsRepository.create({
    //   id: 'gym-01',
    //   title: 'Javascript gym',
    //   description: '',
    //   phone: '',
    //   latitude: -9.746787,
    //   longitude: -36.666882,
    // })

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should be able to validate an inexistent check-in', async () => {
    expect(
      async () =>
        await sut.execute({
          checkInId: 'inexistent-check-in-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
