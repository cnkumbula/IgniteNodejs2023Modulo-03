import { DrizzleOrgRepository } from '@/repositories/Drizzle/drizzle-org-repositories'
import { ReadOrgProfileBycityUseCase } from '../org/readOrgProfileByCity.useCase'

export function makeReadOrgProfileByCityUseCase() {
  const orgRepository = new DrizzleOrgRepository()
  const readOrgProfileByCityUseCase = new ReadOrgProfileBycityUseCase(
    orgRepository
  )

  return readOrgProfileByCityUseCase
}
