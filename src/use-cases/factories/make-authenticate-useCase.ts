import { DrizzleOrgRepository } from '@/repositories/Drizzle/drizzle-org-repositories'
import { AuthenticateUseCase } from '../authenticate/authenticate.useCase'

export function makeAuthenticateUseCase() {
  const drizzleOrgRepository = new DrizzleOrgRepository()
  const authenticateUseCase = new AuthenticateUseCase(drizzleOrgRepository)

  return authenticateUseCase
}
