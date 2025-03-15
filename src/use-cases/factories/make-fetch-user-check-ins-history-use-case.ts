import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUsersCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRespository = new PrismaCheckInsRepository()
  const useCase = new FetchUsersCheckInsHistoryUseCase(checkInsRespository)

  return useCase
}
