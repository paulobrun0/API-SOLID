import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInUseUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseUseCaseRequest): Promise<CheckInUseUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
