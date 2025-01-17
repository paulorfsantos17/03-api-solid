import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-users-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    checkInRepository,
  )

  return fetchUserCheckInsHistoryUseCase
}
