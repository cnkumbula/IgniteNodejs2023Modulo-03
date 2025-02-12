import { DrizzleUserRepository } from '@/repositories/Drizzle/drizzle-user-repositories'
import { ReadUserUseCase } from '../user/readUser.useCase'

export function makeReadUserByEmailUseCase() {
  const userRepository = new DrizzleUserRepository()
  const readUserByEmailUseCase = new ReadUserUseCase(userRepository)

  return readUserByEmailUseCase
}
