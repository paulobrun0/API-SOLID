import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { RegisterGymUseCase } from '../create-gym'

export function makeCreateGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new RegisterGymUseCase(prismaGymsRepository)

  return useCase
}
