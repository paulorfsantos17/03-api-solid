import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUsersMetricsUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const getUsersMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)

  return getUsersMetricsUseCase
}
