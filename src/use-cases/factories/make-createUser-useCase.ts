import { DrizzleUserRepository } from '@/repositories/Drizzle/drizzle-user-repositories'
import { CreateUserUseCase } from '../user/createUser.useCase'

export function makeCreateOrgUseCase() {
  const drizzleUserRepository = new DrizzleUserRepository()
  const createUserUseCase = new CreateUserUseCase(drizzleUserRepository)

  return createUserUseCase
}
