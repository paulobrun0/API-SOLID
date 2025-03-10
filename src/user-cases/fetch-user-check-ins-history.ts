import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUseUseCheckInsHistoryCaseRequest {
  userId: string
  page: number
}

interface FetchUseUseCheckInsHistoryCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUseUseCheckInsHistoryCaseRequest): Promise<FetchUseUseCheckInsHistoryCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
