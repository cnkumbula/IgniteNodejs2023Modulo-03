import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '../../../types/drizzle'
import { InvalidCredentialsError } from '../errors/invalid-credential-errors'
import bcrypt from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async handle({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findbyemail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    if (!org || org.length === 0) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await bcrypt.compare(password, org[0].password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org: org[0],
    }
  }
}
