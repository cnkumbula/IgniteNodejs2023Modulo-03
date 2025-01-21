import { DrizzleOrgRepository } from '@/repositories/Drizzle/drizzle-org-repositories'
import { ReadOrgProfileUseCase } from '../org/readOrgProfile.useCase'

export function makeReadOrgProfileUseCase() {
  const orgRepository = new DrizzleOrgRepository()
  const readOrgProfileUseCase = new ReadOrgProfileUseCase(orgRepository)

  return readOrgProfileUseCase
}
