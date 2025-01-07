import { DrizzleOrgRepository } from '@/repositories/Drizzle/drizzle-org-repositories'
import { CreateOrgUseCase } from '../createOrg.useCase'

export function makeCreateOrgUseCase() {
  const drizzleOrgRepository = new DrizzleOrgRepository()
  const createOrgUseCase = new CreateOrgUseCase(drizzleOrgRepository)

  return createOrgUseCase
}
