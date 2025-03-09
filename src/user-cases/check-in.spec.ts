import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUserCase } from './checkin'

let checkInUserCase: InMemoryCheckInsRepository
let sut: CheckInUserCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInUserCase = new InMemoryCheckInsRepository()
    sut = new CheckInUserCase(checkInUserCase)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
