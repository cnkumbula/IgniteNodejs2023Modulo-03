import type { UserRepository } from '@/repositories/user-repository'
import type { User } from '../../../types/drizzle'

import { ResourceNotFoundErrors } from '../errors/resource-not-found-errors'

interface ReadUserUseCaseRequest {
  userEmail: string
}

interface UserUseCaseResponse {
  user: User
}

export class ReadUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async handle({
    userEmail,
  }: ReadUserUseCaseRequest): Promise<UserUseCaseResponse> {
    const user = await this.userRepository.findbyemail(userEmail)

    if (!user.length || user.length === 0) {
      throw new ResourceNotFoundErrors()
    }

    return { user: user[0] }
  }
}
