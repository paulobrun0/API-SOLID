import { GymsRepository } from '@/repositories/gyms-respository'
import { Gym } from '@prisma/client'

interface RegisterGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface RegisterGymUseCaseResponse {
  gym: Gym
}

export class RegisterGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: RegisterGymUseCaseRequest): Promise<RegisterGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
