import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUserCase } from '../get-user-profile'

export function makeGetUserProfileUserCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUserCase(prismaUsersRepository)

  return useCase
}
