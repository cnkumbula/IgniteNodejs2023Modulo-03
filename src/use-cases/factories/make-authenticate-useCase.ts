import { DrizzleOrgRepository } from '@/repositories/Drizzle/drizzle-org-repositories'
import { AuthenticateUseCase } from '../authenticate.useCase'

export function makeAuthenticateOrgUseCase() {
  const drizzleOrgRepository = new DrizzleOrgRepository()
  const authenticateUseCase = new AuthenticateUseCase(drizzleOrgRepository)

  return authenticateUseCase
}
